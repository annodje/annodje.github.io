/* عرض الأنشطة: شريط مصغّر في الصفحة الرئيسية (data-limit) وقائمة كاملة في activities.html */
(function () {
  var list = document.getElementById("activity-cards"), box = document.getElementById("lightbox");
  if (!list || !box || typeof ACTIVITIES === "undefined") return;
  var LIMIT = parseInt(list.getAttribute("data-limit") || "0", 10), STEP = 12, FIRST = 12;
  var vid = document.getElementById("lightbox-video"), img = document.getElementById("lightbox-img"), cap = document.getElementById("lightbox-cap"), ttl = document.getElementById("lightbox-title");
  var act = null, cur = 0, last = null, yr = 0, shown = 0;
  function T(s) { return window.I18N ? window.I18N.t(s) : s; }
  function isAr() { return !window.I18N || window.I18N.lang() === "ar"; }
  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; }
  var ALL = ACTIVITIES.map(function (a) { a.year = 2026; return a; });
  (typeof FB_ACTIVITIES !== "undefined" ? FB_ACTIVITIES : []).forEach(function (f) {
    var ph = []; for (var i = 0; i < f.n; i++) { ph.push({ src: "/" + (f.s + i + (f.j && i >= f.j ? 1 : 0)) + "-fb-" + f.k + "-" + (i < 9 ? "0" : "") + (i + 1) + ".jpg", alt: f.t }); }
    ALL.push({ title: f.t, year: f.y, photos: ph, cover: ph[0].src });
  });
  function badge(a) {
    var n = a.photos.length, nv = a.photos.filter(function (p) { return p.video; }).length;
    if (isAr()) return nv === n ? n + " فيديو" : (n === 1 ? "صورة" : n + " صورة");
    var w = nv === n ? "vidéo" : "photo"; if (window.I18N.lang() === "en") w = nv === n ? "video" : "photo";
    return n + " " + w + (n > 1 ? "s" : "");
  }
  function mk(a) {
    var card = el("button", "activity-tile"); card.type = "button";
    var fig = el("span", "activity-tile__img"); var im = document.createElement("img");
    im.src = a.cover || a.photos[0].src; im.alt = ""; im.width = 600; im.height = 600; im.loading = "lazy"; im.decoding = "async"; fig.appendChild(im);
    fig.appendChild(el("span", "activity-tile__count", badge(a)));
    var body = el("span", "activity-tile__body"); var t = el("strong", "activity-tile__title", T(a.title)); t.setAttribute("dir", "auto");
    body.appendChild(t); card.appendChild(fig); card.appendChild(body);
    card.addEventListener("click", function () { open(a, 0); });
    return card;
  }
  var chips = null, more = null;
  function items() { return ALL.filter(function (a) { return !yr || a.year === yr; }); }
  function render(reset) {
    var L = items();
    if (reset) { list.textContent = ""; shown = 0; }
    if (LIMIT) {
      list.textContent = ""; L.slice(0, LIMIT).forEach(function (a) { list.appendChild(mk(a)); });
      var m = el("a", "activity-tile activity-tile--more"); m.href = "/activities.html";
      m.appendChild(el("span", "activity-tile__plus", "+")); m.appendChild(el("strong", "activity-tile__title", T("عرض المزيد")));
      list.appendChild(m); return;
    }
    var to = Math.min(L.length, shown ? shown + STEP : FIRST);
    for (var i = shown; i < to; i++) list.appendChild(mk(L[i]));
    shown = to; more.hidden = shown >= L.length;
  }
  function labels() { if (!chips) return; chips.children[0].textContent = T("الكل"); more.textContent = T("عرض المزيد"); }
  if (!LIMIT) {
    more = el("button", "activity-more", "عرض المزيد"); more.type = "button";
    chips = el("div", "activity-years"); chips.setAttribute("role", "group");
    list.parentNode.insertBefore(chips, list); list.parentNode.insertBefore(more, list.nextSibling);
    [[0, "الكل"], [2026, "2026"], [2025, "2025"], [2024, "2024"]].forEach(function (y) {
      var b = el("button", "activity-year" + (y[0] === 0 ? " is-active" : ""), y[1]); b.type = "button";
      b.addEventListener("click", function () { yr = y[0]; Array.prototype.forEach.call(chips.children, function (c) { c.classList.remove("is-active"); }); b.classList.add("is-active"); render(true); });
      chips.appendChild(b);
    });
    more.addEventListener("click", function () { render(false); });
  }
  render(true);
  document.addEventListener("langchange", function () { var keep = shown; render(true); if (!LIMIT) { while (shown < keep && !more.hidden) render(false); labels(); } });
  function capText(p) { var n = "(" + (cur + 1) + "/" + act.photos.length + ")"; return isAr() ? (p.alt || "") + " " + n : n; }
  function show(i) {
    var one = act.photos.length < 2; box.querySelector(".lightbox__nav--next").hidden = one; box.querySelector(".lightbox__nav--prev").hidden = one;
    cur = (i + act.photos.length) % act.photos.length; var p = act.photos[cur]; vid.pause();
    if (p.video) { img.hidden = true; img.removeAttribute("src"); vid.hidden = false; vid.poster = p.poster || ""; vid.src = p.video; vid.load(); } else { vid.hidden = true; vid.removeAttribute("src"); vid.load(); img.hidden = false; img.src = p.src; }
    img.alt = isAr() ? (p.alt || "") : T(act.title); cap.textContent = capText(p);
  }
  function open(a, i) { act = a; last = document.activeElement; ttl.textContent = T(a.title); show(i); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lightbox__close").focus(); }
  function close() { box.hidden = true; vid.pause(); vid.removeAttribute("src"); vid.load(); img.removeAttribute("src"); document.body.style.overflow = ""; if (last) last.focus(); }
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(cur + 1); });
  box.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(cur - 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) { if (box.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur + 1); if (e.key === "ArrowRight") show(cur - 1); });
  var sx = 0; box.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) { var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); }, { passive: true });
})();
