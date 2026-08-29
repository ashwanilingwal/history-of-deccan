#!/usr/bin/env python3
"""Fallback fetcher for the monuments whose Wikipedia articles carry no lead
image of their own.

Falling back to the parent article does not work — every Hampi monument then
gets whatever photograph happens to sit first on the Hampi page, so ten
thumbnails end up identical. This goes to Wikimedia Commons instead and pulls
from the monument's own category, which is where the per-monument photographs
actually live.

Every downloaded file is hashed against everything already in ../images/, so a
slug can never end up with a picture another slug is already using: if a
candidate is a duplicate it is discarded and the next candidate tried.

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

# slug -> Commons categories to try, in order
TOPICS = {
    "hazara-rama": ["Hazara Rama Temple", "Hazara Rama Temple, Hampi"],
    "mahanavami-dibba": ["Mahanavami Dibba", "Royal Enclosure, Hampi"],
    "queens-bath": ["Queen's Bath, Hampi", "Queens Bath (Hampi)"],
    "elephant-stables": ["Elephant Stables, Hampi", "Zenana Enclosure, Hampi"],
    "ugra-narasimha": ["Lakshmi Narasimha Temple, Hampi", "Narasimha statue, Hampi"],
    "krishna-temple-hampi": ["Krishna Temple, Hampi", "Balakrishna Temple, Hampi"],
    "hemakuta": ["Hemakuta Hill", "Hemakuta group of temples"],
    "achyutaraya": ["Achyutaraya Temple", "Tiruvengalanatha Temple, Hampi"],
    "hampi-bazaar": ["Hampi Bazaar", "Virupaksha Bazaar"],
    "asar-mahal": ["Asar Mahal", "Asar Mahal, Bijapur"],
    "malik-e-maidan": ["Malik-e-Maidan", "Malik e Maidan"],
    "upli-buruj": ["Upli Buruj", "Upli Burj"],
    "taj-bawadi": ["Taj Bawadi", "Taj Baori"],
    "gagan-mahal-bijapur": ["Gagan Mahal, Bijapur"],
    "sat-manzil": ["Sat Manzil, Bijapur", "Sath Manzil"],
    "chaubara": ["Chaubara, Bidar", "Chaubara Bidar"],
    "barid-shahi-tombs": ["Barid Shahi Tombs", "Barid Shahi Garden"],
    "takht-mahal": ["Takht Mahal, Bidar", "Bidar Fort"],
    "gisu-daraz-dargah": ["Dargah of Khwaja Banda Nawaz", "Bande Nawaz Dargah"],
    "firuzabad": ["Firuzabad, Karnataka", "Firozabad, Karnataka"],
    "gulbarga-fort": ["Gulbarga Fort"],
    "haft-gumbaz-tombs": ["Haft Gumbaz", "Haft Gumbaz, Kalaburagi"],
    "fateh-darwaza": ["Fateh Darwaza", "Gates of Golconda Fort"],
    "warangal-fort-gate": ["Kakatiya Kala Thoranam", "Warangal Fort"],
    "purana-pul-bridge": ["Purana Pul"],
}

JUNK = (
    "commons-logo", "wikidata", "wiki_letter", "symbol_", "flag_of",
    "location_map", "red_pog", "icon", "logo", "map_of", "coat_of_arms",
    "panorama_of", "_svg",
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


def category_files(category):
    data = api(action="query", list="categorymembers",
               cmtitle="Category:" + category, cmtype="file", cmlimit=25)
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


def main():
    os.makedirs(OUT, exist_ok=True)
    seen = existing_hashes()
    have = {f.rsplit(".", 1)[0] for f in os.listdir(OUT)}
    ok, fail = 0, []

    for slug, cats in TOPICS.items():
        if slug in have:
            continue
        got = False
        for cat in cats:
            try:
                files = category_files(cat)
            except Exception as e:  # noqa: BLE001
                fail.append((slug, cat, str(e)))
                break
            for f in files[:6]:
                try:
                    url = file_url(f)
                    time.sleep(1)
                    if not url:
                        continue
                    blob = fetch(url)
                    if not blob or len(blob) < 12000:
                        continue
                    digest = hashlib.md5(blob).hexdigest()
                    if digest in seen:
                        print(f"  dup {slug:<22} matches {seen[digest]} — trying next",
                              flush=True)
                        continue
                    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
                    if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                        ext = ".jpg"
                    dest = os.path.join(OUT, slug + ext)
                    with open(dest, "wb") as fh:
                        fh.write(blob)
                    seen[digest] = slug + ext
                    print(f"  ok  {slug:<22} {len(blob)//1024:>5} KB  <- {cat}", flush=True)
                    ok += 1
                    got = True
                    break
                except Exception:  # noqa: BLE001
                    continue
            if got:
                break
            time.sleep(2)
        if not got and not any(x[0] == slug for x in fail):
            fail.append((slug, cats[0], "no usable image in category"))
        time.sleep(2)

    print(f"\n{ok} downloaded, {len(fail)} failed")
    for slug, cat, err in fail:
        print(f"  FAIL {slug} ({cat}): {err}")


if __name__ == "__main__":
    sys.exit(main())
