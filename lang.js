/* =========================================================
   DEYSHU — language switcher
   Default English. Pinned: Traditional Chinese, Simplified
   Chinese, Japanese, Korean. Plus every other language.
   Whole-page translation is powered by Google Translate, so
   all text (including dynamically rendered content) is
   translated completely — never left half-done.
   ========================================================= */
(function () {
  "use strict";

  var PINNED = [
    ["en", "English", "EN"],
    ["zh-TW", "繁體中文", "繁"],
    ["zh-CN", "简体中文", "简"],
    ["ja", "日本語", "日"],
    ["ko", "한국어", "한"]
  ];
  var MORE = [
    ["es","Español"],["fr","Français"],["de","Deutsch"],["pt","Português"],
    ["it","Italiano"],["ru","Русский"],["ar","العربية"],["hi","हिन्दी"],
    ["id","Bahasa Indonesia"],["ms","Bahasa Melayu"],["tl","Filipino"],
    ["vi","Tiếng Việt"],["th","ไทย"],["zh-CN","中文"],["nl","Nederlands"],
    ["tr","Türkçe"],["pl","Polski"],["uk","Українська"],["fa","فارسی"]
  ];

  var ALL = PINNED.concat(MORE);
  var codes = {}; ALL.forEach(function (x) { codes[x[0]] = 1; });

  /* ---- Google Translate engine (hidden) ---- */
  window.googleTranslateElementInit = function () {
    try {
      // No 'layout' option — that gives us the <select class="goog-te-combo">
      // control we drive programmatically (SIMPLE layout omits it).
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: Object.keys(codes).join(","),
        autoDisplay: false
      }, "google_translate_element");
    } catch (e) {}
  };
  (function loadGT() {
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.onerror = function () { var b = document.getElementById("lang-btn"); if (b) b.title = "Translation service unavailable right now"; };
    document.head.appendChild(s);
  })();

  function cookie(name, val, remove) {
    var host = location.hostname;
    var bases = ["", "; domain=" + host, "; domain=." + host];
    bases.forEach(function (d) {
      document.cookie = name + "=" + (remove ? "" : val) + (remove ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "") + "; path=/" + d;
    });
  }

  function setLang(code) {
    try { localStorage.setItem("deyshu_lang", code); } catch (e) {}
    updateButton(code);
    if (code === "en") {
      cookie("googtrans", "", true);
      location.reload();
      return;
    }
    cookie("googtrans", "/en/" + code);
    var n = 0;
    var iv = setInterval(function () {
      var combo = document.querySelector(".goog-te-combo");
      if (combo) {
        clearInterval(iv);
        combo.value = code;
        combo.dispatchEvent(new Event("change"));
      } else if (++n > 30) {
        clearInterval(iv);
        location.reload(); // cookie already set — reload applies the translation
      }
    }, 100);
  }

  function updateButton(code) {
    var found = ALL.filter(function (x) { return x[0] === code; })[0];
    var short = (found && found[2]) || (found && found[1].slice(0, 2)) || "EN";
    var cur = document.getElementById("lang-cur");
    if (cur) cur.textContent = short;
  }

  /* ---- custom dropdown UI ---- */
  function build() {
    var header = document.querySelector(".nav");
    if (!header || document.getElementById("lang-btn")) return;

    var wrap = document.createElement("div");
    wrap.className = "lang-wrap";
    wrap.innerHTML =
      '<button class="lang-btn" id="lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="Choose language">' +
      '<span class="lang-globe">🌐</span><span id="lang-cur">EN</span><span class="lang-caret">▾</span></button>' +
      '<div class="lang-menu" id="lang-menu" role="menu" hidden></div>';
    header.appendChild(wrap);

    var menu = wrap.querySelector("#lang-menu");
    var html = '<div class="lang-group">';
    PINNED.forEach(function (x) { html += item(x); });
    html += '</div><div class="lang-sep">More languages · auto</div><div class="lang-group lang-more">';
    MORE.forEach(function (x) { html += item(x); });
    html += '</div>';
    menu.innerHTML = html;

    function item(x) {
      return '<button class="lang-item" role="menuitem" data-code="' + x[0] + '">' + x[1] + '</button>';
    }

    var btn = wrap.querySelector("#lang-btn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !menu.hidden; menu.hidden = open; btn.setAttribute("aria-expanded", String(!open));
    });
    menu.addEventListener("click", function (e) {
      var it = e.target.closest(".lang-item"); if (!it) return;
      menu.hidden = true; btn.setAttribute("aria-expanded", "false");
      setLang(it.getAttribute("data-code"));
    });
    document.addEventListener("click", function () { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); });

    // restore saved language
    var saved;
    try { saved = localStorage.getItem("deyshu_lang"); } catch (e) {}
    if (saved && saved !== "en" && codes[saved]) {
      updateButton(saved);
      var tries = 0;
      var iv = setInterval(function () {
        var combo = document.querySelector(".goog-te-combo");
        if (combo) { combo.value = saved; combo.dispatchEvent(new Event("change")); clearInterval(iv); }
        if (++tries > 40) clearInterval(iv);
      }, 150);
    } else {
      updateButton("en");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
