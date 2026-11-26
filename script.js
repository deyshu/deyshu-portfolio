/* =========================================================
   DEYSHU — Portfolio engine
   Reads projects.json and renders the whole site from it.
   Nothing about the projects is hardcoded here or in the HTML.
   ========================================================= */

(function () {
  "use strict";

  const CONTACT_ICONS = {
    Email:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#EA4335"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>',
    Website:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    Phone:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1z"/></svg>',
    Instagram:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#E4405F"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
    Telegram:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    LINE:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#06C755"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>',
    Facebook:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#0866FF"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    Default:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>'
  };

  /* What each technology is actually used for across my systems */
  const TECH_PURPOSE = {
    "Google Apps Script": "The engine behind the JIL Church System and ARK Business Hub — it runs each one as a web app on Google’s cloud, with no server to rent.",
    "JavaScript": "The language that ties every web app together — dashboards, check-in kiosks and admin tools across all my systems.",
    "TypeScript": "Typed, safer code for the Church Presentation Studio’s front-end, so the live stage app stays reliable.",
    "React": "Builds the Church Presentation Studio’s desktop interface — the live stage preview, service queue and controls.",
    "Swift": "Native macOS power for Deyhub Studio — fast, offline photo editing with 48 filters and bulk processing.",
    "Rust": "The high-performance core of the Church Presentation Studio — real-time Bible-reference detection from the mic.",
    "Tauri": "Wraps the Presentation Studio into a small, fast cross-platform desktop app for Windows and macOS.",
    "SQLite": "Local, file-based storage inside the Presentation Studio — it works even with no internet.",
    "PostgreSQL": "The self-hosted database backbone (JIL NEXUS) — built to carry the church network toward a million records.",
    "Supabase": "Runs my self-hosted Postgres stack (NEXUS) with a dashboard and APIs, on my own machine — no monthly cloud bill.",
    "Python": "Automation and AI scripting — local models and glue code that power my tooling and experiments.",
    "Docker": "Containers that run my self-hosted NEXUS database stack cleanly and repeatably on my own hardware.",
    "Cloudflare": "A secure tunnel that syncs new registrations live from Google Sheets into my self-hosted database."
  };

  /* What each tag does inside a project card */
  const TAG_PURPOSE = {
    "Google Apps Script": "Runs the whole app as a Google-hosted web app — the server behind this system, with no hosting to rent.",
    "JavaScript": "Powers the interface and logic — forms, dashboards and check-in flows in the browser.",
    "Google Sheets": "Acts as the live database here — every record sits in structured sheets the app reads and writes.",
    "PostgreSQL": "The self-hosted database that mirrors the data for scale and independence from the cloud.",
    "QR check-in": "Members register and check in at the door by scanning a QR code on any phone.",
    "HTML / CSS": "Builds and styles every screen — the look and layout people actually use.",
    "Supabase": "Serves the self-hosted Postgres with a dashboard and instant APIs, on my own machine.",
    "Docker": "Runs the self-hosted database stack in clean, repeatable containers.",
    "Cloudflare Tunnel": "A secure tunnel that syncs new data from the cloud into the self-hosted database, live.",
    "Tauri 2": "Packs the app into a tiny, fast desktop program for both Windows and macOS.",
    "Rust": "The fast, reliable core — including real-time Bible-reference detection from the microphone.",
    "React": "Builds the desktop interface — the live stage, controls and editing views.",
    "TypeScript": "Typed, safer code so the app stays reliable during live services.",
    "SQLite": "Local, file-based storage so the app works fully offline.",
    "Swift": "Apple’s native language for a fast, polished macOS app.",
    "macOS": "Built natively for Mac — full speed and deep system integration.",
    "Core Image": "Apple’s imaging engine behind the 48 filters and real-time photo effects.",
    "AppKit": "Apple’s native UI framework for the app’s windows, menus and controls."
  };

  let HIRE_EMAIL = "deyshuhub@gmail.com";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- small helpers ---------- */
  function el(tag, props = {}, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined) node.setAttribute(k, v);
    }
    for (const kid of kids) {
      if (kid == null) continue;
      node.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return node;
  }

  /* ---------- reveal on scroll ---------- */
  const revealObserver = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })
    : null;

  function observeReveals(root = document) {
    const nodes = root.querySelectorAll(".reveal:not(.in)");
    if (!revealObserver) { nodes.forEach(n => n.classList.add("in")); return; }
    nodes.forEach(n => revealObserver.observe(n));
  }

  /* ---------- device frames ---------- */
  function buildFrame(img, accent) {
    if (!img || img.frame === "placeholder" || !img.src) {
      return el("div", { class: "frame frame-placeholder" },
        el("div", { class: "ph-icon" }, "📷"),
        el("p", { class: "ph-title" }, "Screenshot coming"),
        el("p", { class: "ph-sub" }, (img && img.caption) || "Add a real image to this project's assets folder.")
      );
    }

    const picture = el("img", {
      src: img.src, alt: img.alt || "", loading: "lazy", decoding: "async"
    });

    let frame;
    if (img.frame === "browser") {
      frame = el("div", { class: "frame frame-browser", tabindex: "0", role: "button",
                          "aria-label": "Open image: " + (img.alt || img.caption || "") },
        el("div", { class: "chrome" },
          el("span", { class: "dot" }), el("span", { class: "dot" }), el("span", { class: "dot" })),
        picture);
    } else if (img.frame === "phone") {
      frame = el("div", { class: "frame frame-phone", tabindex: "0", role: "button",
                          "aria-label": "Open image: " + (img.alt || img.caption || "") }, picture);
    } else { // app or anything else
      frame = el("div", { class: "frame frame-app" }, picture);
    }

    if (img.frame === "browser" || img.frame === "phone") {
      const open = () => openLightbox(img.src, img.caption || img.alt || "");
      frame.addEventListener("click", open);
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    }
    return frame;
  }

  /* ---------- render one project ---------- */
  function renderProject(p, index) {
    const accent = p.accent || "#5b7cff";

    const eyebrow = el("div", { class: "project-eyebrow" },
      el("span", { class: "project-index" }, String(index + 1).padStart(2, "0")),
      p.featured ? el("span", { class: "badge badge-featured" }, "★ Flagship") : null,
      p.status ? el("span", { class: "badge" }, p.status) : null,
      p.testBadge ? el("span", { class: "badge badge-tested" }, "✓ " + p.testBadge) : null
    );

    const desc = el("div", { class: "project-desc" });
    (p.description || []).forEach(para => desc.append(el("p", {}, para)));

    const tags = el("div", { class: "project-tags" });
    const tagPurpose = el("div", { class: "tag-purpose" },
      el("span", { class: "tp-hint" }, "Tap a tag to see its job in this project →"));
    const tagBtns = [];
    function showTag(btn, name) {
      tagBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tagPurpose.innerHTML = "";
      tagPurpose.append(
        el("span", { class: "tp-name" }, name),
        el("span", { class: "tp-text" }, TAG_PURPOSE[name] || "Part of how this project is built.")
      );
    }
    (p.tech || []).forEach(t => {
      const b = el("button", { class: "tag", type: "button", onclick: () => showTag(b, t) }, t);
      tagBtns.push(b);
      tags.append(b);
    });

    const highlights = el("ul", { class: "project-highlights" });
    (p.highlights || []).forEach(h => highlights.append(el("li", {}, h)));

    const body = el("div", { class: "project-body" },
      p.logo ? el("div", { class: "project-logo" }, el("img", { src: p.logo, alt: (p.name || "") + " logo", loading: "lazy" })) : null,
      eyebrow,
      el("h3", { class: "project-name" }, p.name || "Untitled project"),
      p.tagline ? el("p", { class: "project-tagline" }, p.tagline) : null,
      p.role ? el("p", { class: "project-role" }, p.role) : null,
      desc,
      tags,
      tagPurpose,
      highlights,
      p.requirements ? el("p", { class: "project-req" }, "💻 " + p.requirements) : null,
      p.demo ? el("div", { class: "project-actions" },
        el("a", {
          class: "btn btn-demo",
          href: "mailto:" + (HIRE_EMAIL || "deyshuhub@gmail.com") +
            "?subject=" + encodeURIComponent("Live demo request: " + (p.name || "a project")) +
            "&body=" + encodeURIComponent("Hi DEYSHU,\n\nI'd like to see a live demo of " + (p.name || "your project") + ". Here's a bit about me and what I'm looking for:\n\n")
        }, "Request a live demo →")
      ) : null
    );

    const shots = el("div", { class: "shots" });
    (p.images && p.images.length ? p.images : [{ frame: "placeholder" }]).forEach(img => {
      const wrap = el("div", {});
      wrap.append(buildFrame(img, accent));
      if (img.caption && img.frame !== "placeholder") wrap.append(el("p", { class: "shot-cap" }, img.caption));
      shots.append(wrap);
    });
    const media = el("div", { class: "project-media" }, shots);

    const card = el("article",
      { class: "project reveal" + (p.featured ? " featured" : ""), id: "project-" + (p.id || index) },
      el("div", { class: "project-grid" }, body, media)
    );
    card.style.setProperty("--p-accent", accent);

    if (!reduceMotion) attachTilt(card);
    return card;
  }

  /* ---------- 3D tilt (depth) ---------- */
  function attachTilt(card) {
    const MAX = 5; // degrees
    let raf = null;
    function onMove(e) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", (px * 100) + "%");
      card.style.setProperty("--my", (py * 100) + "%");
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rx = (0.5 - py) * (MAX * 2);
        const ry = (px - 0.5) * (MAX * 2);
        card.style.transform =
          `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        raf = null;
      });
    }
    function reset() {
      if (raf) cancelAnimationFrame(raf), raf = null;
      card.style.transform = "";
    }
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", reset);
  }

  /* ---------- lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lightbox-img");
  const lbCap = $("#lightbox-cap");
  function openLightbox(src, cap) {
    lbImg.src = src; lbImg.alt = cap || ""; lbCap.textContent = cap || "";
    lightbox.hidden = false; document.body.style.overflow = "hidden";
    $("#lightbox-close").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true; lbImg.src = ""; document.body.style.overflow = "";
  }
  $("#lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

  /* ---------- render the fixed sections from data ---------- */
  function renderHeader(data) {
    const o = data.owner || {};
    if (o.name) { $("#hero-name").textContent = o.name; const nn = $(".nav-name"); if (nn) nn.textContent = o.name; const nm = $(".nav-mark"); if (nm) nm.textContent = (o.name[0] || "D"); }
    if (o.tagline) $("#hero-tagline").textContent = o.tagline;
    if (o.location) { $("#hero-location").textContent = o.location; $("#footer-location").textContent = o.location; }

    // stats
    const sg = $("#stats-grid");
    sg.innerHTML = "";
    (data.stats || []).forEach(s => sg.append(
      el("div", { class: "stat" },
        el("div", { class: "stat-value" }, s.value),
        el("div", { class: "stat-label" }, s.label))
    ));

    // stack — each chip is clickable and reveals what I use it for
    const sc = $("#stack-cloud");
    sc.innerHTML = "";
    const oldPanel = $("#stack-purpose"); if (oldPanel) oldPanel.remove();
    const purposePanel = el("div", { class: "stack-purpose", id: "stack-purpose" },
      el("span", { class: "sp-hint" }, "Tap a technology to see how I use it →"));
    sc.parentNode.insertBefore(purposePanel, sc.nextSibling);

    const chips = [];
    function showPurpose(chip, name) {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      purposePanel.innerHTML = "";
      purposePanel.append(
        el("span", { class: "sp-name" }, name),
        el("span", { class: "sp-text" }, TECH_PURPOSE[name] || "Part of my hybrid toolkit.")
      );
    }
    (data.techStack || []).forEach(t => {
      const chip = el("button", { class: "chip", type: "button",
        onclick: () => showPurpose(chip, t) }, t);
      chips.push(chip);
      sc.append(chip);
    });

    // about — brand + founder byline first
    const ab = $("#about-body");
    ab.innerHTML = "";
    if (o.realName) {
      ab.append(el("div", { class: "about-byline" },
        el("span", { class: "ab-brand" }, o.name || "DEYSHU"),
        el("span", { class: "ab-sep" }, "— Built by"),
        el("span", { class: "ab-real" }, o.realName),
        o.chineseName ? el("span", { class: "ab-zh" }, o.chineseName) : null
      ));
    }
    (o.about || []).forEach(para => ab.append(el("p", {}, para)));
    // portrait caption with real name
    const figcap = $(".about-portrait figcaption");
    if (figcap && o.realName) figcap.textContent =
      o.realName + (o.chineseName ? " · " + o.chineseName : "") + " · " + (o.brand || "Deyshu Services");

    // contacts
    const fc = $("#footer-contacts");
    fc.innerHTML = "";
    (o.contact || []).forEach(c => {
      // render as a namespaced data-URI image so iOS Safari paints it reliably
      var rawSvg = (CONTACT_ICONS[c.label] || CONTACT_ICONS.Default)
        .replace("<svg ", "<svg xmlns=\"http://www.w3.org/2000/svg\" ")
        .replace(/currentColor/g, "#f5871f");
      const icon = el("img", { class: "fc-icon", alt: "",
        src: "data:image/svg+xml;utf8," + encodeURIComponent(rawSvg) });
      const inner = [icon, el("span", { class: "fc-label" }, c.label), el("span", { class: "fc-value" }, c.value)];
      if (c.href) fc.append(el("li", {}, el("a", { href: c.href, target: "_blank", rel: "noopener" }, ...inner)));
      else fc.append(el("li", { class: "empty" }, el("span", {}, ...inner)));
    });

    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- boot ---------- */
  function showEmpty(reason) {
    $("#projects-list").hidden = true;
    const box = $("#projects-empty");
    box.hidden = false;
    $("#projects-empty-reason").textContent = reason;
  }

  function renderProjects(data) {
    const list = $("#projects-list");
    const projects = Array.isArray(data.projects) ? data.projects : [];
    if (!projects.length) { showEmpty("projects.json loaded, but it contains no projects."); return; }
    list.hidden = false;
    const emptyBox = $("#projects-empty"); if (emptyBox) emptyBox.hidden = true;
    list.innerHTML = "";
    // featured first, otherwise keep file order
    projects
      .map((p, i) => ({ p, i }))
      .sort((a, b) => (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0))
      .forEach(({ p }, idx) => list.append(renderProject(p, idx)));
    observeReveals(list);
  }

  /* ---------- Services ---------- */
  function renderServices(data) {
    const grid = $("#services-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (data.owner && data.owner.services || []).forEach((s, i) => {
      const card = el("article", { class: "service-card" },
        el("div", { class: "service-top" },
          el("div", { class: "service-icon" }, s.icon || "</>"),
          el("span", { class: "service-num" }, String(i + 1).padStart(2, "0"))
        ),
        s.tag ? el("span", { class: "service-tag" }, s.tag) : null,
        el("h3", { class: "service-title" }, s.title || ""),
        el("p", { class: "service-text" }, s.text || "")
      );
      if (s.bullets && s.bullets.length) {
        const ul = el("ul", { class: "service-list" });
        s.bullets.forEach(b => ul.append(el("li", {}, b)));
        card.append(ul);
      }
      if (s.cta) {
        card.append(el("a", {
          class: "service-cta",
          href: "mailto:" + (HIRE_EMAIL || "deyshuhub@gmail.com") +
            "?subject=" + encodeURIComponent("Project inquiry: " + (s.title || "")) +
            "&body=" + encodeURIComponent("Hi DEYSHU,\n\nI'm interested in " + (s.title || "a project") + ". Here's a bit about my business and what I need:\n\n")
        }, "Discuss a project →"));
      }
      grid.append(card);
    });
  }

  /* ---------- Case studies ---------- */
  function renderCases(data) {
    const wrap = $("#cases-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    const cases = (data.projects || []).filter(p => p.caseStudy);
    const sec = $("#cases");
    if (!cases.length) { if (sec) sec.hidden = true; return; }
    cases.forEach(p => {
      const c = p.caseStudy;
      const card = el("article", { class: "case-card" });
      card.style.setProperty("--p-accent", p.accent || "#f5871f");
      card.append(
        el("div", { class: "case-head" },
          p.logo ? el("div", { class: "project-logo case-logo" }, el("img", { src: p.logo, alt: (p.name || "") + " logo", loading: "lazy" })) : null,
          el("h3", { class: "case-name" }, p.name || "")
        ),
        el("div", { class: "case-steps" },
          caseStep("The problem", c.problem, "case-problem"),
          caseStep("My solution", c.solution, "case-solution"),
          caseStep("The results", c.results, "case-results")
        )
      );
      if (c.beforeAfter && c.beforeAfter.length) {
        const ba = el("div", { class: "case-ba" },
          el("div", { class: "ba-head" },
            el("span", { class: "ba-label ba-before" }, "Before"),
            el("span", { class: "ba-arrow" }, "→"),
            el("span", { class: "ba-label ba-after" }, "After"),
            el("span", { class: "ba-note" }, "illustrative, from the real build")
          )
        );
        c.beforeAfter.forEach(row => {
          ba.append(el("div", { class: "ba-row" },
            el("span", { class: "ba-b" }, row[0]),
            el("span", { class: "ba-sep" }, "→"),
            el("span", { class: "ba-a" }, row[1])
          ));
        });
        card.append(ba);
      }
      wrap.append(card);
    });
  }
  function caseStep(label, text, cls) {
    return el("div", { class: "case-step " + cls },
      el("span", { class: "case-label" }, label),
      el("p", {}, text || "")
    );
  }

  /* ---------- Hiring / inquiry form → opens email ---------- */
  function wireHireForm(owner) {
    const form = $("#hire-form");
    if (!form) return;
    const to = (owner && owner.hireEmail) || "deyshuhub@gmail.com";
    const note = $("#hf-note");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = ($("#hf-name").value || "").trim();
      const email = ($("#hf-email").value || "").trim();
      const type = $("#hf-type").value || "";
      const msg = ($("#hf-msg").value || "").trim();
      const subject = "Project inquiry" + (name ? " from " + name : "") + " — " + type;
      const body =
        "Hi DEYSHU,\n\n" + (msg || "I'd like to talk about a project.") +
        "\n\n— Need: " + type +
        (name ? "\n— Name: " + name : "") +
        (email ? "\n— Email: " + email : "") + "\n";
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      if (note) note.hidden = false;
    });
  }

  async function boot() {
    // Nav shadow on scroll
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    observeReveals(); // for the static .reveal blocks

    // Fetch with a few quiet retries so a cold/slow server or flaky
    // network never leaves a visitor stuck on the empty state.
    async function loadData(attempts) {
      let lastErr;
      for (let i = 0; i < attempts; i++) {
        try {
          const res = await fetch("projects.json?v=" + Date.now(), { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          return await res.json();
        } catch (e) {
          lastErr = e;
          if (i < attempts - 1) await new Promise(r => setTimeout(r, 600 * (i + 1)));
        }
      }
      throw lastErr;
    }

    try {
      const data = await loadData(4);
      if (data.owner && data.owner.hireEmail) HIRE_EMAIL = data.owner.hireEmail;
      renderHeader(data);
      renderProjects(data);
      renderServices(data);
      renderCases(data);
      wireHireForm(data.owner || {});
    } catch (err) {
      // The page is pre-rendered with full content in the HTML, so if the live
      // fetch ever fails we simply keep what's already on screen — no error state.
      console.warn("[portfolio] live projects.json refresh failed; showing pre-rendered content.", err);
      $("#year").textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ===== 4D watermark parallax + stunning hybrid cursor ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* watermark is now a stable, static 3D mark (see styles.css) — no parallax motion */

  /* ---- professional arrow cursor: instant pointer + aura + lively spark trail ---- */
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  function mk(c) { var d = document.createElement("div"); d.className = c; return d; }

  var glow = mk("cursor-glow");
  var arrow = mk("cursor-arrow");
  arrow.innerHTML =
    '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
    '<defs><linearGradient id="curG" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#f7c948"/><stop offset=".55" stop-color="#f5871f"/>' +
    '<stop offset="1" stop-color="#e0392b"/></linearGradient></defs>' +
    '<path d="M4 3 L4 21 L9.2 16.2 L12.6 23.6 L15.8 22.1 L12.4 14.9 L19.6 14.2 Z" ' +
    'fill="url(#curG)" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>';
  document.body.appendChild(glow);
  document.body.appendChild(arrow);
  document.body.classList.add("has-cursor");

  var x = innerWidth / 2, y = innerHeight / 2, gx = x, gy = y, last = 0;
  window.addEventListener("mousemove", function (e) {
    x = e.clientX; y = e.clientY;
    // arrow follows INSTANTLY (tip hotspot at 4,3)
    arrow.style.transform = "translate(" + (x - 4) + "px," + (y - 3) + "px)";
    var now = performance.now();
    if (!reduce && now - last > 18) { last = now; trail(x, y); }
  }, { passive: true });
  // only the soft aura trails, and quickly
  (function rl() {
    gx += (x - gx) * 0.3; gy += (y - gy) * 0.3;
    glow.style.transform = "translate(" + gx + "px," + gy + "px) translate(-50%,-50%)";
    requestAnimationFrame(rl);
  })();

  var HOT = "a,button,.chip,.tag,.frame,input,label,[role=button]";
  document.addEventListener("mouseover", function (e) { if (e.target.closest(HOT)) document.body.classList.add("cursor-hot"); });
  document.addEventListener("mouseout", function (e) { if (e.target.closest(HOT)) document.body.classList.remove("cursor-hot"); });
  document.addEventListener("mousedown", function () { document.body.classList.add("cursor-down"); });
  document.addEventListener("mouseup", function () { document.body.classList.remove("cursor-down"); });
  // hide when leaving the window, show on return
  document.addEventListener("mouseleave", function () { document.body.classList.add("cursor-hidden"); });
  document.addEventListener("mouseenter", function () { document.body.classList.remove("cursor-hidden"); });

  function trail(px, py) {
    var t = mk("cursor-trail");
    var base = "translate(" + px + "px," + py + "px) translate(-50%,-50%)";
    t.style.transform = base;
    document.body.appendChild(t);
    var s = 0.6 + Math.random() * 0.5;
    t.animate(
      [{ opacity: 0.7, transform: base + " scale(" + s + ")" },
       { opacity: 0, transform: base + " scale(0)" }],
      { duration: 460, easing: "cubic-bezier(.22,1,.36,1)" }
    ).onfinish = function () { t.remove(); };
  }
})();

/* ===== Lively click effects on everything (ripple burst + press pop) ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HOT = "a,button,.chip,.tag,.frame,.hybrid-card,.stat,.footer-contacts li a,[role=button]";

  document.addEventListener("pointerdown", function (e) {
    var el = e.target.closest(HOT);
    if (el) { el.classList.add("is-pressed"); setTimeout(function () { el.classList.remove("is-pressed"); }, 150); }
    if (!reduce) burst(e.clientX, e.clientY);
  }, { passive: true });

  function burst(x, y) {
    // expanding ring
    var r = document.createElement("div");
    r.className = "click-burst";
    r.style.left = x + "px"; r.style.top = y + "px";
    document.body.appendChild(r);
    r.animate(
      [{ transform: "translate(-50%,-50%) scale(1)", opacity: 0.9 },
       { transform: "translate(-50%,-50%) scale(9)", opacity: 0 }],
      { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" }
    ).onfinish = function () { r.remove(); };
    // flying sparks
    var n = 6;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("div");
      s.className = "click-spark";
      s.style.left = x + "px"; s.style.top = y + "px";
      document.body.appendChild(s);
      var ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      var dist = 26 + Math.random() * 26;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
      s.animate(
        [{ transform: "translate(-50%,-50%) translate(0,0) scale(1)", opacity: 1 },
         { transform: "translate(-50%,-50%) translate(" + dx + "px," + dy + "px) scale(0)", opacity: 0 }],
        { duration: 560, easing: "cubic-bezier(.22,1,.36,1)" }
      ).onfinish = (function (node) { return function () { node.remove(); }; })(s);
    }
  }
})();
