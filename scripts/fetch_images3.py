#!/usr/bin/env python3
"""Third wave: the individual monuments named on the per-city plans that the
first two waves did not cover, so every numbered site on a city map has a
photograph behind it.

Re-runnable: skips slugs that already have a file in ../images/.
Same throttling and backoff as wave two — the Wikipedia API rate-limits hard.
"""
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

TOPICS = {
    # ---- Hampi / Vijayanagara ----
    "hazara-rama": ["Hazara Rama Temple", "Hazara Rama temple, Hampi"],
    "mahanavami-dibba": ["Mahanavami Dibba", "Royal Centre, Hampi"],
    "queens-bath": ["Queen's Bath, Hampi", "Queens Bath, Hampi"],
    "elephant-stables": ["Elephant Stables, Hampi", "Zenana Enclosure, Hampi"],
    "ugra-narasimha": ["Lakshmi Narasimha temple, Hampi", "Ugra Narasimha"],
    "krishna-temple-hampi": ["Krishna Temple, Hampi", "Balakrishna Temple, Hampi"],
    "hemakuta": ["Hemakuta Hill", "Hemakuta hill temples"],
    "achyutaraya": ["Achyutaraya Temple", "Tiruvengalanatha Temple, Hampi"],
    "hampi-bazaar": ["Hampi Bazaar", "Virupaksha Temple, Hampi"],

    # ---- Bijapur ----
    "gagan-mahal": ["Gagan Mahal, Bijapur", "Gagan Mahal"],
    "asar-mahal": ["Asar Mahal"],
    "malik-e-maidan": ["Malik-e-Maidan", "Malik E Maidan"],
    "upli-buruj": ["Upli Buruj"],
    "taj-bawadi": ["Taj Bawadi", "Taj Bawdi"],
    "sat-manzil": ["Sat Manzil", "Bijapur"],
    "begum-talab": ["Begum Talab", "Bijapur"],

    # ---- Bidar ----
    "solah-khamba": ["Solah Khamba Mosque"],
    "chaubara": ["Chaubara, Bidar", "Chaubara"],
    "barid-shahi-tombs": ["Barid Shahi Park", "Barid Shahi dynasty"],
    "takht-mahal": ["Bidar Fort"],
    "naubad-karez": ["Karez, Bidar", "Qanat"],

    # ---- Gulbarga ----
    "jama-masjid-gulbarga": ["Jama Mosque, Kalaburagi", "Jama Masjid, Gulbarga"],
    "gisu-daraz-dargah": ["Bandenawaz", "Khwaja Banda Nawaz"],
    "chor-gumbad": ["Chor Gumbad", "Gulbarga"],
    "firuzabad": ["Firuzabad, Karnataka", "Firuzabad (Deccan)"],
    "gulbarga-fort": ["Gulbarga Fort"],

    # ---- Warangal ----
    "pakhal-lake": ["Pakhal Lake"],

    # ---- Ahmadnagar ----
    "salabat-khan-tomb": ["Tomb of Salabat Khan II", "Chand Bibi Mahal"],
    "farah-bagh": ["Farah Bagh"],
    "bagh-rauza": ["Bagh Rauza", "Ahmadnagar Sultanate"],
    "damdi-masjid": ["Damdi Mosque", "Damdi Masjid"],

    # ---- Golconda / Hyderabad ----
    "fateh-darwaza": ["Golconda Fort"],
    "hayat-bakshi-mosque": ["Hayat Bakshi Begum", "Hayat Bakshi Mosque"],
    "laad-bazaar": ["Laad Bazaar"],
    "gulzar-houz": ["Gulzar Houz", "Char Kaman"],
    "osman-sagar": ["Osman Sagar"],
    "kachiguda-station": ["Kacheguda railway station"],
}


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


def lead_image_url(title, size=1600):
    q = urllib.parse.urlencode({
        "action": "query", "titles": title, "prop": "pageimages",
        "piprop": "thumbnail", "pithumbsize": size, "redirects": 1, "format": "json",
    })
    data = json.loads(fetch("https://en.wikipedia.org/w/api.php?" + q).decode())
    for page in data.get("query", {}).get("pages", {}).values():
        src = page.get("thumbnail", {}).get("source")
        if src:
            return src
    return None


def main():
    os.makedirs(OUT, exist_ok=True)
    have = {f.rsplit(".", 1)[0] for f in os.listdir(OUT)}
    ok, fail = 0, []
    for slug, titles in TOPICS.items():
        if slug in have:
            continue
        got = False
        for t in titles:
            try:
                url = lead_image_url(t)
            except Exception as e:  # noqa: BLE001
                fail.append((slug, t, str(e)))
                break
            if url:
                try:
                    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
                    if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                        ext = ".jpg"
                    dest = os.path.join(OUT, slug + ext)
                    with open(dest, "wb") as f:
                        f.write(fetch(url))
                    print(f"  ok  {slug:<24} {os.path.getsize(dest)//1024:>5} KB  <- {t}", flush=True)
                    ok += 1
                    got = True
                except Exception as e:  # noqa: BLE001
                    fail.append((slug, t, str(e)))
                break
            time.sleep(2)
        if not got and not any(f[0] == slug for f in fail):
            fail.append((slug, titles[0], "no lead image"))
        time.sleep(3)
    print(f"\n{ok} downloaded, {len(fail)} failed")
    for slug, title, err in fail:
        print(f"  FAIL {slug} ({title}): {err}")


if __name__ == "__main__":
    sys.exit(main())
