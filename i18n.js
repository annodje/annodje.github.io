/* ترجمة الموقع (فرنسي / إنجليزي). النصوص العربية الأصلية هي المفاتيح، والترجمات في i18n-dict.js */
(function () {
  var AR = /[\u0600-\u06FF]/, INL = { EM: 1, STRONG: 1, BR: 1, SPAN: 1, B: 1, I: 1, SMALL: 1 };
  var FORCE = '[data-i18n],.hero .eyebrow,#hero-title,.hero__lead,.hero__actions .button,.hero__actions .text-link,#about-title,#campus-title,#goals-values-title,#student-life-title,#programs-title,#method-title,#voices-title,#contact-title,.contact-hero h1,.contact-hero__copy > p,#contact-page-title,#map-title,#sitemap-title';
  var DICT = window.I18N_DICT || {}, units = [], attrs = [], lang = "ar", MISSING = {};
  var origTitle = document.title, descEl = document.querySelector('meta[name="description"]'), origDesc = descEl ? descEl.content : "";
  function rich(el) {
    if (!el.children.length) return false;
    for (var i = 0; i < el.children.length; i++) if (!INL[el.children[i].tagName]) return false;
    for (var j = 0; j < el.childNodes.length; j++) if (el.childNodes[j].nodeType === 3 && AR.test(el.childNodes[j].data)) return true;
    return false;
  }
  function walk(el) {
    var tg = el.tagName;
    if (tg === "SCRIPT" || tg === "STYLE" || tg === "NOSCRIPT" || el.id === "activity-cards" || el.hasAttribute("data-noi18n")) return;
    ["placeholder", "aria-label", "title", "alt"].forEach(function (a) { var v = el.getAttribute(a); if (v && AR.test(v)) attrs.push({ el: el, a: a, ar: v }); });
    if (el.id === "language-switcher") return;
    if ((el.matches(FORCE) || rich(el)) && AR.test(el.textContent)) { units.push({ el: el, key: el.innerHTML.trim() }); return; }
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && AR.test(n.data)) units.push({ node: n, key: n.data.trim(), raw: n.data });
      else if (n.nodeType === 1) walk(n);
    }
  }
  walk(document.body);
  function idx(l) { return l === "fr" ? 0 : 1; }
  function t(s, l) { l = l || lang; if (l === "ar" || !s) return s; var d = DICT[s]; if (!d) { MISSING[s] = 1; return s; } return d[idx(l)] || s; }
  function apply(l) {
    lang = l || "ar";
    var ar = lang === "ar";
    document.documentElement.lang = lang; document.documentElement.dir = ar ? "rtl" : "ltr"; document.body.classList.toggle("lang-ltr", !ar);
    units.forEach(function (u) {
      var v = ar ? u.key : t(u.key);
      if (u.el) u.el.innerHTML = v; else u.node.data = u.raw.replace(u.key, function () { return v; });
    });
    attrs.forEach(function (x) { x.el.setAttribute(x.a, ar ? x.ar : t(x.ar)); });
    document.title = ar ? origTitle : t(origTitle);
    if (descEl) descEl.content = ar ? origDesc : t(origDesc);
    var sw = document.getElementById("language-switcher"); if (sw) sw.value = lang;
    try { localStorage.setItem("nudge-language", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  window.I18N = { t: t, lang: function () { return lang; }, apply: apply, missing: function () { return Object.keys(MISSING).concat(units.filter(function (u) { return !DICT[u.key]; }).map(function (u) { return u.key; })).concat(attrs.filter(function (x) { return !DICT[x.ar]; }).map(function (x) { return x.ar; })).filter(function (v, i, a) { return a.indexOf(v) === i; }); } };
  var sw = document.getElementById("language-switcher");
  if (sw) sw.addEventListener("change", function (e) { apply(e.target.value); });
  function boot() { var s = null; try { s = localStorage.getItem("nudge-language"); } catch (e) {} if (s === "fr" || s === "en") apply(s); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
