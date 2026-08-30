#!/usr/bin/env python3
"""Attach a "further reading" list to every event in the chronicle.

Every link is checked against the live Wikipedia API before it is written, in
batches of 40, and redirects are followed to the article's real title — so no
guessed URL and no redirect chain ends up in the file. Anything that does not
resolve is reported and left out rather than shipped broken.

Run again after editing READING below; it rewrites the `reading` field on each
event and leaves everything else alone.
"""
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CHRON = os.path.join(HERE, "..", "js", "chronicle.js")
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal non-commercial history project)"}

# event title -> the articles worth sending a reader to next
READING = {
    "The centuries cut from rock": ["Ellora Caves", "Kailasa Temple, Ellora", "Ajanta Caves", "Rashtrakuta dynasty"],
    "Warangal and the thousand pillars": ["Kakatiya dynasty", "Rudrama Devi", "Ramappa Temple", "Warangal Fort"],
    "Two kingdoms, rich beyond rumour": ["Seuna (Yadava) dynasty", "Kakatiya dynasty", "Golconda diamonds"],
    "The raid that bought a throne": ["Alauddin Khalji", "Alauddin Khalji's raid on Devagiri", "Jalal-ud-din Khalji"],
    "Malik Kafur rides to the southern sea": ["Malik Kafur", "Siege of Warangal (1310)", "Amir Khusrau", "Koh-i-Noor"],
    "The fall of Warangal": ["Siege of Warangal (1318)", "Prataparudra II", "Musunuri Nayakas"],
    "The march of a capital": ["Muhammad bin Tughluq", "Daulatabad Fort", "Ziauddin Barani", "Ibn Battuta"],
    "Vijayanagara is founded": ["Vijayanagara Empire", "Harihara I", "Bukka Raya I", "Vidyaranya"],
    "The Centurions' revolt": ["Bahmani Sultanate", "Alauddin Bahman Shah", "Amiran-i Sadah"],
    "Gunpowder, and a war begun over a song": ["Mohammed Shah I", "Bahmani–Vijayanagar War", "Raichur Doab"],
    "The ode that came instead of the poet": ["Taj ud-Din Firuz Shah", "Hafez", "Bande Nawaz"],
    "The capital moves to Bidar": ["Ahmad Shah I Wali", "Bidar Fort", "Bidriware"],
    "An ambassador counts the walls": ["Abd-al-Razzāq Samarqandī", "Deva Raya II", "Hampi"],
    "Mahmud Gawan takes Goa": ["Mahmud Gawan", "Mahmud Gawan Madrasa", "Goa Velha"],
    "The murder of Mahmud Gawan": ["Mahmud Gawan", "Muhammad Shah III Lashkari", "Deccan sultanates"],
    "A sultan, or a stolen Ottoman prince?": ["Yusuf Adil Shah", "Adil Shahi dynasty", "Murad II"],
    "The Turkoman who came from Hamadan": ["Quli Qutb Mulk", "Qutb Shahi dynasty", "Qara Qoyunlu"],
    "Krishnadevaraya": ["Krishnadevaraya", "Amuktamalyada", "Battle of Raichur", "Ashtadiggajas"],
    "Talikota": ["Battle of Talikota", "Aliya Rama Raya", "Deccan sultanates", "Hampi"],
    "Hyderabad is founded": ["Muhammad Quli Qutb Shah", "Charminar", "Hyderabad", "Bhagmati"],
    "Chand Bibi holds the breach": ["Chand Bibi", "Ahmadnagar Sultanate", "Tomb of Salabat Khan II"],
    "Malik Ambar defies an empire": ["Malik Ambar", "Jahangir", "Siddi", "Jahangir Shooting the Head of Malik Ambar"],
    "The dome that should not stand": ["Gol Gumbaz", "Mohammed Adil Shah of Bijapur", "Ibrahim Adil Shah II", "Kitab-i Nauras"],
    "Shivaji and the tiger claws": ["Battle of Pratapgarh", "Shivaji", "Afzal Khan (general)", "Bagh nakha"],
    "Aurangzeb takes the last two kingdoms": ["Siege of Golconda", "Siege of Bijapur", "Abul Hasan Qutb Shah", "Aurangzeb"],
    "Aurangzeb's twenty-year war": ["Mughal–Maratha Wars", "Aurangzeb", "Tomb of Aurangzeb"],
    "The king-makers": ["Sayyid brothers", "Asaf Jah I", "Mughal Empire"],
    "The French years": ["Marquis de Bussy-Castelnau", "Second Carnatic War", "Joseph François Dupleix"],
    "The French corps is disbanded": ["Michel Joachim Marie Raymond", "Subsidiary alliance", "Richard Wellesley, 1st Marquess Wellesley"],
    "Seringapatam and Assaye": ["Siege of Seringapatam (1799)", "Battle of Assaye", "Tipu Sultan", "Arthur Wellesley, 1st Duke of Wellington"],
    "Berar assigned": ["Berar Province", "James Broun-Ramsay, 1st Marquess of Dalhousie", "Hyderabad State"],
    "\\\"If the Nizam goes, all goes\\\"": ["Indian Rebellion of 1857", "Salar Jung I", "Hyderabad State"],
    "Salar Jung remakes the state": ["Salar Jung I", "Salar Jung Museum", "Hyderabad State"],
    "The Musi flood": ["Musi River (India)", "M. Visvesvaraya", "Osman Sagar", "Mahbub Ali Khan, Asaf Jah VI"],
    "The richest man in the world": ["Mir Osman Ali Khan", "Osmania University", "Jacob Diamond", "Vincent Esch"],
    "Operation Polo": ["Annexation of Hyderabad", "Qasim Razvi", "Telangana Rebellion", "Sunderlal Committee"],
}


def fetch(url, tries=4):
    delay = 5
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < tries - 1:
                time.sleep(delay); delay *= 2; continue
            raise
        except Exception:
            if attempt < tries - 1:
                time.sleep(4); continue
            raise
    return {}


def resolve(titles):
    """Which of these exist, and what is each one's real title after redirects?"""
    real, missing = {}, set()
    for i in range(0, len(titles), 40):
        chunk = titles[i:i + 40]
        q = urllib.parse.urlencode({
            "action": "query", "titles": "|".join(chunk),
            "redirects": 1, "format": "json",
        })
        data = fetch("https://en.wikipedia.org/w/api.php?" + q)
        query = data.get("query", {})
        alias = {}
        for r in (query.get("redirects") or []) + (query.get("normalized") or []):
            alias[r["from"]] = r["to"]
        good = set()
        for pg in query.get("pages", {}).values():
            if "missing" not in pg:
                good.add(pg["title"])
        for t in chunk:
            final = t
            seen = set()
            while final in alias and final not in seen:
                seen.add(final); final = alias[final]
            if final in good:
                real[t] = final
            else:
                missing.add(t)
        time.sleep(1.5)
    return real, missing


def main():
    wanted = sorted({t for v in READING.values() for t in v})
    print("  checking %d articles…" % len(wanted))
    real, missing = resolve(wanted)
    print("  %d resolve, %d do not" % (len(real), len(missing)))
    for m in sorted(missing):
        print("     dropped: " + m)

    src = open(CHRON).read()
    added, skipped = 0, []
    for title, arts in READING.items():
        links = []
        for a in arts:
            if a not in real:
                continue
            final = real[a]
            # leave the characters Wikipedia leaves bare in its own canonical URLs
            url = ("https://en.wikipedia.org/wiki/"
                   + urllib.parse.quote(final.replace(" ", "_"), safe="/,()'!*-_.~"))
            links.append({"t": final, "u": url})
        if not links:
            skipped.append(title); continue

        esc = re.escape(title)
        # drop any existing block first so the script is re-runnable
        src = re.sub(r'(title: "' + esc + r'",\n)      reading: \[\n(?:.*?\n)*?      \],\n',
                     r"\1", src)
        body = ",\n".join(
            '        { t: "%s", u: "%s" }' % (l["t"].replace('"', '\\"'), l["u"]) for l in links)
        new, n = re.subn(r'(title: "' + esc + r'",\n)',
                         r"\1      reading: [\n" + body + "\n      ],\n", src, count=1)
        if n:
            src = new; added += 1
        else:
            skipped.append(title)

    open(CHRON, "w").write(src)
    print("\n  reading lists written to %d events" % added)
    for s in skipped:
        print("     no match in chronicle.js: " + s)
    return 0


if __name__ == "__main__":
    sys.exit(main())
