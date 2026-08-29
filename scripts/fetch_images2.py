#!/usr/bin/env python3
"""Fetch the second, larger wave of images: individual monuments for the
per-city maps and galleries, plus rulers, objects and events.

Re-runnable: skips slugs that already have a file in ../images/.
Throttled + retrying, because the Wikipedia API rate-limits hard.
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

# slug -> list of candidate Wikipedia article titles (first with a lead image wins)
TOPICS = {
    # ---- Hampi / Vijayanagara ----
    "vittala": ["Vittala Temple, Hampi", "Vijaya Vittala Temple", "Hampi"],
    "stone-chariot": ["Stone Chariot, Hampi", "Vittala Temple, Hampi"],
    "hampi-elephant-stables": ["Elephant Stables, Hampi", "Zenana Enclosure, Hampi"],
    "hazara-rama": ["Hazara Rama Temple", "Hazara Rama temple, Hampi"],
    "krishna-temple-hampi": ["Krishna Temple, Hampi", "Balakrishna Temple, Hampi"],
    "ugra-narasimha": ["Lakshmi Narasimha, Hampi", "Ugra Narasimha"],
    "queens-bath": ["Queen's Bath, Hampi"],
    "mahanavami-dibba": ["Mahanavami Dibba", "Royal Centre, Hampi"],
    "hemakuta": ["Hemakuta Hill", "Hemakuta hill temples"],
    "vijayanagara-coin": ["Vijayanagara coinage", "Pagoda (coin)", "Varaha (coin)"],
    "krishnadevaraya-statue": ["Krishnadevaraya"],
    "tungabhadra": ["Tungabhadra River"],

    # ---- Golconda / Hyderabad ----
    "taramati-baradari": ["Taramati Baradari"],
    "badshahi-ashurkhana": ["Badshahi Ashurkhana"],
    "toli-masjid": ["Toli Masjid"],
    "king-kothi": ["King Kothi Palace"],
    "purani-haveli": ["Purani Haveli"],
    "osmania-university": ["Osmania University", "Osmania University Arts College"],
    "hyderabad-high-court": ["Telangana High Court", "High Court of Judicature at Hyderabad"],
    "salar-jung-museum": ["Salar Jung Museum"],
    "state-central-library": ["State Central Library, Hyderabad"],
    "city-college": ["City College, Hyderabad"],
    "osmania-hospital": ["Osmania General Hospital"],
    "char-kaman": ["Char Kaman"],
    "british-residency": ["British Residency, Hyderabad", "Koti Women's College"],
    "musi-river": ["Musi River (India)"],
    "koh-i-noor": ["Koh-i-Noor"],
    "hope-diamond": ["Hope Diamond"],
    "jacob-diamond": ["Jacob Diamond", "Nizam of Hyderabad"],
    "moazzam-jahi-market": ["Moazzam Jahi Market"],
    "nizamia-observatory": ["Nizamia Observatory"],

    # ---- Bijapur ----
    "jama-masjid-bijapur": ["Jama Masjid, Bijapur"],
    "gagan-mahal": ["Gagan Mahal, Bijapur"],
    "asar-mahal": ["Asar Mahal"],
    "bara-kaman": ["Bara Kaman"],
    "malik-e-maidan": ["Malik E Maidan", "Malik-e-Maidan"],
    "upli-buruj": ["Upli Buruj"],
    "taj-bawadi": ["Taj Bawadi"],

    # ---- Bidar / Gulbarga ----
    "rangin-mahal": ["Rangin Mahal", "Bidar Fort"],
    "barid-shahi-tombs": ["Barid Shahi Park", "Barid Shahi dynasty"],
    "bidriware": ["Bidriware"],
    "haft-gumbaz": ["Haft Gumbaz", "Gulbarga"],
    "gisu-daraz-dargah": ["Bandenawaz", "Khwaja Banda Nawaz"],

    # ---- Daulatabad / Aurangabad ----
    "chand-minar": ["Chand Minar"],
    "chini-mahal": ["Daulatabad Fort"],
    "bibi-ka-maqbara": ["Bibi Ka Maqbara"],
    "panchakki": ["Panchakki"],
    "aurangzeb-tomb": ["Tomb of Aurangzeb", "Khuldabad"],
    "grishneshwar": ["Grishneshwar Temple"],
    "kailasa-temple": ["Kailasa Temple, Ellora"],

    # ---- Warangal / Telangana ----
    "kakatiya-thoranam": ["Kakatiya Kala Thoranam", "Warangal Fort"],
    "bhadrakali-temple": ["Bhadrakali Temple, Warangal"],
    "bhadrachalam": ["Bhadrachalam Temple"],

    # ---- Ahmadnagar ----
    "ahmednagar-fort": ["Ahmednagar Fort"],
    "salabat-khan-tomb": ["Salabat Khan II's tomb", "Chand Bibi Mahal"],

    # ---- People ----
    "sultan-quli": ["Sultan Quli Qutb Shah"],
    "muhammad-quli-qutb-shah": ["Muhammad Quli Qutb Shah"],
    "ibrahim-quli": ["Ibrahim Quli Qutb Shah Wali"],
    "abul-hasan-tana-shah": ["Abul Hasan Qutb Shah"],
    "mahmud-gawan": ["Mahmud Gawan"],
    "yusuf-adil-shah": ["Yusuf Adil Shah"],
    "ibrahim-adil-shah-2": ["Ibrahim Adil Shah II"],
    "muhammad-adil-shah": ["Mohammed Adil Shah"],
    "harihara-1": ["Harihara I", "Bukka Raya I"],
    "jahangir": ["Jahangir"],
    "mir-jumla": ["Mir Jumla II"],
    "afzal-khan": ["Afzal Khan (general)"],
    "mahbub-ali-khan": ["Mahbub Ali Khan, Asaf Jah VI", "Asaf Jah VI"],
    "shah-jahan": ["Shah Jahan"],
    "visvesvaraya": ["M. Visvesvaraya"],

    # ---- Culture / events ----
    "deccani-painting": ["Deccan painting", "Deccani painting"],
    "kitab-i-nauras": ["Ibrahim Adil Shah II"],
    "operation-polo": ["Annexation of Hyderabad", "Operation Polo"],
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
                    print(f"  ok  {slug:<26} {os.path.getsize(dest)//1024:>5} KB  <- {t}", flush=True)
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
