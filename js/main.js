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

  PLACES.forEach((p) => {
    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "marker");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", p.name);

    const mk = (tag, attrs, text) => {
      const n = document.createElementNS(SVGNS, tag);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
      if (text !== undefined) n.textContent = text;
      return n;
    };

    g.append(
      mk("circle", { class: "pulse", cx: p.x, cy: p.y, r: 11 }),
      mk("circle", { class: "ring", cx: p.x, cy: p.y, r: 11 }),
      mk("text", { class: "num", x: p.x, y: p.y + 0.5 }, p.n),
      mk("text", {
        class: "place",
        x: p.x + (p.labelDx || 0),
        y: p.y + (p.labelDy || 26)
      }, p.name.toUpperCase())
    );

    g.addEventListener("click", () => openPlace(p.id));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlace(p.id); }
    });
    markerLayer.appendChild(g);
  });

  // legend chips
  const chips = el(".map-chips");
  PLACES.forEach((p) => {
    const b = document.createElement("button");
    b.innerHTML = "<b>" + p.n + "</b>" + p.name;
    b.addEventListener("click", () => openPlace(p.id));
    chips.appendChild(b);
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

  function cityMapHTML(p) {
    const cm = p.cityMap;
    if (!cm) return "";
    const markers = cm.sites.map((s, i) =>
      '<g class="site-marker" data-site="' + i + '" tabindex="0" role="button" aria-label="' + s.name + '">' +
      '<circle class="ring" cx="' + s.x + '" cy="' + s.y + '" r="9.5"/>' +
      '<text class="num" x="' + s.x + '" y="' + (s.y + 0.5) + '">' + (i + 1) + "</text>" +
      '<text class="nm" x="' + (s.x + (s.labelDx || 0)) + '" y="' + (s.y + (s.labelDy || 23)) + '">' +
      s.name.toUpperCase() + "</text></g>"
    ).join("");

    const strip = cm.sites.map((s, i) =>
      '<figure data-site="' + i + '">' +
      (s.img ? '<img src="' + s.img + '" alt="" loading="lazy">' : '<div class="ph"></div>') +
      "<figcaption>" + s.name + "</figcaption></figure>"
    ).join("");

    return (
      '<div class="citymap-wrap">' +
      '<span class="kicker">Inside the City</span>' +
      '<p class="lede-sm">' + (cm.caption || "") + "</p>" +
      '<div class="citymap"><svg viewBox="0 0 ' + cm.w + " " + cm.h + '" aria-label="Map of ' + p.name + '">' +
      (cm.features || "") + markers + "</svg></div>" +
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
    ovBody.innerHTML = html;

    // wire up city-map interactions
    if (p.cityMap) {
      const card = el("#site-card", ovBody);
      const pick = (i) => {
        const s = p.cityMap.sites[i];
        els(".site-marker", ovBody).forEach((m) =>
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
  ERAS.forEach((era) => {
    const lab = document.createElement("div");
    lab.className = "era-label reveal";
    lab.innerHTML = '<div class="badge"><span class="kicker">' + era.label +
      '</span><div class="years">' + era.years + "</div></div>";
    tl.appendChild(lab);

    era.events.forEach((ev) => {
      const d = document.createElement("div");
      d.className = "event reveal";
      let inner = (ev.detail || []).map((p) => "<p>" + p + "</p>").join("");
      inner += boxesHTML(ev.boxes);
      if (ev.link) {
        const place = PLACES.find((p) => p.id === ev.link);
        if (place) {
          inner += '<button class="goto-place" data-place="' + ev.link + '">' +
            "Open " + place.name + " ›</button>";
        }
      }
      d.innerHTML =
        '<div class="year">' + ev.year + "</div>" +
        "<h4>" + ev.title + "</h4>" +
        '<p class="teaser">' + ev.teaser + "</p>" +
        '<div class="detail"><div class="inner">' + inner + "</div></div>";
      tl.appendChild(d);
    });
  });

  els(".event h4").forEach((h) => {
    h.addEventListener("click", () => h.closest(".event").classList.toggle("open"));
  });
  els(".goto-place").forEach((b) => {
    b.addEventListener("click", (e) => { e.stopPropagation(); openPlace(b.dataset.place); });
  });

  /* ======================================================================
     Kingdom cards
     ====================================================================== */

  els(".kingdom-card[data-place]").forEach((card) => {
    card.addEventListener("click", () => openPlace(card.dataset.place));
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
