#!/usr/bin/env python3
"""Make the site's content visible to search engines, and give each city a page.

The problem this solves: about 31,000 words — the whole chronicle and all ten
city chapters — lived only inside js/chronicle.js and js/places.js. The served
HTML carried about 1,500. A crawler that does not execute JavaScript saw almost
nothing, and even one that does treats injected text as lower confidence and
indexes it late.

So:

1. The chronicle is pre-rendered straight into index.html, between the markers
   below. js/main.js now only builds the timeline if it finds the container
   empty, so there is exactly one copy of every event — in the HTML, and still
   interactive.

2. Each of the ten cities gets its own real page under city/, with its own
   title, description, canonical URL and structured data. One page cannot rank
   for "Golconda Fort", "Vijayanagara empire" and "Bijapur Adil Shahi" at once;
   ten focused pages can each go after their own subject.

3. robots.txt and sitemap.xml are written, and every page gets Open Graph,
   Twitter card and JSON-LD.

Run after editing chronicle.js or places.js. The output is committed, so
deployment stays a plain static upload with no build step.
"""
import html
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SITE = "https://the-deccan.vercel.app"        # edit if the domain changes

BEGIN = "<!-- BEGIN generated timeline — scripts/build_seo.py -->"
END = "<!-- END generated timeline -->"


def load(path, var):
    """Read a data file by running it through node, so JS stays the one source."""
    script = (
        'const fs=require("fs"),vm=require("vm");const c={};vm.createContext(c);'
        'vm.runInContext(fs.readFileSync(%r,"utf8")+"\\n;globalThis.__X=%s;",c);'
        'console.log(JSON.stringify(c.__X));' % (os.path.join(ROOT, path), var)
    )
    out = subprocess.run(["node", "-e", script], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def esc(s):
    return html.escape(s, quote=True)


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()


# ---------------------------------------------------------------- boxes ----

BOX_TAGS = {"legend": "Legend", "numbers": "By the numbers",
            "deep": "In depth", "know": "Good to know"}


def box_html(b, indent="        "):
    body = ""
    for p in b.get("body", []):
        body += "<p>%s</p>" % p
    if b.get("list"):
        body += "<ul>" + "".join("<li>%s</li>" % li for li in b["list"]) + "</ul>"
    if b.get("table"):
        body += "<table>" + "".join(
            "<tr><td>%s</td><td>%s</td></tr>" % (r[0], r[1]) for r in b["table"]) + "</table>"
    kind = b.get("kind", "know")
    return (
        '%s<details class="box %s"><summary><span class="tag">%s</span>'
        "<span>%s</span></summary>"
        '<div class="box-body">%s</div></details>\n'
        % (indent, kind, BOX_TAGS.get(kind, "Note"), b["title"], body)
    )


# ------------------------------------------------------------- timeline ----

def timeline_html(eras, places):
    by_id = {p["id"]: p for p in places}
    out = [BEGIN]
    for era in eras:
        out.append(
            '    <div class="era-label reveal"><div class="badge">'
            '<span class="kicker">%s</span><div class="years">%s</div></div></div>'
            % (esc(era["label"]), esc(era["years"]))
        )
        for ev in era["events"]:
            inner = []
            if ev.get("figures"):
                figs = "".join(
                    '<figure><img src="%s" alt="%s" loading="lazy">'
                    "<figcaption><b>%s</b>%s</figcaption></figure>"
                    % (f["img"], esc(f["name"]), f["name"],
                       "<span>%s</span>" % f["note"] if f.get("note") else "")
                    for f in ev["figures"])
                inner.append('        <div class="figures">%s</div>' % figs)
            for p in ev.get("detail", []):
                inner.append("        <p>%s</p>" % p)
            for b in ev.get("boxes", []):
                inner.append(box_html(b).rstrip("\n"))
            if ev.get("reading"):
                links = "".join(
                    '<a href="%s" target="_blank" rel="noopener">%s</a>' % (r["u"], esc(r["t"]))
                    for r in ev["reading"])
                inner.append(
                    '        <div class="reading"><span class="rl">Further reading</span>%s</div>'
                    % links)
            if ev.get("link") and ev["link"] in by_id:
                inner.append(
                    '        <button class="goto-place" data-place="%s">Open %s ›</button>'
                    % (ev["link"], esc(by_id[ev["link"]]["name"])))
            out.append(
                '    <div class="event reveal">\n'
                '      <div class="year">%s</div>\n'
                "      <h3>%s</h3>\n"
                '      <p class="teaser">%s</p>\n'
                '      <div class="detail"><div class="inner">\n%s\n      </div></div>\n'
                "    </div>"
                % (esc(ev["year"]), ev["title"], ev["teaser"], "\n".join(inner))
            )
    out.append("    " + END)
    return "\n".join(out)


# ---------------------------------------------------------- city pages ----

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{site}/{img}">
<meta property="og:site_name" content="The Deccan">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{site}/{img}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css?v={v}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🕌</text></svg>">
<script type="application/ld+json">{ld}</script>
</head>
<body class="city-page">

<nav class="nav scrolled">
  <a class="brand" href="../index.html">The <span>Deccan</span></a>
  <ul>
    <li><a href="../index.html#map">The Map</a></li>
    <li><a href="../index.html#chronicle">Chronicle</a></li>
    <li><a href="../index.html#kingdoms">Kingdoms</a></li>
    <li><a href="../index.html#gallery">Gallery</a></li>
    <li><a href="../index.html#sources">Sources</a></li>
  </ul>
</nav>

<header class="city-hero" style="background-image:url('../{img}')">
  <div class="city-hero-veil"></div>
  <div class="inner">
    <p class="kicker">{n} · {alt}</p>
    <h1>{name}</h1>
    <p class="era">{era}</p>
  </div>
</header>

<main class="wrap-narrow city-body">
<nav class="crumbs" aria-label="Breadcrumb">
  <a href="../index.html">The Deccan</a> <span>›</span> <span>{name}</span>
</nav>
{body}
<p class="back-home"><a href="../index.html#map">← All ten cities on the map</a></p>
</main>

<footer class="foot">
  <p>Adapted from J. D. B. Gribble, <i>A History of the Deccan</i> (1896, 1924),
     with modern scholarship. <a href="../index.html#sources">Sources and licences</a>.</p>
</footer>

</body>
</html>
"""


def city_body(p):
    out = []
    if p.get("glance"):
        out.append('<dl class="glance">' + "".join(
            "<div><dt>%s</dt><dd>%s</dd></div>" % (g[0], g[1]) for g in p["glance"]) + "</dl>")
    if p.get("intro"):
        out.append("<p class=\"lede-in\">%s</p>" % p["intro"])
    for c in p.get("chapters", []):
        if c.get("h"):
            out.append('<h2 class="ov-h">%s</h2>' % c["h"])
        for para in c.get("p", []):
            out.append("<p>%s</p>" % para)
        for b in c.get("boxes", []):
            out.append(box_html(b, "").strip())
    for b in p.get("boxes", []):
        out.append(box_html(b, "").strip())
    if p.get("quote"):
        out.append("<blockquote>&ldquo;%s&rdquo;<cite>%s</cite></blockquote>"
                   % (p["quote"]["text"], p["quote"]["cite"]))

    cm = p.get("cityMap") or {}
    if cm.get("sites"):
        out.append('<h2 class="ov-h">Inside the city</h2>')
        out.append('<p class="lede-sm">%s</p>' % cm.get("caption", ""))
        out.append('<div class="site-list">')
        for s in cm["sites"]:
            img = ('<img src="../%s" alt="%s, %s" loading="lazy">'
                   % (s["img"], esc(s["name"]), esc(p["name"])) if s.get("img") else "")
            out.append(
                '<article class="site-entry">%s<div><h3>%s</h3>'
                '<p class="date">%s</p><p>%s</p></div></article>'
                % (img, esc(s["name"]), esc(s.get("date", "")), s.get("blurb", "")))
        out.append("</div>")
    return "\n".join(out)


def city_ld(p, url):
    sites = [
        {"@type": "LandmarksOrHistoricalBuildings", "name": s["name"],
         "description": strip_tags(s.get("blurb", ""))[:300]}
        for s in (p.get("cityMap") or {}).get("sites", [])[:20]
    ]
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "%s — %s" % (p["name"], p["alt"]),
        "description": strip_tags(p.get("intro", ""))[:300],
        "image": "%s/%s" % (SITE, p["img"]),
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "about": {
            "@type": "Place",
            "name": p["name"],
            "description": p["alt"],
            "geo": {"@type": "GeoCoordinates",
                    "latitude": p.get("lat"), "longitude": p.get("lon")},
            "containsPlace": sites,
        },
        "isPartOf": {"@type": "WebSite", "name": "The Deccan", "url": SITE},
        "author": {"@type": "Person", "name": "J. D. B. Gribble",
                   "description": "A History of the Deccan (1896, 1924), adapted"},
        "inLanguage": "en",
    }, ensure_ascii=False, indent=None)


def main():
    eras = load("js/chronicle.js", "ERAS")
    places = load("js/places.js", "PLACES")

    index_path = os.path.join(ROOT, "index.html")
    src = open(index_path).read()
    v = re.search(r"style\.css\?v=(\d+)", src).group(1)

    # 1 ── pre-render the chronicle into index.html
    block = timeline_html(eras, places)
    if BEGIN in src:
        src = re.sub(re.escape(BEGIN) + r"[\s\S]*?" + re.escape(END), block, src)
    else:
        src = src.replace('<div class="timeline"></div>',
                          '<div class="timeline">\n%s\n  </div>' % block)
    open(index_path, "w").write(src)
    words = len(strip_tags(block).split())
    print("  chronicle pre-rendered into index.html — %d words now in the HTML" % words)

    # 2 ── a page per city
    outdir = os.path.join(ROOT, "city")
    os.makedirs(outdir, exist_ok=True)
    urls = [(SITE + "/", "1.0")]
    for p in places:
        url = "%s/city/%s.html" % (SITE, p["id"])
        title = "%s — %s | History of the Deccan" % (p["name"], p["alt"])
        desc = strip_tags(p.get("intro", ""))[:154].rsplit(" ", 1)[0] + "…"
        page = PAGE.format(
            title=esc(title), desc=esc(desc), url=url, site=SITE, img=p["img"],
            v=v, n=p["n"], alt=esc(p["alt"]), name=esc(p["name"]), era=esc(p["era"]),
            ld=city_ld(p, url), body=city_body(p))
        open(os.path.join(outdir, p["id"] + ".html"), "w").write(page)
        urls.append((url, "0.8"))
        print("  city/%-12s %6d words" % (p["id"] + ".html", len(strip_tags(city_body(p)).split())))

    # 3 ── sitemap and robots
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">'.replace(
              "www.sitemap.org", "www.sitemaps.org")]
    for u, pr in urls:
        sm.append("  <url><loc>%s</loc><changefreq>yearly</changefreq>"
                  "<priority>%s</priority></url>" % (u, pr))
    sm.append("</urlset>")
    open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sm) + "\n")

    open(os.path.join(ROOT, "robots.txt"), "w").write(
        "User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n" % SITE)
    print("\n  sitemap.xml (%d urls) and robots.txt written" % len(urls))
    return 0


if __name__ == "__main__":
    sys.exit(main())
