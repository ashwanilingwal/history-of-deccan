/* ==========================================================================
   THE DECCAN — interactions
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- nav ---------- */
  const nav = document.querySelector(".nav");
  const navList = document.querySelector(".nav ul");
  const navToggle = document.querySelector(".nav-toggle");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener("click", () => navList.classList.toggle("open"));
  navList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navList.classList.remove("open");
  });

  // active section highlight
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav ul a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- reveal on scroll ---------- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

  /* ---------- map markers ---------- */
  const svg = document.getElementById("deccan-svg");
  const markerLayer = document.getElementById("marker-layer");
  const SVGNS = "http://www.w3.org/2000/svg";

  PLACES.forEach((p) => {
    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "marker");
    g.setAttribute("data-place", p.id);
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", p.name);

    const pulse = document.createElementNS(SVGNS, "circle");
    pulse.setAttribute("class", "pulse");
    pulse.setAttribute("cx", p.x); pulse.setAttribute("cy", p.y); pulse.setAttribute("r", 11);

    const ring = document.createElementNS(SVGNS, "circle");
    ring.setAttribute("class", "ring");
    ring.setAttribute("cx", p.x); ring.setAttribute("cy", p.y); ring.setAttribute("r", 11);

    const num = document.createElementNS(SVGNS, "text");
    num.setAttribute("class", "num");
    num.setAttribute("x", p.x); num.setAttribute("y", p.y + 0.5);
    num.textContent = p.n;

    const label = document.createElementNS(SVGNS, "text");
    label.setAttribute("class", "place");
    label.setAttribute("x", p.x + (p.labelDx || 0));
    label.setAttribute("y", p.y + (p.labelDy || 26));
    label.textContent = p.name.toUpperCase();

    g.append(pulse, ring, num, label);
    g.addEventListener("click", () => openPlace(p.id));
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlace(p.id); } });
    markerLayer.appendChild(g);
  });

  // legend chips
  const chips = document.querySelector(".map-chips");
  PLACES.forEach((p) => {
    const b = document.createElement("button");
    b.innerHTML = "<b>" + p.n + "</b>" + p.name;
    b.addEventListener("click", () => openPlace(p.id));
    chips.appendChild(b);
  });

  /* ---------- place overlay ---------- */
  const overlay = document.getElementById("place-overlay");
  const ovHero = overlay.querySelector(".overlay-hero");
  const ovKicker = overlay.querySelector(".overlay-hero .kicker");
  const ovTitle = overlay.querySelector(".overlay-hero h3");
  const ovEra = overlay.querySelector(".overlay-hero .era");
  const ovBody = overlay.querySelector(".overlay-body");
  let current = 0;

  function openPlace(id) {
    current = PLACES.findIndex((p) => p.id === id);
    renderPlace();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    overlay.scrollTop = 0;
  }

  function renderPlace() {
    const p = PLACES[current];
    ovHero.style.backgroundImage = "url('" + p.img + "')";
    ovKicker.textContent = p.n + " · " + p.alt;
    ovTitle.textContent = p.name;
    ovEra.textContent = p.era;
    let html = p.story.map((par) => "<p>" + par + "</p>").join("");
    if (p.quote) {
      html += "<blockquote>“" + p.quote.text + "”<cite>" + p.quote.cite + "</cite></blockquote>";
    }
    ovBody.innerHTML = html;
    overlay.scrollTop = 0;
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  overlay.querySelector(".overlay-close").addEventListener("click", closeOverlay);
  overlay.querySelector(".ov-prev").addEventListener("click", () => {
    current = (current - 1 + PLACES.length) % PLACES.length; renderPlace();
  });
  overlay.querySelector(".ov-next").addEventListener("click", () => {
    current = (current + 1) % PLACES.length; renderPlace();
  });

  /* ---------- timeline expand ---------- */
  document.querySelectorAll(".event h4").forEach((h) => {
    h.addEventListener("click", () => h.closest(".event").classList.toggle("open"));
  });

  /* ---------- kingdom cards -> open matching place ---------- */
  document.querySelectorAll(".kingdom-card[data-place]").forEach((card) => {
    card.addEventListener("click", () => openPlace(card.dataset.place));
  });

  /* ---------- gallery lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = lightbox.querySelector("img");
  const lbCap = lightbox.querySelector(".cap");

  document.querySelectorAll(".gallery-grid figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      lbImg.src = fig.querySelector("img").src;
      lbCap.textContent = fig.querySelector("figcaption").textContent;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  });

  /* ---------- ?at=section — instant jump (used for previews/captures) ---------- */
  const qs = new URLSearchParams(location.search);
  if (qs.get("full")) {
    document.documentElement.classList.add("capture");
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }
  const at = qs.get("at");
  if (at && document.getElementById(at)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    window.scrollTo({ top: document.getElementById(at).offsetTop - 60, behavior: "instant" });
  }
  const deepPlace = qs.get("place");
  if (deepPlace && PLACES.some((p) => p.id === deepPlace)) openPlace(deepPlace);

  /* ---------- esc closes everything ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeOverlay();
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
})();
