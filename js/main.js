/* ==========================================================================
   THE DECCAN — renderer + interactions
   Data comes from js/places.js (PLACES) and js/chronicle.js (ERAS).
   ========================================================================== */

(function () {
  "use strict";

  const SVGNS = "http://www.w3.org/2000/svg";
  const el = (sel, root) => (root || document).querySelector(sel);
  const els = (sel, root) => [...(root || document).querySelectorAll(sel)];

  /* ======================================================================
     Shared: collapsible boxes
     ====================================================================== */

  const BOX_TAGS = {
    legend: "Legend",
    numbers: "By the numbers",
    deep: "In depth",
    know: "Good to know"
  };

  function boxHTML(b) {
    let body = "";
    if (b.body) body += b.body.map((p) => "<p>" + p + "</p>").join("");
    if (b.list) body += "<ul>" + b.list.map((li) => "<li>" + li + "</li>").join("") + "</ul>";
    if (b.table) {
      body += "<table>" + b.table
        .map((r) => "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>")
        .join("") + "</table>";
    }
    const kind = b.kind || "know";
    return (
      '<details class="box ' + kind + '">' +
      '<summary><span class="tag">' + (BOX_TAGS[kind] || "Note") + "</span>" +
      "<span>" + b.title + "</span></summary>" +
      '<div class="box-body">' + body + "</div>" +
      "</details>"
    );
  }

  const boxesHTML = (list) => (list || []).map(boxHTML).join("");

  /* ======================================================================
     Nav
     ====================================================================== */

  const nav = el(".nav");
  const navList = el(".nav ul");
  const navToggle = el(".nav-toggle");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener("click", () => navList.classList.toggle("open"));
  navList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navList.classList.remove("open");
  });

  const navLinks = els(".nav ul a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  els("section[id]").forEach((s) => spy.observe(s));

  /* ======================================================================
     Main Deccan map — markers
     ====================================================================== */

  const markerLayer = document.getElementById("marker-layer");

  /* The base map is Wikipedia's India location map, whose projection is
     documented: 37.5°N at the top, 5.0°N at the bottom, 67°E to 99°E, over
     1500 × 1614.844 px, linear in both axes. So a city's real coordinates
     convert straight into a position on it — no eyeballing. See
     scripts/build_map.py, which crops and recolours the same file. */
  const MAP = { top: 37.5, bottom: 5.0, left: 67.0, right: 99.0, w: 1500, h: 1614.844 };
  const projectX = (lon) => (lon - MAP.left) / (MAP.right - MAP.left) * MAP.w;
  const projectY = (lat) => (MAP.top - lat) / (MAP.top - MAP.bottom) * MAP.h;

  const mk = (tag, attrs, text) => {
    const n = document.createElementNS(SVGNS, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (text !== undefined) n.textContent = text;
    return n;
  };

  PLACES.forEach((p) => {
    // true position on the map, from the city's real coordinates
    const tx = projectX(p.lon);
    const ty = projectY(p.lat);

    /* Some of these cities are genuinely on top of each other: Golconda and
       Hyderabad are 11 km apart, Daulatabad and Aurangabad 16 km — five to
       seven pixels on a map spanning two thousand. Where that happens the pin
       is nudged aside and a hairline runs back to the true spot, so the map
       stays readable without quietly lying about where anything is. */
    const x = tx + (p.pinDx || 0);
    const y = ty + (p.pinDy || 0);

    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "marker");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", p.name);

    if (p.pinDx || p.pinDy) {
      g.append(
        mk("line", { class: "leader", x1: tx, y1: ty, x2: x, y2: y }),
        mk("circle", { class: "truespot", cx: tx, cy: ty, r: 1.6 })
      );
    }

    g.append(
      mk("circle", { class: "pulse", cx: x, cy: y, r: 9 }),
      mk("circle", { class: "ring", cx: x, cy: y, r: 9 }),
      mk("text", { class: "num", x: x, y: y + 0.5 }, p.n),
      mk("text", {
        class: "place",
        x: x + (p.labelDx || 0),
        y: y + (p.labelDy || 22)
      }, p.name.toUpperCase())
    );

    g.addEventListener("click", () => openPlace(p.id));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlace(p.id); }
    });
    markerLayer.appendChild(g);
  });

  // legend chips
  /* Real links to the generated city pages, so those pages are reachable by a
     crawler and by anyone without JavaScript. With JavaScript the click is
     intercepted and the overlay opens instead — same destination, no reload. */
  const chips = el(".map-chips");
  PLACES.forEach((p) => {
    const a = document.createElement("a");
    a.href = "city/" + p.id + ".html";
    a.innerHTML = "<b>" + p.n + "</b>" + p.name;
    a.addEventListener("click", (e) => { e.preventDefault(); openPlace(p.id); });
    chips.appendChild(a);
  });

  /* ======================================================================
     Place overlay
     ====================================================================== */

  const overlay = document.getElementById("place-overlay");
  const ovHero = el(".overlay-hero", overlay);
  const ovKicker = el(".overlay-hero .kicker", overlay);
  const ovTitle = el(".overlay-hero h3", overlay);
  const ovEra = el(".overlay-hero .era", overlay);
  const ovBody = el(".overlay-body", overlay);
  let current = 0;

  /* Web Mercator, matching the OpenStreetMap tiles behind each city plan.
     CITY_MAPS (js/citymaps.js, generated) gives the tile grid and the bounds it
     covers; every monument is placed on it from its own real coordinates. */
  function cityProjector(M) {
    const n = Math.pow(2, M.zoom);
    const mercX = (lon) => (lon + 180) / 360 * n;
    const mercY = (lat) => {
      const r = lat * Math.PI / 180;
      return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n;
    };
    const x0 = mercX(M.west), y0 = mercY(M.north);
    return (lat, lon) => ({
      // as a percentage of the grid, so the plan stays registered at any width
      xPct: (mercX(lon) - x0) / M.cols * 100,
      yPct: (mercY(lat) - y0) / M.rows * 100
    });
  }

  /* Real geography puts monuments on top of each other: the Charminar, the
     Mecca Masjid and the Char Kaman are within 150 m, which on a frame 28 km
     across is about four pixels. So after the plan is in the DOM, measure what
     actually overlaps and fan those pins out, each keeping a hairline back to
     where it really is. Labels that still collide are hidden until you hover
     or select the pin — the standard cartographic answer to a crowded sheet. */
  function declutter(root, tries) {
    const map = el(".citymap", root);
    if (!map) return;
    const pinLayer = el(".pins", map);
    if (!pinLayer) return;
    const W = pinLayer.clientWidth, H = pinLayer.clientHeight;
    // the layer can measure zero until the tile grid has been laid out, so
    // wait for a frame that actually has geometry rather than giving up
    if (!W || !H) {
      if ((tries || 0) < 20) setTimeout(() => declutter(root, (tries || 0) + 1), 30);
      return;
    }
    if (pinLayer.dataset.decluttered === String(W)) return;
    pinLayer.dataset.decluttered = String(W);

    // the initial placement must not animate — it is layout, not a gesture
    pinLayer.classList.add("placing");
    const pins = els(".site-pin", pinLayer);
    const R = 13;                                  // pin radius plus breathing room
    const placed = [];

    // spiral of candidate offsets, in pixels
    const ring = [];
    for (let r = 28; r <= 190; r += 22) {
      const step = r < 60 ? 30 : 18;
      for (let a = 0; a < 360; a += step) {
        ring.push([Math.cos(a * Math.PI / 180) * r, Math.sin(a * Math.PI / 180) * r]);
      }
    }

    pins.forEach((pin) => {
      const tx = parseFloat(pin.style.left) / 100 * W;
      const ty = parseFloat(pin.style.top) / 100 * H;
      let dx = 0, dy = 0;
      const clash = (ox, oy) => placed.some((q) =>
        Math.hypot(q.x - (tx + ox), q.y - (ty + oy)) < R * 2);

      if (clash(0, 0)) {
        // take the first clear spot on the spiral; if the sheet is so crowded
        // that none is clear, take whichever leaves the most room rather than
        // giving up and stacking
        let best = null;
        for (const [ox, oy] of ring) {
          const nx = tx + ox, ny = ty + oy;
          if (nx < R || nx > W - R || ny < R || ny > H - R) continue;
          if (!clash(ox, oy)) { best = [ox, oy]; break; }
          const room = Math.min.apply(null, placed.map((q) =>
            Math.hypot(q.x - nx, q.y - ny)));
          if (!best || room > best[2]) best = [ox, oy, room];
        }
        if (best) { dx = best[0]; dy = best[1]; }
      }
      // never let a pin hang off the sheet
      const fx = Math.min(Math.max(tx + dx, R), W - R);
      const fy = Math.min(Math.max(ty + dy, R), H - R);
      dx = fx - tx; dy = fy - ty;
      placed.push({ x: fx, y: fy });

      if (dx || dy) {
        pin.style.transform = "translate(-50%,-50%) translate(" + dx + "px," + dy + "px)";
        pin.classList.add("moved");
        const lead = document.createElement("span");
        lead.className = "pin-leader";
        lead.style.left = pin.style.left;
        lead.style.top = pin.style.top;
        lead.style.width = Math.hypot(dx, dy) + "px";
        lead.style.transform = "rotate(" + Math.atan2(dy, dx) + "rad)";
        pinLayer.insertBefore(lead, pinLayer.firstChild);
        const lbl = el('.pin-label[data-site="' + pin.dataset.site + '"]', pinLayer);
        if (lbl) lbl.style.transform =
          "translate(-50%,14px) translate(" + dx + "px," + dy + "px)";
      }
    });

    // hide labels that still overlap; they come back on hover or selection
    const boxes = [];
    els(".pin-label", pinLayer).forEach((lbl) => {
      const b = lbl.getBoundingClientRect();
      const hit = boxes.some((o) =>
        b.left < o.right && o.left < b.right && b.top < o.bottom && o.top < b.bottom);
      if (hit) lbl.classList.add("crowded");
      else boxes.push(b);
    });

    void pinLayer.offsetWidth;                 // settle the layout, then
    pinLayer.classList.remove("placing");      // let hover transitions back in
  }

  function cityMapHTML(p) {
    const cm = p.cityMap;
    const M = typeof CITY_MAPS !== "undefined" ? CITY_MAPS[p.id] : null;
    if (!cm) return "";

    let pins = "", tiles = "";
    const onMap = [];

    if (M) {
      const project = cityProjector(M);
      cm.sites.forEach((s, i) => {
        if (s.offMap || s.lat === undefined) return;
        const q = project(s.lat, s.lon);
        // a site can have real coordinates and still sit outside the frame —
        // Ajanta is a hundred kilometres from Aurangabad
        if (q.xPct < 0 || q.xPct > 100 || q.yPct < 0 || q.yPct > 100) return;
        onMap.push(i);
        const pos = 'left:' + q.xPct.toFixed(3) + '%;top:' + q.yPct.toFixed(3) + '%';
        pins +=
          '<button class="site-pin" data-site="' + i + '" style="' + pos + '" ' +
          'aria-label="' + s.name + '"><span>' + (i + 1) + "</span></button>" +
          '<span class="pin-label' + (s.labelDy && s.labelDy < 0 ? " above" : "") +
          '" data-site="' + i + '" style="' + pos + '">' + s.name + "</span>";
      });

      M.tiles.forEach((row) => row.forEach((t) => {
        tiles += t
          ? '<img src="images/map/tiles/' + t + '" alt="" loading="lazy">'
          : '<span class="tile-gap"></span>';
      }));
    }

    const strip = cm.sites.map((s, i) =>
      '<figure data-site="' + i + '"' +
      (onMap.indexOf(i) === -1 ? ' class="beyond"' : "") + ">" +
      (s.img ? '<img src="' + s.img + '" alt="" loading="lazy">' : '<div class="ph"></div>') +
      "<figcaption>" + s.name + "</figcaption></figure>"
    ).join("");

    const beyond = cm.sites.length - onMap.length;

    return (
      '<div class="citymap-wrap">' +
      '<span class="kicker">Inside the City</span>' +
      '<p class="lede-sm">' + (cm.caption || "") + "</p>" +
      (M
        ? '<div class="citymap"><div class="tiles" style="aspect-ratio:' +
          M.width + "/" + M.height + ";grid-template-columns:repeat(" + M.cols +
          ',1fr)">' + tiles + "</div>" +
          '<div class="pins">' + pins + "</div></div>" +
          '<p class="map-credit">Map data © <a href="https://www.openstreetmap.org/copyright" ' +
          'target="_blank" rel="noopener">OpenStreetMap</a> contributors' +
          (beyond ? " · " + beyond + " site" + (beyond > 1 ? "s" : "") +
                    " below lie beyond this frame" : "") + "</p>"
        : "") +
      '<div class="site-card" id="site-card">' +
      '<div class="ph"></div><div><p class="hint-pick">Choose a numbered site on the plan — or a thumbnail below — to read about it.</p></div>' +
      "</div>" +
      '<div class="site-strip">' + strip + "</div>" +
      "</div>"
    );
  }

  function renderPlace() {
    const p = PLACES[current];
    ovHero.style.backgroundImage = "url('" + p.img + "')";
    ovKicker.textContent = p.n + " · " + p.alt;
    ovTitle.textContent = p.name;
    ovEra.textContent = p.era;

    let html = "";

    if (p.glance) {
      html += '<dl class="glance">' + p.glance
        .map((g) => "<div><dt>" + g[0] + "</dt><dd>" + g[1] + "</dd></div>")
        .join("") + "</dl>";
    }
    if (p.intro) html += "<p>" + p.intro + "</p>";

    (p.chapters || []).forEach((c) => {
      if (c.h) html += "<h4 class='ov-h'>" + c.h + "</h4>";
      html += (c.p || []).map((x) => "<p>" + x + "</p>").join("");
      if (c.boxes) html += boxesHTML(c.boxes);
    });

    html += boxesHTML(p.boxes);

    if (p.quote) {
      html += "<blockquote>“" + p.quote.text + "”<cite>" + p.quote.cite + "</cite></blockquote>";
    }

    html += cityMapHTML(p);
    html += '<p class="full-chapter"><a href="city/' + p.id + '.html">' +
            "Open the full " + p.name + " chapter as its own page ›</a></p>";
    ovBody.innerHTML = html;

    // wire up city-map interactions
    if (p.cityMap) {
      const card = el("#site-card", ovBody);
      const pick = (i) => {
        const s = p.cityMap.sites[i];
        els("[data-site]", ovBody).forEach((m) =>
          m.classList.toggle("active", m.dataset.site === String(i)));
        card.innerHTML =
          (s.img ? '<img src="' + s.img + '" alt="">' : '<div class="ph"></div>') +
          "<div><h5>" + s.name + "</h5>" +
          '<p class="date">' + s.date + "</p><p>" + s.blurb + "</p></div>";
      };
      els("[data-site]", ovBody).forEach((n) => {
        n.addEventListener("click", () => pick(+n.dataset.site));
        n.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(+n.dataset.site); }
        });
      });
      /* Wait for the overlay to be visible — while it is display:none the
         container measures zero and nothing can be de-collided. rAF is the
         right trigger, but it is throttled to nothing in a background tab,
         so a timer backs it up; the dataset guard means only one takes
         effect. */
      requestAnimationFrame(() => declutter(ovBody));
      setTimeout(() => declutter(ovBody), 60);
    }

    overlay.scrollTop = 0;
  }

  function openPlace(id) {
    const i = PLACES.findIndex((p) => p.id === id);
    if (i < 0) return;
    current = i;
    renderPlace();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  el(".overlay-close", overlay).addEventListener("click", closeOverlay);
  el(".ov-prev", overlay).addEventListener("click", () => {
    current = (current - 1 + PLACES.length) % PLACES.length; renderPlace();
  });
  el(".ov-next", overlay).addEventListener("click", () => {
    current = (current + 1) % PLACES.length; renderPlace();
  });

  /* ======================================================================
     Chronicle timeline — rendered from ERAS
     ====================================================================== */

  const tl = el(".timeline");
  const eraAnchors = [];        // the era headings, for the scrubber below

  /* The chronicle is pre-rendered into index.html by scripts/build_seo.py, so
     that ~12,500 words of it exist in the HTML rather than only after this
     script runs. When it is already there we adopt it instead of building a
     second copy; the generator and the code below emit the same markup. */
  const prerendered = tl.querySelector(".event");
  if (prerendered) {
    els(".era-label", tl).forEach((node, i) => {
      if (ERAS[i]) eraAnchors.push({ era: ERAS[i], node: node });
    });
  }

  if (!prerendered) ERAS.forEach((era) => {
    const lab = document.createElement("div");
    lab.className = "era-label reveal";
    lab.innerHTML = '<div class="badge"><span class="kicker">' + era.label +
      '</span><div class="years">' + era.years + "</div></div>";
    tl.appendChild(lab);
    eraAnchors.push({ era: era, node: lab });

    era.events.forEach((ev) => {
      const d = document.createElement("div");
      d.className = "event reveal";
      let inner = "";
      /* A portrait, where one survives. The chronicle is full of vividly drawn
         people and showed you none of their faces; `figures` puts them beside
         the text they belong to. */
      if (ev.figures && ev.figures.length) {
        inner += '<div class="figures">' + ev.figures.map((f) =>
          '<figure><img src="' + f.img + '" alt="' + f.name + '" loading="lazy">' +
          "<figcaption><b>" + f.name + "</b>" +
          (f.note ? "<span>" + f.note + "</span>" : "") +
          "</figcaption></figure>").join("") + "</div>";
      }
      inner += (ev.detail || []).map((p) => "<p>" + p + "</p>").join("");
      inner += boxesHTML(ev.boxes);
      /* Where to go next. Every one of these was checked against the live
         Wikipedia API before it was written — see scripts/add_reading_links.py
         — so none of them is a guessed URL. */
      if (ev.reading && ev.reading.length) {
        inner += '<div class="reading"><span class="rl">Further reading</span>' +
          ev.reading.map((r) =>
            '<a href="' + r.u + '" target="_blank" rel="noopener">' + r.t + "</a>"
          ).join("") + "</div>";
      }
      if (ev.link) {
        const place = PLACES.find((p) => p.id === ev.link);
        if (place) {
          inner += '<button class="goto-place" data-place="' + ev.link + '">' +
            "Open " + place.name + " ›</button>";
        }
      }
      d.innerHTML =
        '<div class="year">' + ev.year + "</div>" +
        "<h3>" + ev.title + "</h3>" +
        '<p class="teaser">' + ev.teaser + "</p>" +
        '<div class="detail"><div class="inner">' + inner + "</div></div>";
      tl.appendChild(d);
    });
  });

  els(".event h3").forEach((h) => {
    h.addEventListener("click", () => h.closest(".event").classList.toggle("open"));
  });

  /* ======================================================================
     Era scrubber — a bar along the bottom while the chronicle is on screen,
     showing the seven ages, which one you are reading, and how far through
     the whole arc you have come. Clicking an age jumps to it.
     ====================================================================== */

  (function eraScrubber() {
    const chronicle = document.getElementById("chronicle");
    if (!chronicle || !eraAnchors.length) return;

    const bar = document.createElement("div");
    bar.className = "era-bar";
    bar.setAttribute("aria-label", "The seven ages of this history");
    bar.innerHTML =
      '<div class="era-bar-inner">' +
      '<div class="era-track"><span class="era-progress"></span></div>' +
      '<div class="era-steps">' +
      eraAnchors.map((a, i) =>
        '<button class="era-step" data-era="' + i + '">' +
        '<span class="dot"></span>' +
        '<span class="nm">' + a.era.label.replace(/^The /, "") + "</span>" +
        '<span class="yr">' + a.era.years + "</span></button>"
      ).join("") +
      "</div></div>";
    document.body.appendChild(bar);

    const steps = els(".era-step", bar);
    const progress = el(".era-progress", bar);

    // .timeline is a positioned element, so offsetTop on an era label is
    // relative to it, not to the page — measure in document space instead
    const docTop = (node) => node.getBoundingClientRect().top + window.scrollY;

    steps.forEach((b) => b.addEventListener("click", () => {
      const node = eraAnchors[+b.dataset.era].node;
      window.scrollTo({ top: docTop(node) - 90, behavior: "smooth" });
    }));

    let ticking = false;
    function update() {
      ticking = false;
      const top = chronicle.getBoundingClientRect().top + window.scrollY;
      const height = chronicle.offsetHeight;
      const y = window.scrollY + window.innerHeight * 0.5;

      // only while the chronicle is the thing on screen
      const inside = window.scrollY + window.innerHeight > top + 120 &&
                     window.scrollY < top + height - 120;
      bar.classList.toggle("show", inside);
      if (!inside) return;

      const pct = Math.min(1, Math.max(0, (y - top) / height));
      progress.style.width = (pct * 100).toFixed(2) + "%";

      let active = 0;
      eraAnchors.forEach((a, i) => { if (docTop(a.node) <= y) active = i; });
      steps.forEach((b, i) => {
        b.classList.toggle("active", i === active);
        b.classList.toggle("past", i < active);
      });
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();
  els(".goto-place").forEach((b) => {
    b.addEventListener("click", (e) => { e.stopPropagation(); openPlace(b.dataset.place); });
  });

  /* ======================================================================
     Kingdom cards
     ====================================================================== */

  els(".kingdom-card[data-place]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();                 // it is a real link; open in place
      openPlace(card.dataset.place);
    });
  });

  /* ======================================================================
     Lightbox
     ====================================================================== */

  const lightbox = document.getElementById("lightbox");
  const lbImg = el("img", lightbox);
  const lbCap = el(".cap", lightbox);

  els(".gallery-grid figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      lbImg.src = el("img", fig).src;
      lbCap.textContent = el("figcaption", fig).textContent;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = overlay.classList.contains("open") ? "hidden" : "";
  });

  /* ======================================================================
     Reveal on scroll
     ====================================================================== */

  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); }
    });
  }, { threshold: 0.1 });
  els(".reveal").forEach((n) => revealer.observe(n));

  /* ======================================================================
     Query params — deep links & capture modes
     ====================================================================== */

  const qs = new URLSearchParams(location.search);
  if (qs.get("full")) {
    document.documentElement.classList.add("capture");
    els(".reveal").forEach((n) => n.classList.add("in"));
  }
  const at = qs.get("at");
  if (at && document.getElementById(at)) {
    els(".reveal").forEach((n) => n.classList.add("in"));
    window.scrollTo({ top: document.getElementById(at).offsetTop - 60, behavior: "instant" });
  }
  const deep = qs.get("place");
  if (deep) openPlace(deep);
  if (qs.get("open")) {
    els(".event").forEach((n) => n.classList.add("open"));
    els(".box").forEach((n) => n.setAttribute("open", ""));
  }

  /* ======================================================================
     Escape closes
     ====================================================================== */

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lightbox.classList.contains("open")) {
      lightbox.classList.remove("open");
      document.body.style.overflow = overlay.classList.contains("open") ? "hidden" : "";
    } else {
      closeOverlay();
    }
  });
})();
