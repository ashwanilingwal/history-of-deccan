#!/usr/bin/env python3
"""Last sweep: for anything still without a picture, let Commons find its own
category instead of guessing the name.

Wave four guessed category titles and missed several monuments simply because
the category is spelled differently ("Queen's Bath (Hampi)" rather than
"Queen's Bath, Hampi"). This searches namespace 14 for the category first,
then pulls files out of the best match.

Same duplicate guard as wave four: nothing is written if an identical file is
already sitting in ../images/ under another name.

Re-runnable: skips slugs that already have a file.
"""
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "images")
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal history project)"}
COMMONS = "https://commons.wikimedia.org/w/api.php?"

# slug -> free-text search terms; the first that resolves to a category wins
TOPICS = {
    "mahanavami-dibba": ["Mahanavami Dibba Hampi", "Royal Enclosure Hampi"],
    "queens-bath": ["Queen's Bath Hampi", "Queens Bath Hampi"],
    "elephant-stables": ["Elephant Stables Hampi", "Gajashala Hampi"],
    "ugra-narasimha": ["Lakshmi Narasimha Hampi", "Ugra Narasimha Hampi"],
    "krishna-temple-hampi": ["Krishna temple Hampi", "Balakrishna temple Hampi"],
    "malik-e-maidan": ["Malik e Maidan Bijapur", "Malik-i-Maidan"],
    "upli-buruj": ["Upli Buruj Bijapur", "Upali Burj"],
    "taj-bawadi": ["Taj Bawadi Bijapur", "Stepwells in Vijayapura"],
    "sat-manzil": ["Sat Manzil Bijapur", "Bijapur fort"],
    "chaubara": ["Chaubara Bidar", "Bidar town"],
    "takht-mahal": ["Takht Mahal Bidar", "Bidar Fort palaces"],
    "gisu-daraz-dargah": ["Khwaja Banda Nawaz dargah", "Bande Nawaz Kalaburagi"],
    "firuzabad": ["Firuzabad Karnataka", "Firozabad Kalaburagi"],
    "gulbarga-fort": ["Gulbarga Fort", "Kalaburagi Fort"],
    "haft-gumbaz-tombs": ["Haft Gumbaz Kalaburagi", "Haft Gumbaz"],
    "fateh-darwaza": ["Fateh Darwaza Golconda", "Golconda Fort gates"],
    "osmania-university": ["Osmania University Arts College", "Osmania University"],
    "rangin-mahal": ["Rangin Mahal Bidar"],
    "chini-mahal": ["Chini Mahal Daulatabad", "Daulatabad Fort interior"],
    "vittala": ["Vittala temple Hampi", "Vitthala Temple Hampi"],
    "warangal-thoranam": ["Kakatiya Kala Thoranam", "Warangal Fort"],
    "rangin-mahal": ["Rangin Mahal Bidar", "Bidar Fort palaces"],
    "chini-mahal": ["Chini Mahal Daulatabad", "Daulatabad Fort buildings"],
    "vittala": ["Vitthala Temple Hampi", "Vittala temple Hampi"],
    "ellora": ["Ellora Caves", "Ellora cave temples"],
    "firuzabad": ["Firozabad Kalaburagi district", "Firuzabad Deccan"],
}

# Deliberately NOT fetched, after inspecting what came back: Commons has no
# category of its own for the Queen's Bath at Hampi, the Upli Buruj or the Taj
# Bawadi, and the broad fallback categories ("Royal Centre (Hampi)",
# "Bijapur", "Stepwells in Karnataka") return other monuments entirely. A
# photograph captioned as a building it is not is worse than no photograph, so
# those sites keep their placeholder.

JUNK = (
    "commons-logo", "wikidata", "wiki_letter", "symbol_", "flag_of",
    "location_map", "red_pog", "icon", "logo", "map_of", "coat_of_arms", "_svg",
)


def fetch(url, tries=4):
    delay = 6
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise
    return None


def api(**params):
    params.setdefault("format", "json")
    return json.loads(fetch(COMMONS + urllib.parse.urlencode(params)).decode())


def find_categories(term, limit=3):
    data = api(action="query", list="search", srsearch=term,
               srnamespace=14, srlimit=limit)
    return [r["title"] for r in data.get("query", {}).get("search", [])]


def category_files(category):
    data = api(action="query", list="categorymembers",
               cmtitle=category, cmtype="file", cmlimit=25)
    out = []
    for m in data.get("query", {}).get("categorymembers", []):
        low = m["title"].lower().replace(" ", "_")
        if not low.endswith((".jpg", ".jpeg", ".png")):
            continue
        if any(j in low for j in JUNK):
            continue
        out.append(m["title"])
    return out


def file_url(file_title, size=1600):
    data = api(action="query", titles=file_title, prop="imageinfo",
               iiprop="url", iiurlwidth=size)
    for page in data.get("query", {}).get("pages", {}).values():
        for info in page.get("imageinfo", []):
            return info.get("thumburl") or info.get("url")
    return None


def existing_hashes():
    seen = {}
    for f in os.listdir(OUT):
        path = os.path.join(OUT, f)
        if os.path.isfile(path):
            with open(path, "rb") as fh:
                seen[hashlib.md5(fh.read()).hexdigest()] = f
    return seen


def try_category(cat, slug, seen):
    for f in category_files(cat)[:6]:
        try:
            url = file_url(f)
            time.sleep(1)
            if not url:
                continue
            blob = fetch(url)
            if not blob or len(blob) < 40000:      # tiny files are crops/icons
                continue
            digest = hashlib.md5(blob).hexdigest()
            if digest in seen:
                continue
            ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
            if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                ext = ".jpg"
            dest = os.path.join(OUT, slug + ext)
            with open(dest, "wb") as fh:
                fh.write(blob)
            seen[digest] = slug + ext
            print(f"  ok  {slug:<22} {len(blob)//1024:>5} KB  <- {cat}", flush=True)
            return True
        except Exception:  # noqa: BLE001
            continue
    return False


def main():
    os.makedirs(OUT, exist_ok=True)
    seen = existing_hashes()
    have = {f.rsplit(".", 1)[0] for f in os.listdir(OUT)}
    ok, fail = 0, []

    for slug, terms in TOPICS.items():
        if slug in have:
            continue
        got = False
        for term in terms:
            try:
                cats = find_categories(term)
            except Exception as e:  # noqa: BLE001
                fail.append((slug, term, str(e)))
                break
            for cat in cats:
                if try_category(cat, slug, seen):
                    ok += 1
                    got = True
                    break
                time.sleep(1)
            if got:
                break
            time.sleep(2)
        if not got and not any(x[0] == slug for x in fail):
            fail.append((slug, terms[0], "nothing usable found"))
        time.sleep(2)

    print(f"\n{ok} downloaded, {len(fail)} failed")
    for slug, term, err in fail:
        print(f"  FAIL {slug} ({term}): {err}")


if __name__ == "__main__":
    sys.exit(main())
