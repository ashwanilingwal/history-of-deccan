#!/usr/bin/env python3
"""Find real coordinates for every site on the city plans.

The plans were schematic — markers at invented positions. To put a real map
behind them, the markers have to be real too. This asks Wikipedia for each
monument's coordinates, batching 40 titles per request (the API allows 50) so
the whole job is a handful of calls rather than 112, which is also what keeps
it off the rate limiter.

Writes scripts/site_coords.json:  { city: [ {name, lat, lon, source}, ... ] }

Sites it cannot locate are written with lat/lon null and reported at the end.
Some genuinely have no point to locate — "the durbar halls", "the water
system" — and are meant to stay unlocated.
"""
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PLACES = os.path.join(HERE, "..", "js", "places.js")
OUT = os.path.join(HERE, "site_coords.json")
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal non-commercial history project)"}

# Where a site's name alone will not find the right article, say what will.
# An empty string means "this has no single point — leave it unlocated".
HINTS = {
    ("daulatabad", "The citadel"): "Daulatabad Fort",
    ("daulatabad", "The Andheri"): "Daulatabad Fort",
    ("daulatabad", "Jami Masjid"): "Bharat Mata Temple, Daulatabad",
    ("daulatabad", "Khuldabad"): "Khuldabad",
    ("daulatabad", "Ellora"): "Ellora Caves",
    ("daulatabad", "Ajanta"): "Ajanta Caves",
    ("daulatabad", "Grishneshwar"): "Grishneshwar Temple",
    ("daulatabad", "Bibi ka Maqbara"): "Bibi Ka Maqbara",
    ("daulatabad", "Chini Mahal"): "Daulatabad Fort",
    ("warangal", "Kala Thoranam"): "Warangal Fort",
    ("warangal", "The stone fort"): "Warangal Fort",
    ("warangal", "Swayambhu temple"): "Warangal Fort",
    ("warangal", "Thousand Pillars"): "Thousand Pillar Temple",
    ("warangal", "Hanamkonda hill"): "Hanamkonda",
    ("warangal", "Bhadrakali temple"): "Bhadrakali Temple, Warangal",
    ("warangal", "Pakhal lake"): "Pakhal Lake",
    ("warangal", "Ramappa temple"): "Ramappa Temple",
    ("warangal", "Bhadrachalam"): "Bhadrachalam Temple",
    ("gulbarga", "Gulbarga Fort"): "Gulbarga Fort",
    ("gulbarga", "Jama Masjid"): "Jama Mosque, Kalaburagi",
    ("gulbarga", "The citadel"): "Gulbarga Fort",
    ("gulbarga", "Dargah of Gisu Daraz"): "Bandenawaz",
    ("gulbarga", "Haft Gumbaz"): "Haft Gumbaz",
    ("gulbarga", "Shah Bazaar Masjid"): "Kalaburagi",
    ("gulbarga", "Langar ki Masjid"): "Kalaburagi",
    ("gulbarga", "Chor Gumbad"): "Kalaburagi",
    ("gulbarga", "Firuzabad"): "Firuzabad, Karnataka",
    ("bidar", "Bidar Fort"): "Bidar Fort",
    ("bidar", "Rangin Mahal"): "Bidar Fort",
    ("bidar", "Solah Khamba Masjid"): "Solah Khamba Mosque",
    ("bidar", "Takht Mahal"): "Bidar Fort",
    ("bidar", "Gawan's madrasa"): "Mahmud Gawan Madrasa",
    ("bidar", "Chaubara"): "Chaubara, Bidar",
    ("bidar", "Bahmani tombs, Ashtur"): "Bahmani Tombs",
    ("bidar", "Chaukhandi"): "Bidar",
    ("bidar", "Barid Shahi tombs"): "Barid Shahi Tombs",
    ("bidar", "Naubad karez"): "Bidar",
    ("hampi", "Virupaksha temple"): "Virupaksha Temple, Hampi",
    ("hampi", "Hampi bazaar"): "Hampi",
    ("hampi", "Hemakuta hill"): "Hemakuta Hill",
    ("hampi", "Ugra Narasimha"): "Lakshmi Narasimha, Hampi",
    ("hampi", "Krishna temple"): "Krishna Temple, Hampi",
    ("hampi", "Achyutaraya temple"): "Achyutaraya Temple",
    ("hampi", "Vittala temple"): "Vittala Temple, Hampi",
    ("hampi", "The stone chariot"): "Vittala Temple, Hampi",
    ("hampi", "Hazara Rama temple"): "Hazara Rama Temple",
    ("hampi", "Mahanavami Dibba"): "Hampi",
    ("hampi", "Lotus Mahal"): "Lotus Mahal",
    ("hampi", "Elephant stables"): "Elephant Stables, Hampi",
    ("hampi", "Queen's Bath"): "Queen's Bath, Hampi",
    ("bijapur", "Gol Gumbaz"): "Gol Gumbaz",
    ("bijapur", "Ibrahim Rauza"): "Ibrahim Rauza",
    ("bijapur", "Jama Masjid"): "Jama Mosque, Bijapur",
    ("bijapur", "Gagan Mahal"): "Gagan Mahal, Bijapur",
    ("bijapur", "Sat Manzil"): "Vijayapura, Karnataka",
    ("bijapur", "Asar Mahal"): "Asar Mahal",
    ("bijapur", "Bara Kaman"): "Bara Kaman",
    ("bijapur", "Malik-e-Maidan"): "Malik-E-Maidan",
    ("bijapur", "Upli Buruj"): "Upli Buruj",
    ("bijapur", "Taj Bawadi"): "Vijayapura, Karnataka",
    ("bijapur", "Begum Talab"): "Vijayapura, Karnataka",
    ("bijapur", "Nauraspur"): "Vijayapura, Karnataka",
    ("golconda", "Bala Hisar"): "Golconda Fort",
    ("golconda", "Fateh Darwaza"): "Golconda Fort",
    ("golconda", "Bala Hisar Darwaza"): "Golconda Fort",
    ("golconda", "Jama Masjid"): "Golconda Fort",
    ("golconda", "The durbar halls"): "",
    ("golconda", "The water system"): "",
    ("golconda", "Qutb Shahi tombs"): "Qutb Shahi tombs",
    ("golconda", "The mortuary bath"): "Qutb Shahi tombs",
    ("golconda", "Hayat Bakshi Begum's mosque"): "Hayat Bakshi Mosque",
    ("golconda", "Taramati Baradari"): "Taramati Baradari",
    ("golconda", "Purana Pul"): "Purana pul",
    ("hyderabad", "Charminar"): "Charminar",
    ("hyderabad", "Mecca Masjid"): "Makkah Masjid, Hyderabad",
    ("hyderabad", "Char Kaman"): "Char Kaman",
    ("hyderabad", "Badshahi Ashurkhana"): "Badshahi Ashurkhana",
    ("hyderabad", "Laad Bazaar"): "Laad Bazaar",
    ("hyderabad", "Chowmahalla Palace"): "Chowmahalla Palace",
    ("hyderabad", "Purani Haveli"): "Purani Haveli",
    ("hyderabad", "Paigah Tombs"): "Paigah Tombs",
    ("hyderabad", "Falaknuma Palace"): "Falaknuma Palace",
    ("hyderabad", "Salar Jung Museum"): "Salar Jung Museum",
    ("hyderabad", "High Court"): "Telangana High Court",
    ("hyderabad", "Osmania Hospital"): "Osmania General Hospital",
    ("hyderabad", "State Central Library"): "State Central Library, Hyderabad",
    ("hyderabad", "Osmania University"): "Osmania University",
    ("hyderabad", "British Residency"): "British Residency, Hyderabad",
    ("hyderabad", "Purana Pul"): "Purana pul",
    ("hyderabad", "Osman Sagar"): "Osman Sagar",
    ("hyderabad", "Kachiguda station"): "Kacheguda railway station",
    ("ahmednagar", "Ahmadnagar Fort"): "Ahmednagar Fort",
    ("ahmednagar", "Chand Bibi's breach"): "",
    ("ahmednagar", "Kille Ark"): "Ahmednagar Fort",
    ("ahmednagar", "Bagh Rauza"): "Ahmednagar",
    ("ahmednagar", "Damdi Masjid"): "Ahmednagar",
    ("ahmednagar", "Farah Bagh"): "Farah Bagh",
    ("ahmednagar", "The tombs of favourites"): "",
    ("ahmednagar", "Tomb of Salabat Khan II"): "Tomb of Salabat Khan II",
    ("ahmednagar", "Malik Ambar"): "Khuldabad",
    ("aurangabad", "Khadki / the old city"): "Chhatrapati Sambhajinagar",
    ("aurangabad", "Bibi ka Maqbara"): "Bibi Ka Maqbara",
    ("aurangabad", "Panchakki"): "Panchakki",
    ("aurangabad", "Nehr-e-Ambari"): "Chhatrapati Sambhajinagar",
    ("aurangabad", "Daulatabad Fort"): "Daulatabad Fort",
    ("aurangabad", "Chand Minar"): "Chand Minar",
    ("aurangabad", "Khuldabad"): "Khuldabad",
    ("aurangabad", "Ellora"): "Ellora Caves",
    ("aurangabad", "Grishneshwar"): "Grishneshwar Temple",
    ("aurangabad", "Ajanta"): "Ajanta Caves",
}


def read_sites():
    """Pull (city, site name) pairs straight out of places.js via node."""
    script = (
        'const fs=require("fs"),vm=require("vm");const c={};vm.createContext(c);'
        'vm.runInContext(fs.readFileSync(%r,"utf8")+"\\n;globalThis.__P=PLACES;",c);'
        'console.log(JSON.stringify(c.__P.map(p=>({id:p.id,'
        'sites:p.cityMap.sites.map(s=>s.name)}))));' % PLACES
    )
    out = subprocess.run(["node", "-e", script], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def fetch(url):
    for attempt in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < 4:
                time.sleep(6 * (attempt + 1))
                continue
            raise
    return {}


def coords_for(titles):
    """Batch lookup. Returns {normalised title: (lat, lon)}."""
    found, redirects = {}, {}
    for i in range(0, len(titles), 40):
        chunk = [t for t in titles[i:i + 40] if t]
        if not chunk:
            continue
        q = urllib.parse.urlencode({
            "action": "query", "prop": "coordinates", "titles": "|".join(chunk),
            "redirects": 1, "format": "json", "colimit": "max",
        })
        data = fetch("https://en.wikipedia.org/w/api.php?" + q)
        query = data.get("query", {})
        for r in query.get("redirects", []) or []:
            redirects[r["from"]] = r["to"]
        for r in query.get("normalized", []) or []:
            redirects[r["from"]] = r["to"]
        for pg in query.get("pages", {}).values():
            for c in pg.get("coordinates", []) or []:
                found[pg["title"]] = (c["lat"], c["lon"])
        time.sleep(1.5)
    return found, redirects


# Where Wikipedia has an article but no coordinate template, ask OpenStreetMap.
# Most of these monuments are named features in OSM. Nominatim's policy is one
# request a second with a real User-Agent, which is what this does.
NOMINATIM_HINTS = {
    ("daulatabad", "Jami Masjid"): "Bharat Mata Mandir, Daulatabad Fort, Maharashtra",
    ("warangal", "Kala Thoranam"): "Kakatiya Kala Thoranam, Warangal",
    ("warangal", "The stone fort"): "Warangal Fort, Telangana",
    ("warangal", "Swayambhu temple"): "Swayambhu Temple, Warangal Fort",
    ("gulbarga", "Dargah of Gisu Daraz"): "Khwaja Bande Nawaz Dargah, Kalaburagi",
    ("gulbarga", "Firuzabad"): "Firozabad, Kalaburagi district, Karnataka",
    ("bidar", "Chaubara"): "Chaubara, Bidar, Karnataka",
    ("bidar", "Barid Shahi tombs"): "Barid Shahi Park, Bidar",
    ("hampi", "Hemakuta hill"): "Hemakuta Hill, Hampi",
    ("hampi", "Ugra Narasimha"): "Lakshmi Narasimha, Hampi",
    ("hampi", "Krishna temple"): "Sri Krishna Temple, Hampi",
    ("hampi", "Achyutaraya temple"): "Achyutaraya Temple, Hampi",
    ("hampi", "Vittala temple"): "Vittala Temple, Hampi",
    ("hampi", "The stone chariot"): "Stone Chariot, Hampi",
    ("hampi", "Hazara Rama temple"): "Hazara Rama Temple, Hampi",
    ("hampi", "Elephant stables"): "Elephant Stables, Hampi",
    ("hampi", "Queen's Bath"): "Queens Bath, Hampi",
    ("bijapur", "Gagan Mahal"): "Gagan Mahal, Vijayapura, Karnataka",
    ("bijapur", "Asar Mahal"): "Asar Mahal, Vijayapura",
    ("bijapur", "Upli Buruj"): "Upli Buruj, Vijayapura",
    ("golconda", "Taramati Baradari"): "Taramati Baradari, Hyderabad",
    ("golconda", "Purana Pul"): "Purana Pul, Hyderabad",
    ("hyderabad", "Purana Pul"): "Purana Pul, Hyderabad",
    ("gulbarga", "Shah Bazaar Masjid"): "Shah Bazar Masjid, Kalaburagi",
    ("gulbarga", "Langar ki Masjid"): "Langar Ki Masjid, Kalaburagi",
    ("gulbarga", "Chor Gumbad"): "Chor Gumbad, Kalaburagi",
    ("bidar", "Chaukhandi"): "Chaukhandi of Hazrat Khalil Ullah, Bidar",
    ("bidar", "Naubad karez"): "Naubad Karez, Bidar",
    ("bijapur", "Taj Bawadi"): "Taj Bawadi, Vijayapura",
    ("bijapur", "Begum Talab"): "Begum Talab, Vijayapura",
    ("ahmednagar", "Bagh Rauza"): "Bagh Rauza, Ahmednagar",
    ("ahmednagar", "Damdi Masjid"): "Damdi Masjid, Ahmednagar",
    ("aurangabad", "Nehr-e-Ambari"): "Panchakki, Chhatrapati Sambhajinagar",
}


def nominatim(query):
    q = urllib.parse.urlencode({"q": query, "format": "json", "limit": 1})
    try:
        data = fetch("https://nominatim.openstreetmap.org/search?" + q)
    except Exception:
        return None
    time.sleep(1.2)                      # Nominatim: max one request a second
    if isinstance(data, list) and data:
        return float(data[0]["lat"]), float(data[0]["lon"])
    return None


def main():
    places = read_sites()
    wanted = []
    for p in places:
        for name in p["sites"]:
            wanted.append((p["id"], name, HINTS.get((p["id"], name), name)))

    titles = sorted({t for _, _, t in wanted if t})
    print("  looking up %d distinct titles for %d sites…" % (len(titles), len(wanted)))
    found, redirects = coords_for(titles)

    def lookup(title):
        seen = set()
        while title in redirects and title not in seen:
            seen.add(title)
            title = redirects[title]
        return found.get(title)

    out, located, skipped, missing = {}, 0, 0, []
    for city, name, title in wanted:
        out.setdefault(city, [])
        if not title:
            out[city].append({"name": name, "lat": None, "lon": None, "source": "no single point"})
            skipped += 1
            continue
        c = lookup(title)
        if c:
            out[city].append({"name": name, "lat": c[0], "lon": c[1], "source": title})
            located += 1
        else:
            q = NOMINATIM_HINTS.get((city, name))
            c = nominatim(q) if q else None
            if c:
                out[city].append({"name": name, "lat": c[0], "lon": c[1],
                                  "source": "OpenStreetMap: " + q})
                located += 1
            else:
                out[city].append({"name": name, "lat": None, "lon": None, "source": None})
                missing.append("%s / %s  (tried %r)" % (city, name, title))

    with open(OUT, "w") as f:
        json.dump(out, f, indent=2)

    print("\n  located    : %d" % located)
    print("  no point   : %d  (deliberate — nothing single to locate)" % skipped)
    print("  not found  : %d" % len(missing))
    for m in missing:
        print("     " + m)
    print("\n  wrote %s" % os.path.relpath(OUT, os.path.join(HERE, "..")))
    return 0


if __name__ == "__main__":
    sys.exit(main())
