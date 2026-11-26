(function () {
  var box = document.getElementById("hero-video");
  if (!box) return;
  var btn = box.querySelector(".hero-video__btn");
  var L = { ar: "تشغيل فيديو المؤسسة", fr: "Lire la vidéo de l'institution", en: "Play the institution video" };
  function lang() { try { return (window.I18N && window.I18N.lang()) || localStorage.getItem("nudge-language") || "ar"; } catch (e) { return "ar"; } }
  function label() { if (btn) btn.setAttribute("aria-label", L[lang()] || L.ar); }
  label();
  window.addEventListener("langchange", label);
  setTimeout(label, 400); setTimeout(label, 1500);
  if (!btn) return;
  btn.addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/8TAloc1TcJ8?autoplay=1&rel=0&playsinline=1";
    f.title = "Institution Annodje";
    f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.setAttribute("allowfullscreen", "");
    f.referrerPolicy = "strict-origin-when-cross-origin";
    box.querySelector(".hero-video__frame").replaceChild(f, btn);
  });
})();
