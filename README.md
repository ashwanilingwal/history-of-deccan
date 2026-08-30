# The Deccan — Hyderabad & the Kingdoms of the South

A cinematic single-page history site telling the six-century story of the Deccan —
Daulatabad, Warangal, the Bahmani sultans, Vijayanagara, Bijapur, Ahmadnagar,
Golconda and the Nizams of Hyderabad — built on **J. D. B. Gribble's _A History of
the Deccan_** (Vol. I, 1896; Vol. II, 1924) and expanded with modern scholarship,
epigraphy and archaeology.

The hero offers the two ways in:

- **By place** — a real map of peninsular India with 10 markers. Each opens a full-screen
  chapter on that city: an at-a-glance fact strip, the narrative, collapsible
  boxes, a quotation, and **its own city plan** with numbered sites you can click
  for a photograph and a paragraph. Deep-linkable, e.g. `?place=golconda`.
- **By time** — a chronicle of 36 events across 7 ages, from the rock-cut
  centuries to Operation Polo in 1948. Each event shows only a short hook until
  you open it; the detail inside folds further into boxes you can leave shut,
  and twenty of them carry portraits of the people they are about. A scrubber
  along the bottom shows the seven ages, which one you are reading and how far
  through the whole arc you have come; clicking an age jumps to it.

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

Plain static files, so this works on any static host. There is no build step and
nothing to configure at the host end.

### Vercel

```bash
npx vercel --prod
```

Or import the repo in the Vercel dashboard — framework preset **Other**, no build
command, output directory `.`.

`vercel.json` sets the caching policy, which is the part that matters here:

| Path | Cache-Control | Why |
|---|---|---|
| `/images/*` | 1 year, `immutable` | 81 MB that never changes. A returning reader re-downloads none of it. |
| `/js/*`, `/css/*` | 1 year, `immutable` | Safe **only** because `index.html` requests them with a `?v=` query string |
| `/`, `/index.html` | `must-revalidate` | It carries the `?v=` that invalidates everything else |

**The one rule to remember:** if you edit anything in `js/` or `css/`, bump the
`?v=` number on all four references in `index.html`. Otherwise returning visitors
keep the old file for a year. (That query string is also why local edits now show
up immediately instead of being masked by the browser cache.)

`.vercelignore` keeps `scripts/` out of the deployment — those fetch and process
images at build time and are never requested by the site.

### A note on size

The deployment is about 83 MB, essentially all photographs. That works, but it
makes each deploy slow and it is the bulk of your bandwidth. The images are
stored at up to 1920px wide and displayed at a fraction of that; resizing to
1400px at quality 72 measures at **61% smaller — roughly 81 MB down to 32 MB** —
with no visible difference at the sizes the site actually uses.

## Structure

```
index.html          the page shell (hero, map overlay, section headings, gallery, sources)
css/style.css       dark ink / gold design system
js/places.js        the 10 cities — facts, chapters, boxes, quotes and city plans
js/chronicle.js     the timeline — 7 eras, 36 events, each with a teaser and boxes
js/main.js          renders both data files; nav, markers, overlays, lightbox, reveals
images/             photographs (see below)
scripts/fetch_images*.py   the image fetchers, in the order they were run
scripts/build_map.py       recolours and crops the base map
images/map/deccan.svg      the base map itself
```

`places.js` and `chronicle.js` are pure data; `main.js` is the only file that
knows how to draw. Adding a city means adding an object, not touching the
renderer.

## The maps

Two, and every marker on both is placed from real coordinates rather than by eye.

### The chart of the Deccan

The base map is Wikipedia's **India location map** (CC BY-SA 3.0), whose projection
is documented in `Module:Location map/data/India`:

```
top = 37.5N   bottom = 5.0N   left = 67.0E   right = 99.0E   over 1500 x 1614.844 px
```

Because that is a plain equirectangular frame, a city's real latitude and longitude
convert straight into a position on it, and `js/main.js` places every marker that
way — no coordinates tuned by eye. `scripts/build_map.py` fetches the same file,
repaints it layer by layer into the site's palette, trims the coordinate precision,
and crops it to peninsular India.

Two notes on that crop. It is the region the site is actually about; and it keeps
the map clear of the northern borders, whose depiction is a legal matter in India.
If you want the whole country instead, change `VIEW_N/S/W/E` in the script and
re-run it — the marker projection needs no changes, only the overlay's `viewBox`
in `index.html` has to match the new one the script prints.

Some of these cities are genuinely on top of each other — Golconda and Hyderabad
are 11 km apart, Daulatabad and Aurangabad 16 km, which is five to seven pixels
here. Those markers carry a `pinDx`/`pinDy` offset and draw a hairline back to
their true position, so the map stays readable without misplacing anything
silently.

### The city plans

Each city's plan is a grid of **OpenStreetMap** tiles, inverted and tinted to the
site's palette, with its monuments pinned onto it. Two scripts build them:

1. `fetch_site_coords.py` asks Wikipedia for each monument's coordinates in
   batches of 40, and falls back to OpenStreetMap's Nominatim search for the
   ones whose articles carry no coordinate template. 105 of the 112 sites are
   located this way; the rest are listed on the plan but not pinned, because
   things like "the durbar halls" or "Chand Bibi's breach" have no single point.
2. `build_city_maps.py` frames each city on its core cluster of sites — several
   plans deliberately include somewhere far off, and framing to fit Ajanta
   would squash Aurangabad into a few pixels — then fetches the tiles that frame
   needs. Tiles are laid out by the browser as a CSS grid rather than stitched,
   which avoids a build dependency and keeps each one cacheable.

Monuments cluster far more tightly than cities do: the Charminar, the Mecca
Masjid and the Char Kaman are within 150 m of each other. `declutter()` in
`main.js` measures what actually overlaps once the plan is in the DOM and fans
those pins out along a spiral, each keeping a hairline back to its true spot;
labels that still collide are held back until you hover or select the pin.

Tiles are fetched once and committed. The OSM tile usage policy discourages
automated downloading, so the script caches on disk, sleeps between requests and
is never run by a visitor — and the ODbL credit is on the page.

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
