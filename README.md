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
  and twenty of them carry portraits of the people they are about. Each ends
  with a row of further-reading links. A scrubber
  along the bottom shows the seven ages, which one you are reading and how far
  through the whole arc you have come; clicking an age jumps to it.

## Further reading

Every event closes with links to the articles worth reading next — 122 of them.
None is a guessed URL: `scripts/add_reading_links.py` checks each title against
the live Wikipedia API in batches of 40, follows redirects to the article's real
name, and drops anything that does not resolve rather than shipping a dead link.
Re-run it after editing its `READING` table and it rewrites every event's list.

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

## Settings

`site.config.json` holds everything that depends on where the site lives. Edit
it, re-run `scripts/build_seo.py`, redeploy — the values are written into
`index.html` and all ten pages under `city/`.

```json
{
  "siteUrl": "https://the-deccan.vercel.app",
  "gscToken": "",
  "gaId": "G-82EEHRXEMX",
  "gaAnonymiseIp": true
}
```

| Key | What it does |
|---|---|
| `siteUrl` | The address the site is served on. Every canonical tag, Open Graph URL and sitemap entry is built from it. **Getting this wrong is the one setting that can actively hurt you** — a canonical pointing elsewhere tells Google to index that address instead of yours. |
| `gscToken` | Search Console HTML-tag verification. Paste the bare token, the whole `<meta>` tag, or the `content="…"` fragment; all three are accepted. Only needed if you verify by HTML tag — see below. |
| `gaId` | Google Analytics 4 measurement ID. **Empty means no analytics code is emitted at all** — no script, no cookies, nothing to consent to. |
| `gaAnonymiseIp` | Truncate visitor IPs. On by default. |

Any key can be overridden for a single run by the environment variable of the
same name in capitals:

```bash
SITE_URL=https://staging.example.com python3 scripts/build_seo.py
```

The generator is idempotent — re-running never stacks duplicate snippets, and
clearing a value removes what it previously wrote.

### Are these safe to commit?

Yes. Both are **public by design**: they are served in the HTML of every page,
so anyone can read them with View Source. Keeping them out of git would hide
them from you and from nobody else.

- **`gaId`** identifies which property to send hits to. It grants no access to
  your analytics account. The only real abuse is someone sending junk traffic to
  pollute your reports, which is a nuisance rather than a breach, and cannot be
  prevented by hiding an ID that has to ship in client-side code anyway.
- **`gscToken`** only proves you control this site. Knowing it does not let
  anyone claim your property — they would have to serve it from your domain.

What must **never** be committed, and is covered by `.gitignore`:

- a GA4 **Measurement Protocol API secret** — that one *is* a credential
- `.env` files, Vercel tokens, deploy hooks
- service-account JSON for the Analytics or Search Console APIs

If any of those ever land in a commit, rotate the credential — deleting the file
in a later commit does not remove it from history.

## Search engines

About 31,000 words — the whole chronicle and every city chapter — used to live
only inside `js/chronicle.js` and `js/places.js`. The served HTML carried about
1,500. A crawler that does not run JavaScript saw almost nothing of it.

`scripts/build_seo.py` fixes that from the same data files:

- **The chronicle is pre-rendered into `index.html`** between two markers.
  `main.js` builds the timeline only when it finds the container empty, so there
  is exactly one copy of every event — in the HTML, and still interactive.
- **Each city gets its own page** under `city/`, with its own title,
  description, canonical URL, Open Graph tags and `Article` + `Place` JSON-LD
  carrying real coordinates. One page cannot rank for "Golconda Fort",
  "Vijayanagara empire" and "Bijapur Adil Shahi" at once; ten focused pages can
  each go after their own subject.
- **The map legend and dynasty cards are pre-rendered as real `<a href>` links**,
  so all ten city pages are reachable by a crawler. This mattered: they were
  built by JavaScript at first, which left four of them — Daulatabad, Warangal,
  Bidar, Aurangabad — with no HTML link anywhere, findable only through the
  sitemap. JavaScript intercepts the click so the overlay still opens.
- **`robots.txt` and `sitemap.xml`** are written on every run.

Crawlable text went from **1,507 words to about 35,500**.

### Google Search Console

1. Deploy first — Search Console verifies a live URL.
2. Add a property at [search.google.com/search-console](https://search.google.com/search-console).
   Choose **URL prefix**, not Domain: Domain verification needs a DNS TXT record
   and you do not control DNS for `vercel.app`.
3. Verify. Any of these work:
   - **Google Analytics** — simplest here, since the site already has GA under
     the same account. Leaves no trace in the page.
   - **HTML tag** — put the token in `gscToken`, re-run the generator, redeploy,
     *then* click Verify. The tag has to be live before Google looks.
   - **HTML file** — drop `google*.html` in the project root and redeploy.
4. **Sitemaps** → enter `sitemap.xml` → Submit. It should find 11 URLs.
5. **URL Inspection** → paste the homepage → Request Indexing. Rate-limited, so
   use it on the homepage and your strongest city pages, not all eleven.

Then watch **Pages** for URLs stuck in "Discovered – currently not indexed".
That is normal for a new site for a week or two; if it persists, the page needs
links pointing at it from elsewhere.

### Google Analytics

Set `gaId` and re-run the generator. The GA4 snippet goes onto all eleven pages
— analytics on the homepage alone would miss most traffic, since the city pages
are what search lands people on. Check **Reports → Realtime** after deploying;
if you see nothing, it is usually your own ad blocker, so try a private window.

A lighter alternative worth knowing about: **Vercel Analytics** is cookie-less,
needs no consent banner, and reports Core Web Vitals — which feed back into
search ranking. It gives page views rather than GA's funnels and audiences.

### A note on consent

GA4 sets cookies. Meaningful EU or UK traffic legally needs a consent banner,
and India's DPDP Act has its own notice requirements. `gaAnonymiseIp` helps but
is not a substitute where consent is actually required.

## Run locally

No build step for the site itself — plain HTML, CSS and JS. Either open
`index.html`, or:

```bash
python3 -m http.server 3500
```

Then visit http://localhost:3500.

### Two things to remember when editing

1. **Editing `chronicle.js` or `places.js` no longer updates the site on its
   own.** The chronicle is pre-rendered into `index.html`, so re-run
   `python3 scripts/build_seo.py` or the HTML keeps the old text.
2. **Editing anything in `js/` or `css/` means bumping the `?v=` number** on the
   four references in `index.html`. Those files are cached for a year as
   `immutable`, so without a bump returning visitors keep the old copy. It is
   also why local edits show up immediately instead of being masked by the
   browser cache.

## Query parameters

| Param | Effect |
|---|---|
| `?place=<id>` | Opens that city's chapter directly |
| `?at=<section>` | Jumps to a section without animation |
| `?open=1` | Expands every timeline event and box |
| `?full=1` | Capture mode — disables reveal animations and unpins the overlay, for full-page screenshots |

## Deploy

Plain static files. There is no build step at the host end and nothing to
configure there.

```bash
npx vercel --prod
```

Or import the repo in the Vercel dashboard — framework preset **Other**, no
build command, output directory `.`.

`vercel.json` sets the caching policy, which is the part that matters with
81 MB of photographs:

| Path | Cache-Control | Why |
|---|---|---|
| `/images/*` | 1 year, `immutable` | Never changes. A returning reader re-downloads none of it. |
| `/js/*`, `/css/*` | 1 year, `immutable` | Safe **only** because `index.html` requests them with `?v=` |
| `/`, `/index.html`, `/city/*` | `must-revalidate` | They carry the `?v=` that invalidates everything else |
| `/sitemap.xml` | 1 hour | |

`cleanUrls` is **off** on purpose: with it on, every `.html` link, canonical tag
and sitemap entry would resolve through a 308 redirect.

### Checking a deployment

```bash
curl -sI https://the-deccan.vercel.app/css/style.css | grep -i cache-control
curl -s  https://the-deccan.vercel.app/ | grep -c 'class="event reveal"'   # expect 36
curl -s  https://the-deccan.vercel.app/ | grep -o 'href="city/[a-z]*\.html"' | sort -u | wc -l   # expect 10
```

### Size

The deployment is about 93 MB, almost all photographs. That works, but it makes
each deploy slow, it is the bulk of your bandwidth, and Core Web Vitals feed
into search ranking. The images are stored at up to 1920px and displayed at a
fraction of that; resizing to 1400px at quality 72 measures **61% smaller —
about 81 MB down to 32 MB** — with no visible difference at the sizes the site
actually uses.

## Structure

```
index.html            the page shell + the pre-rendered chronicle
city/*.html           ten generated city pages, one per place
site.config.json      site URL, analytics ID, verification token
sitemap.xml           generated
robots.txt            generated
vercel.json           caching and security headers
css/style.css         dark ink / gold design system
js/places.js          the 10 cities — facts, chapters, boxes, quotes, city plans
js/chronicle.js       the timeline — 7 eras, 36 events
js/citymaps.js        generated: the tile grid behind each city plan
js/main.js            renders the data files; nav, maps, overlays, era scrubber
images/               photographs
images/map/           the base maps and their tiles
scripts/              the generators — see below
```

### The scripts

| Script | What it does | When to run |
|---|---|---|
| `build_seo.py` | Pre-renders the chronicle, generates the city pages, sitemap, robots, analytics and verification tags | After editing `chronicle.js` or `places.js`, or any setting |
| `build_map.py` | Recolours and crops the Deccan base map | Only to change the map's framing or palette |
| `fetch_site_coords.py` | Finds real coordinates for every monument | After adding a site to a city plan |
| `build_city_maps.py` | Fetches the OpenStreetMap tiles each plan needs | After coordinates change |
| `add_reading_links.py` | Verifies and attaches further-reading links | After editing its `READING` table |
| `fetch_images*.py` | The image fetchers, in the order they were run | To add images |

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
