# The Deccan — Hyderabad & the Kingdoms of the South

A cinematic single-page history site telling the six-century story of the Deccan —
Daulatabad, Warangal, the Bahmani sultans, Vijayanagara, Bijapur, Ahmadnagar,
Golconda and the Nizams of Hyderabad — built on **J. D. B. Gribble's _A History of
the Deccan_** (Vol. I, 1896; Vol. II, 1924) and expanded with modern scholarship,
epigraphy and archaeology.

The hero offers the two ways in:

- **By place** — a chart of the Deccan with 10 markers. Each opens a full-screen
  chapter on that city: an at-a-glance fact strip, the narrative, collapsible
  boxes, a quotation, and **its own city plan** with numbered sites you can click
  for a photograph and a paragraph. Deep-linkable, e.g. `?place=golconda`.
- **By time** — a chronicle of 36 events across 7 ages, from the rock-cut
  centuries to Operation Polo in 1948. Each event shows only a short hook until
  you open it; the detail inside folds further into boxes you can leave shut.

## The four kinds of box

Detail is layered so a reader can stop at any depth:

| Kind | What goes in it |
|---|---|
| **Good to know** | Context that helps but isn't the story |
| **By the numbers** | Dimensions, dates, money, casualties |
| **Legend** | The story people tell — labelled as such |
| **In depth** | Where the sources or the historians disagree |

The last two matter for this subject. A great deal of what is repeated about the
Deccan — the ploughman crowned at Gulbarga, the Ottoman prince at Bijapur, the
dancer the city of Hyderabad is named for, "not a dog or cat left in Delhi" —
comes from chronicles written centuries after the events by interested parties.
Those claims appear here as legends, with the scholarly objection alongside,
rather than as facts.

## Run locally

No build step — plain HTML/CSS/JS. Either open `index.html`, or:

```bash
python3 -m http.server 3500
```

Then visit http://localhost:3500.

## Query parameters

| Param | Effect |
|---|---|
| `?place=<id>` | Opens that city's chapter directly |
| `?at=<section>` | Jumps to a section without animation |
| `?open=1` | Expands every timeline event and box |
| `?full=1` | Capture mode — disables reveal animations and unpins the overlay, for full-page screenshots |

## Deploy

Deploys as-is to any static host. For Vercel: `vercel` from this folder, or import
the repo in the dashboard — no configuration needed.

## Structure

```
index.html          the page shell (hero, Deccan map SVG, section headings, gallery, sources)
css/style.css       dark ink / gold design system
js/places.js        the 10 cities — facts, chapters, boxes, quotes and city plans
js/chronicle.js     the timeline — 7 eras, 36 events, each with a teaser and boxes
js/main.js          renders both data files; nav, markers, overlays, lightbox, reveals
images/             photographs (see below)
scripts/fetch_images*.py   the image fetchers, in the order they were run
```

`places.js` and `chronicle.js` are pure data; `main.js` is the only file that
knows how to draw. Adding a city means adding an object, not touching the
renderer.

## Images

Photographs are the work of Wikimedia Commons contributors, used under their free
licences. They were fetched in waves, each script re-runnable and each skipping
files that already exist:

1. `fetch_images.py` — the main subjects, via the Wikipedia lead-image API.
2. `fetch_images2.py` — individual monuments and ruler portraits, same API, with
   alternate-title fallbacks and backoff (the API rate-limits hard).
3. `fetch_images3.py` — the sites named on the city plans.
4. `fetch_images4.py` / `fetch_images5.py` — Commons categories for the monuments
   whose articles have no lead image of their own. Falling back to the parent
   article does not work: every Hampi monument then gets whatever photograph sits
   first on the Hampi page. These pull from the monument's own Commons category,
   and hash every download against the existing files so no two sites can end up
   showing the same picture.

## Text

The narrative spine is condensed and adapted, with its quotations, from Gribble —
a work of 1896 whose sympathies and silences are visible throughout. Where later
research contradicts him, the site says so rather than quietly picking a side.
Beyond Gribble and his own authorities (Ferishta in Scott's translation, Elliot &
Dowson, the Bombay Gazetteers, Meadows Taylor, and the travellers), the expanded
text draws on Robert Sewell's *A Forgotten Empire*, the Vijayanagara Research
Project, Richard Eaton's *A Social History of the Deccan*, Michell & Zebrowski's
*Architecture and Art of the Deccan Sultanates*, Dalrymple's *White Mughals*, the
ASI and UNESCO records, and the Sunderlal committee report of 1948.
