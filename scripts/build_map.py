#!/usr/bin/env python3
"""Build the base map for the site out of Wikipedia's georeferenced India
location map.

The hand-drawn SVG this replaces had coastlines and rivers sketched by eye and
city markers positioned by trial and error. This uses the real thing:

  File:India location map.svg — CC BY-SA 3.0, 1500 x 1614.844 px

whose projection is documented in Module:Location map/data/India as

  top = 37.5N   bottom = 5.0N   left = 67.0E   right = 99.0E

so a latitude/longitude converts straight to a pixel position, and every city
lands where it actually is. Equirectangular, i.e. plain linear in both axes.

The file arrives as a light-grey political map with black boundaries. It is
recoloured here, layer by layer, into the site's ink-and-gold palette, and
cropped to peninsular India — which is the region the site is about, and which
also keeps the map clear of the northern borders whose depiction is a legal
matter in India.

Output: images/map/deccan.svg
"""
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(HERE, "..", "images", "map")
OUT = os.path.join(OUT_DIR, "deccan.svg")
SRC = "https://upload.wikimedia.org/wikipedia/commons/d/dc/India_location_map.svg"
UA = {"User-Agent": "DeccanHistorySite/1.0 (personal history project)"}

SVG = "http://www.w3.org/2000/svg"
INK = "http://www.inkscape.org/namespaces/inkscape"

# the source map's georeferencing, from Module:Location map/data/India
TOP, BOTTOM, LEFT, RIGHT = 37.5, 5.0, 67.0, 99.0
W, H = 1500.0, 1614.844

# what we crop to: peninsular India, in degrees
VIEW_N, VIEW_S, VIEW_W, VIEW_E = 24.0, 8.0, 68.0, 88.0

# per-layer styling, in the site's palette
STYLE = {
    "ocean":             "fill:#080b0e;stroke:none",
    "otherCountries":    "fill:#131110;stroke:#241d15;stroke-width:0.8",
    "disputedCountries": "fill:#131110;stroke:#241d15;stroke-width:0.8",
    "country":           "fill:#221b14;stroke:none",
    "lake":              "fill:#0b1014;stroke:none",
    "coastline":         "fill:none;stroke:#c9a66b;stroke-opacity:0.45;stroke-width:1.6",
    "intBoundaries":     "fill:none;stroke:#c9a66b;stroke-opacity:0.28;stroke-width:1.2",
    "stateBoundaries":   "fill:none;stroke:#c9a66b;stroke-opacity:0.30;stroke-width:1.0",
    "river":             "fill:none;stroke:#6d8a94;stroke-opacity:0.30;stroke-width:1.2",
}


def lon_to_x(lon):
    return (lon - LEFT) / (RIGHT - LEFT) * W


def lat_to_y(lat):
    return (TOP - lat) / (TOP - BOTTOM) * H


def fetch_source(path):
    if os.path.exists(path):
        return
    print("  downloading the source map…", flush=True)
    req = urllib.request.Request(SRC, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
        f.write(r.read())


def trim_precision(root, dp=1):
    """Round path coordinates.

    Nearly the whole file is path data carried at six decimal places. At a
    1500px-wide projection one decimal is already finer than a pixel, so the
    extra digits are invisible and cost about half the file.
    """
    def shorten(match):
        n = round(float(match.group()), dp)
        s = ("%.*f" % (dp, n)).rstrip("0").rstrip(".")
        return s if s not in ("", "-") else "0"

    saved = 0
    for node in root.iter():
        d = node.get("d")
        if not d:
            continue
        short = re.sub(r"-?\d+\.\d+", shorten, d)
        saved += len(d) - len(short)
        node.set("d", short)
    return saved


def strip_editor_cruft(root):
    """Drop the Inkscape/sodipodi bookkeeping and the RDF metadata block."""
    for node in root.iter():
        for key in list(node.attrib):
            if key.startswith("{%s}" % INK) or "sodipodi" in key:
                if not key.endswith("}label"):     # labels are how we find layers
                    del node.attrib[key]
    for parent in root.iter():
        for child in list(parent):
            if child.tag in ("{%s}metadata" % SVG, "{http://www.inkscape.org/namespaces/inkscape}namedview"):
                parent.remove(child)
            elif child.tag.endswith("namedview"):
                parent.remove(child)


def restyle(root):
    """Walk the named layers and repaint each one."""
    touched = set()
    for g in root.iter("{%s}g" % SVG):
        label = g.get("{%s}label" % INK)
        if label not in STYLE:
            continue
        touched.add(label)
        g.set("style", STYLE[label] + ";display:inline")
        # the per-path styles in the source would otherwise win over the group
        for node in g.iter():
            if node is not g and "style" in node.attrib:
                del node.attrib["style"]
            for attr in ("fill", "stroke", "fill-opacity", "stroke-opacity"):
                node.attrib.pop(attr, None)
    return touched


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    src_path = os.path.join(OUT_DIR, "_source_india.svg")
    fetch_source(src_path)

    ET.register_namespace("", SVG)
    tree = ET.parse(src_path)
    root = tree.getroot()

    strip_editor_cruft(root)
    saved = trim_precision(root)
    touched = restyle(root)
    missing = set(STYLE) - touched
    if missing:
        print("  WARNING: layers not found in the source: " + ", ".join(sorted(missing)))

    x0, x1 = lon_to_x(VIEW_W), lon_to_x(VIEW_E)
    y0, y1 = lat_to_y(VIEW_N), lat_to_y(VIEW_S)
    view = "%.2f %.2f %.2f %.2f" % (x0, y0, x1 - x0, y1 - y0)

    root.set("viewBox", view)
    root.attrib.pop("width", None)
    root.attrib.pop("height", None)
    root.set("preserveAspectRatio", "xMidYMid meet")

    tree.write(OUT, encoding="unicode", xml_declaration=True)

    size_kb = os.path.getsize(OUT) // 1024
    print("  wrote %s" % os.path.relpath(OUT, os.path.join(HERE, "..")))
    print("  viewBox   : %s" % view)
    print("  covers    : %g-%gN, %g-%gE" % (VIEW_S, VIEW_N, VIEW_W, VIEW_E))
    print("  aspect    : %.3f" % ((x1 - x0) / (y1 - y0)))
    print("  size      : %d KB  (%d KB of coordinate precision dropped)" % (size_kb, saved // 1024))
    print()
    print("  to place a marker, project its real coordinates:")
    print("    x = (lon - %g) / %g * %g" % (LEFT, RIGHT - LEFT, W))
    print("    y = (%g - lat) / %g * %g" % (TOP, TOP - BOTTOM, H))


if __name__ == "__main__":
    sys.exit(main())
