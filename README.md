# The Deccan — Hyderabad & the Kingdoms of the South

A cinematic single-page history site telling the six-century story of the Deccan —
Daulatabad, Warangal, the Bahmani sultans, Vijayanagar, Bijapur, Golconda and the
Nizams of Hyderabad — adapted from **J. D. B. Gribble's _A History of the Deccan_**
(Vol. I, 1896; Vol. II, 1924).

Navigate the story two ways:

- **By place** — an interactive chart of the Deccan with 10 markers; each opens a
  full-screen story of that city (also deep-linkable, e.g. `?place=golconda`).
- **By time** — an expandable chronicle timeline from the raid of 1294 to 1948.

Plus dynasty cards, a Hyderabad section with Nizam portraits, a photo gallery with
lightbox, and a sources list.

## Run locally

No build step — it's plain HTML/CSS/JS. Either open `index.html` directly, or:

```bash
python3 -m http.server 3500
# then visit http://localhost:3500
```

## Deploy

Deploys as-is to any static host. For Vercel: `vercel` from this folder (or import
the repo in the Vercel dashboard) — no configuration needed.

## Structure

```
index.html        the whole page (hero, map SVG, timeline, kingdoms, city, gallery, sources)
css/style.css     dark ink / gold design system
js/places.js      the 10 map places + their narratives (from Gribble)
js/main.js        nav, markers, overlays, timeline, lightbox, reveal animations
images/           high-res photos (see below)
scripts/fetch_images.py   re-downloads the images (Wikipedia lead-image API)
```

## Images

Photographs are the work of Wikimedia Commons contributors, used under their free
licences, fetched as each subject's Wikipedia lead image via
`scripts/fetch_images.py` (re-runnable; it skips files that already exist).

## Text

The narrative and quotations are condensed and adapted from Gribble's two volumes,
which draw on Ferishta (Scott's translation), Elliot & Dowson, the Bombay
Gazetteers, Meadows Taylor, and the accounts of Ibn Batuta, Abdur Razzak, Nikitin,
Tavernier and other travellers.
