#!/usr/bin/env python3
"""Fetch high-resolution lead images for Deccan history topics.

Uses the Wikipedia 'pageimages' API to grab the lead (representative) image
of each article at high resolution, and saves it into ../images/.
Re-runnable: skips files that already exist.
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "images")
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal history project)"}

# slug -> Wikipedia article title
TOPICS = {
    "charminar": "Charminar",
    "golconda": "Golconda Fort",
    "qutb-shahi-tombs": "Qutb Shahi tombs",
    "mecca-masjid": "Makkah Masjid, Hyderabad",
    "chowmahalla": "Chowmahalla Palace",
    "falaknuma": "Falaknuma Palace",
    "hussain-sagar": "Hussain Sagar",
    "gol-gumbaz": "Gol Gumbaz",
    "ibrahim-rauza": "Ibrahim Rauza",
    "bijapur": "Bijapur",
    "hampi": "Hampi",
    "virupaksha": "Virupaksha Temple, Hampi",
    "vittala": "Vitthala Temple, Hampi",
    "stone-chariot": "Stone Chariot, Hampi",
    "lotus-mahal": "Lotus Mahal",
    "hampi-elephant-stables": "Elephant Stables, Hampi",
    "warangal": "Warangal Fort",
    "thousand-pillar": "Thousand Pillar Temple",
    "ramappa": "Ramappa Temple",
    "daulatabad": "Daulatabad Fort",
    "bidar": "Bidar Fort",
    "mahmud-gawan-madrasa": "Mahmud Gawan Madrasa",
    "bahmani-tombs": "Bahmani Tombs",
    "gulbarga": "Gulbarga Fort",
    "jama-masjid-gulbarga": "Jama Masjid, Gulbarga",
    "ellora": "Ellora Caves",
    "ajanta": "Ajanta Caves",
    "asaf-jah-1": "Asaf Jah I",
    "nizam-ali": "Ali Khan Bahadur, Asaf Jah II",
    "salar-jung": "Salar Jung I",
    "mahbub-ali-khan": "Mahbub Ali Khan",
    "osman-ali-khan": "Mir Osman Ali Khan",
    "aurangzeb": "Aurangzeb",
    "shivaji": "Shivaji",
    "malik-ambar": "Malik Ambar",
    "chand-bibi": "Chand Bibi",
    "talikota": "Battle of Talikota",
    "dupleix": "Joseph Marquis Dupleix",
    "bussy": "Charles Joseph Patissier, Marquis de Bussy-Castelnau",
    "hyder-ali": "Hyder Ali",
    "tipu-sultan": "Tipu Sultan",
    "wellesley": "Richard Wellesley, 1st Marquess Wellesley",
    "assaye": "Battle of Assaye",
    "muhammad-bin-tughluq": "Muhammad bin Tughluq",
    "alauddin-khalji": "Alauddin Khalji",
    "krishnadevaraya": "Krishnadevaraya",
    "hyderabad-state": "Hyderabad State",
    "purana-pul": "Purana Pul",
    "paigah-tombs": "Paigah Tombs",
}


# fallback article titles for slugs whose primary title has no lead image
ALTERNATES = {
    "vittala": ["Vittala Temple", "Group of Monuments at Hampi"],
    "stone-chariot": ["Stone Chariot", "Garuda"],
    "hampi-elephant-stables": ["Elephant stables, Hampi", "Zenana Enclosure"],
    "lotus-mahal": ["Lotus Mahal, Hampi", "Zenana Enclosure"],
}


def fetch(url, tries=4):
    delay = 5
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


def fetch_json(url):
    return json.loads(fetch(url).decode())


def lead_image_url(title, size=1800):
    q = urllib.parse.urlencode({
        "action": "query",
        "titles": title,
        "prop": "pageimages",
        "piprop": "thumbnail|original",
        "pithumbsize": size,
        "redirects": 1,
        "format": "json",
    })
    data = fetch_json("https://en.wikipedia.org/w/api.php?" + q)
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        thumb = page.get("thumbnail", {})
        if thumb.get("source"):
            return thumb["source"]
    return None


def main():
    os.makedirs(OUT, exist_ok=True)
    ok, fail = [], []
    for slug, title in TOPICS.items():
        # skip if already downloaded (any extension)
        existing = [f for f in os.listdir(OUT) if f.startswith(slug + ".")]
        if existing:
            ok.append(slug)
            continue
        try:
            url = None
            for t in [title] + ALTERNATES.get(slug, []):
                url = lead_image_url(t)
                if url:
                    title = t
                    break
                time.sleep(2)
            if not url:
                fail.append((slug, title, "no lead image"))
                continue
            ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
            if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                ext = ".jpg"
            dest = os.path.join(OUT, slug + ext)
            with open(dest, "wb") as f:
                f.write(fetch(url))
            size_kb = os.path.getsize(dest) // 1024
            print(f"  ok  {slug:<24} {size_kb:>6} KB  <- {title}", flush=True)
            ok.append(slug)
        except Exception as e:  # noqa: BLE001
            fail.append((slug, title, str(e)))
        time.sleep(3)
    print(f"\n{len(ok)} downloaded/present, {len(fail)} failed")
    for slug, title, err in fail:
        print(f"  FAIL {slug} ({title}): {err}")


if __name__ == "__main__":
    sys.exit(main())
