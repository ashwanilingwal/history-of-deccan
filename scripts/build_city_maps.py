#!/usr/bin/env python3
"""Fetch a real base map for each city plan.

The plans were schematic: markers at invented positions over walls drawn by
eye. With scripts/fetch_site_coords.py giving every monument its true
coordinates, this fetches the map tiles those coordinates sit on, so the plan
becomes an actual map of the actual place.

Tiles come from OpenStreetMap and are stored under images/map/tiles/. They are
laid out by the browser as a CSS grid rather than stitched here, which avoids a
build dependency on ImageMagick and keeps each tile individually cacheable.

On the licensing: OSM data is ODbL and requires "© OpenStreetMap contributors"
on the page — that credit is in the Sources section. The tile usage policy
discourages automated bulk downloading, so this fetches once, caches on disk,
sleeps between requests, and is never run by a visitor.

Writes images/map/city-maps.json describing each city's tile grid and the
geographic bounds it covers.
"""
import json
import math
import os
import sys
import time
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(HERE, "..", "images", "map")
TILES = os.path.join(OUT_DIR, "tiles")
COORDS = os.path.join(HERE, "site_coords.json")
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal non-commercial history project)"}
TILE = 256

# how much empty margin to leave around the outermost sites
PAD = 0.30
# aim for a grid roughly this wide; zoom is chosen to suit
TARGET_COLS = 5
MAX_TILES = 42


def deg2num(lat, lon, z):
    n = 2.0 ** z
    lat_r = math.radians(lat)
    return ((lon + 180.0) / 360.0 * n,
            (1.0 - math.log(math.tan(lat_r) + 1 / math.cos(lat_r)) / math.pi) / 2.0 * n)


def num2deg(x, y, z):
    n = 2.0 ** z
    return (math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * y / n)))),
            x / n * 360.0 - 180.0)


def fetch_tile(z, x, y):
    name = "%d_%d_%d.png" % (z, x, y)
    path = os.path.join(TILES, name)
    if os.path.exists(path) and os.path.getsize(path) > 200:
        return name, False
    os.makedirs(TILES, exist_ok=True)
    url = "https://tile.openstreetmap.org/%d/%d/%d.png" % (z, x, y)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=45) as r:
                blob = r.read()
            with open(path, "wb") as f:
                f.write(blob)
            time.sleep(0.7)
            return name, True
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < 3:
                time.sleep(6 * (attempt + 1))
                continue
            print("     tile %s failed: %s" % (name, e))
            return None, False
        except Exception as e:                    # SSL/DNS/socket hiccups
            if attempt < 3:
                time.sleep(4 * (attempt + 1))
                continue
            print("     tile %s failed: %s" % (name, e))
            return None, False
    return None, False


# Several plans deliberately include somewhere far away — Ajanta is 100 km from
# Aurangabad, Bhadrachalam 200 km from Warangal. Framing to include those pushes
# the city itself down to a handful of pixels, so the frame is built from the
# core cluster and anything beyond this radius is simply left unpinned. The site
# keeps its entry in the strip; the renderer marks it as beyond the map.
CORE_KM = 9.0


def core_of(sites):
    """The cluster of sites near the middle, discarding distant outliers."""
    import statistics
    mlat = statistics.median([s["lat"] for s in sites])
    mlon = statistics.median([s["lon"] for s in sites])
    def km(s):
        dy = (s["lat"] - mlat) * 111.32
        dx = (s["lon"] - mlon) * 111.32 * math.cos(math.radians(mlat))
        return math.hypot(dx, dy)
    core = [s for s in sites if km(s) <= CORE_KM]
    return core if len(core) >= 2 else sites


def frame_for(sites):
    """Pick the zoom and tile window that contains the city core."""
    sites = core_of(sites)
    lats = [s["lat"] for s in sites]
    lons = [s["lon"] for s in sites]
    dlat = max(lats) - min(lats)
    dlon = max(lons) - min(lons)
    # never frame tighter than ~700 m, or a single-monument city fills the world
    dlat = max(dlat, 0.006)
    dlon = max(dlon, 0.006)
    n, s = max(lats) + dlat * PAD, min(lats) - dlat * PAD
    e, w = max(lons) + dlon * PAD, min(lons) - dlon * PAD

    # The panel is a wide rectangle. Left to follow the sites alone the frame
    # comes out tall and thin for some cities (Gulbarga was 2 tiles by 6), so
    # grow the short axis until the box is about 1.7 : 1 in real ground terms.
    WANT = 1.7
    mid_lat = (n + s) / 2.0
    h = n - s
    w_km = (e - w) * math.cos(math.radians(mid_lat))
    if w_km / h < WANT:
        need = h * WANT / math.cos(math.radians(mid_lat))
        grow = (need - (e - w)) / 2.0
        e, w = e + grow, w - grow
    elif w_km / h > WANT * 1.9:
        need = w_km / WANT
        grow = (need - h) / 2.0
        n, s = n + grow, s - grow

    for z in range(17, 8, -1):
        x0, y0 = deg2num(n if False else s, w, z)
        x1, y1 = deg2num(n, e, z)
        tx0, tx1 = int(math.floor(min(x0, x1))), int(math.ceil(max(x0, x1)))
        ty0, ty1 = int(math.floor(min(y0, y1))), int(math.ceil(max(y0, y1)))
        cols, rows = tx1 - tx0, ty1 - ty0
        if cols <= TARGET_COLS + 2 and cols * rows <= MAX_TILES:
            return z, tx0, ty0, cols, rows
    return 10, 0, 0, 1, 1


def main():
    if not os.path.exists(COORDS):
        print("  run scripts/fetch_site_coords.py first")
        return 1
    with open(COORDS) as f:
        data = json.load(f)

    os.makedirs(TILES, exist_ok=True)
    index, downloaded = {}, 0

    for city, sites in data.items():
        located = [s for s in sites if s.get("lat")]
        if len(located) < 2:
            print("  skip %-12s only %d located" % (city, len(located)))
            continue

        z, tx0, ty0, cols, rows = frame_for(located)
        grid, ok = [], 0
        for r in range(rows):
            row = []
            for c in range(cols):
                name, fresh = fetch_tile(z, tx0 + c, ty0 + r)
                downloaded += 1 if fresh else 0
                ok += 1 if name else 0
                row.append(name)
            grid.append(row)

        nw_lat, nw_lon = num2deg(tx0, ty0, z)
        se_lat, se_lon = num2deg(tx0 + cols, ty0 + rows, z)

        index[city] = {
            "zoom": z, "cols": cols, "rows": rows, "tileSize": TILE,
            "tiles": grid,
            "north": nw_lat, "west": nw_lon, "south": se_lat, "east": se_lon,
            "width": cols * TILE, "height": rows * TILE,
        }
        span_km = (se_lon - nw_lon) * 111.32 * math.cos(math.radians(nw_lat))
        print("  %-12s z%-3d %dx%d tiles  %4d x %4d px  ~%.1f km across  (%d/%d ok)"
              % (city, z, cols, rows, cols * TILE, rows * TILE, span_km, ok, cols * rows))

    with open(os.path.join(OUT_DIR, "city-maps.json"), "w") as f:
        json.dump(index, f, indent=2)

    total = sum(len(os.listdir(TILES)) for _ in [0])
    size = sum(os.path.getsize(os.path.join(TILES, f)) for f in os.listdir(TILES))
    print("\n  %d cities, %d tiles on disk (%d newly fetched), %.1f MB"
          % (len(index), total, downloaded, size / 1048576))
    print("  wrote images/map/city-maps.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
