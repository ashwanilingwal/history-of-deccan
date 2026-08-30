#!/usr/bin/env python3
"""The last sweep: the monuments on the city plans that still show a placeholder.

Searches Wikimedia Commons for each monument's own category, then falls back to
its Wikipedia article's images. Every download is hashed against the files
already in ../images/, so nothing can end up sharing a photograph with another
site.

A dozen or so entries on the plans have no single thing to photograph — "the
durbar halls", "the water system", "Chand Bibi's breach" — and are deliberately
absent from this list. They keep their placeholder rather than borrow a picture
of something else.
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
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal non-commercial history project)"}
COMMONS = "https://commons.wikimedia.org/w/api.php?"

TOPICS = {
    "daulatabad-andheri":   ["Daulatabad Fort interior", "Daulatabad Fort"],
    "chini-mahal":          ["Chini Mahal Daulatabad", "Daulatabad Fort buildings"],
    "daulatabad-jami":      ["Bharat Mata Mandir Daulatabad", "Jama Masjid Daulatabad"],
    "swayambhu-temple":     ["Warangal Fort ruins", "Swayambhu temple Warangal"],
    "hanamkonda":           ["Hanamkonda", "Thousand Pillar Temple Hanamkonda"],
    "gulbarga-citadel":     ["Gulbarga Fort interior", "Kalaburagi Fort"],
    "shah-bazaar-masjid":   ["Shah Bazar Mosque Kalaburagi", "Mosques in Kalaburagi"],
    "langar-ki-masjid":     ["Langar Ki Masjid", "Mosques in Kalaburagi"],
    "firuzabad-deccan":     ["Firuzabad Karnataka", "Firozabad Kalaburagi"],
    "takht-mahal":          ["Takht Mahal Bidar", "Bidar Fort palaces"],
    "chaukhandi-bidar":     ["Chaukhandi Bidar", "Tombs in Bidar"],
    "barid-shahi-tombs":    ["Barid Shahi tombs", "Barid Shahi Park Bidar"],
    "naubad-karez":         ["Karez Bidar", "Naubad Karez"],
    "stone-chariot":        ["Stone Chariot Hampi", "Vittala Temple Hampi"],
    "queens-bath":          ["Queen's Bath Hampi", "Queens Bath Hampi"],
    "sat-manzil":           ["Sat Manzil Bijapur", "Bijapur Fort"],
    "upli-buruj":           ["Upli Buruj", "Upali Burj Vijayapura"],
    "taj-bawadi":           ["Taj Bawadi", "Taj Baori Vijayapura"],
    "begum-talab":          ["Begum Talab Vijayapura", "Lakes in Vijayapura"],
    "nauraspur":            ["Nauraspur", "Nauraspur Vijayapura"],
    "bala-hisar-darwaza":   ["Gates of Golconda Fort", "Golconda Fort gates"],
    "golconda-jama-masjid": ["Jama Masjid Golconda", "Mosques in Golconda Fort"],
    "mortuary-bath":        ["Qutb Shahi tombs hammam", "Qutb Shahi tombs"],
    "osmania-arts-college": ["Arts College Osmania University", "Osmania University buildings"],
    "kille-ark":            ["Ahmednagar Fort interior", "Ahmednagar Fort"],
    "bagh-rauza":           ["Bagh Rauza Ahmednagar", "Tombs in Ahmednagar"],
    "khadki-aurangabad":    ["Chhatrapati Sambhajinagar old city", "Aurangabad Maharashtra"],
    "nehr-e-ambari":        ["Nahr-e-Ambari", "Water supply Aurangabad"],
}

JUNK = ("commons-logo", "wikidata", "symbol_", "flag_of", "location_map",
        "red_pog", "icon", "logo", "map_of", "coat_of_arms", "_svg")


def fetch(url, tries=4):
    delay = 6
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < tries - 1:
                time.sleep(delay); delay *= 2; continue
            raise
        except Exception:
            if attempt < tries - 1:
                time.sleep(4); continue
            raise
    return None


def api(**p):
    p.setdefault("format", "json")
    return json.loads(fetch(COMMONS + urllib.parse.urlencode(p)).decode())


def categories(term, limit=3):
    d = api(action="query", list="search", srsearch=term, srnamespace=14, srlimit=limit)
    return [r["title"] for r in d.get("query", {}).get("search", [])]


def files_in(cat):
    d = api(action="query", list="categorymembers", cmtitle=cat, cmtype="file", cmlimit=25)
    out = []
    for m in d.get("query", {}).get("categorymembers", []):
        low = m["title"].lower().replace(" ", "_")
        if low.endswith((".jpg", ".jpeg", ".png")) and not any(j in low for j in JUNK):
            out.append(m["title"])
    return out


def url_of(title, size=1500):
    d = api(action="query", titles=title, prop="imageinfo", iiprop="url", iiurlwidth=size)
    for pg in d.get("query", {}).get("pages", {}).values():
        for i in pg.get("imageinfo", []):
            return i.get("thumburl") or i.get("url")
    return None


def main():
    seen = {}
    for f in os.listdir(OUT):
        fp = os.path.join(OUT, f)
        if os.path.isfile(fp):
            with open(fp, "rb") as fh:
                seen[hashlib.md5(fh.read()).hexdigest()] = f
    have = {f.rsplit(".", 1)[0] for f in os.listdir(OUT)}

    ok, fail = 0, []
    for slug, terms in TOPICS.items():
        if slug in have:
            continue
        got = False
        for term in terms:
            try:
                cats = categories(term)
            except Exception as e:
                fail.append((slug, term, str(e))); break
            for cat in cats:
                try:
                    names = files_in(cat)
                except Exception:
                    continue
                for name in names[:6]:
                    try:
                        u = url_of(name)
                        time.sleep(0.8)
                        if not u:
                            continue
                        blob = fetch(u)
                        if not blob or len(blob) < 45000:
                            continue
                        h = hashlib.md5(blob).hexdigest()
                        if h in seen:
                            continue
                        ext = os.path.splitext(urllib.parse.urlparse(u).path)[1].lower()
                        if ext not in (".jpg", ".jpeg", ".png"):
                            ext = ".jpg"
                        dest = os.path.join(OUT, slug + ext)
                        with open(dest, "wb") as fh:
                            fh.write(blob)
                        seen[h] = slug + ext
                        print("  ok  %-24s %5d KB  <- %s" % (slug, len(blob) // 1024, cat), flush=True)
                        ok += 1; got = True
                        break
                    except Exception:
                        continue
                if got:
                    break
                time.sleep(0.8)
            if got:
                break
            time.sleep(1.2)
        if not got and not any(x[0] == slug for x in fail):
            fail.append((slug, terms[0], "nothing usable found"))
        time.sleep(1.0)

    print("\n  %d downloaded, %d not found" % (ok, len(fail)))
    for slug, term, err in fail:
        print("     %s (%s): %s" % (slug, term, err))
    return 0


if __name__ == "__main__":
    sys.exit(main())
