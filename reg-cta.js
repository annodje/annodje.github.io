(function () {
  var box = document.getElementById("reg-cta");
  if (!box) return;
  var NUM = "212671979707";
  var T = {
    ar: { n: "التسجيل", r: "إعادة التسجيل", tn: "مرحبا، أرغب في تسجيل ابني/ابنتي بمؤسسة النضج. أرجو إفادتي بالوثائق والإجراءات.", tr: "مرحبا، أرغب في إعادة تسجيل ابني/ابنتي بمؤسسة النضج. أرجو إفادتي بالوثائق والإجراءات." },
    fr: { n: "Inscription", r: "Réinscription", tn: "Bonjour, je souhaite inscrire mon enfant à l'Institution Annodje. Pouvez-vous m'indiquer les documents et la démarche ?", tr: "Bonjour, je souhaite réinscrire mon enfant à l'Institution Annodje. Pouvez-vous m'indiquer les documents et la démarche ?" },
    en: { n: "Registration", r: "Re-registration", tn: "Hello, I would like to register my child at Institution Annodje. Could you tell me the documents and steps?", tr: "Hello, I would like to re-register my child at Institution Annodje. Could you tell me the documents and steps?" }
  };
  function lang() { try { return (window.I18N && window.I18N.lang()) || localStorage.getItem("nudge-language") || "ar"; } catch (e) { return "ar"; } }
  function render() {
    var t = T[lang()] || T.ar;
    var a = box.querySelectorAll("a");
    a[0].textContent = t.n; a[1].textContent = t.r;
    a[0].href = "/registration.html";
    a[1].href = "/registration.html?type=re";
  }
  render();
  window.addEventListener("langchange", render);
  setTimeout(render, 400); setTimeout(render, 1500);
})();
