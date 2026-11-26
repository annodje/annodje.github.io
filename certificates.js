/* Certificate request: opens WhatsApp with the data, or fills a printable sheet.
   Nothing is stored (no localStorage/cookies) and nothing is sent to a server. */
(function () {
  var NUM = "212671979707";
  var T = {
    ar: { dir: "rtl", school: "مؤسسة النضج للتربية والتعليم الخصوصي", city: "مراكش", title: { leaving: "طلب شهادة المغادرة", school: "طلب شهادة مدرسية" }, intro: "طلب شهادة من موقع مؤسسة النضج.", rows: ["نوع الشهادة", "اسم ولي الأمر", "رقم البطاقة الوطنية (CIN)", "اسم التلميذ(ة)", "المستوى الدراسي", "سبب الطلب"], types: { leaving: "شهادة المغادرة", school: "شهادة مدرسية" }, recv: "تاريخ الاستلام: ....... / ....... / .............", sign: "توقيع ولي الأمر", ok: "جارٍ فتح واتساب لإرسال طلبك…", pr: "جارٍ فتح نافذة الطباعة…" },
    fr: { dir: "ltr", school: "Institution Annodje pour l'éducation et l'enseignement privé", city: "Marrakech", title: { leaving: "Demande de certificat de départ", school: "Demande de certificat de scolarité" }, intro: "Demande de certificat depuis le site de l'Institution Annodje.", rows: ["Type de certificat", "Nom du tuteur", "N° de la carte nationale (CIN)", "Nom de l'élève", "Niveau scolaire", "Motif de la demande"], types: { leaving: "Certificat de départ", school: "Certificat de scolarité" }, recv: "Reçu le : ....... / ....... / .............", sign: "Signature du tuteur", ok: "Ouverture de WhatsApp pour envoyer votre demande…", pr: "Ouverture de la fenêtre d'impression…" },
    en: { dir: "ltr", school: "Institution Annodje for private education and teaching", city: "Marrakech", title: { leaving: "Leaving certificate request", school: "School certificate request" }, intro: "Certificate request from the Institution Annodje website.", rows: ["Type of certificate", "Guardian's name", "National ID number (CIN)", "Student's name", "School level", "Reason for the request"], types: { leaving: "Leaving certificate", school: "School certificate" }, recv: "Received on: ....... / ....... / .............", sign: "Guardian's signature", ok: "Opening WhatsApp to send your request…", pr: "Opening the print window…" }
  };
  var f = document.getElementById("cert-form");
  if (!f) return;
  function lang() { var l = (window.I18N && window.I18N.lang && window.I18N.lang()) || "ar"; return T[l] ? l : "ar"; }
  function data(t) {
    var type = f.elements.type.value;
    var lv = f.elements.level;
    return [t.types[type], f.elements.guardian.value.trim(), f.elements.cin.value.trim(), f.elements.student.value.trim(), lv.options[lv.selectedIndex].text.trim(), f.elements.reason.value.trim()];
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sheet(t) {
    var d = data(t), type = f.elements.type.value;
    var rows = t.rows.map(function (r, i) { return "<tr><th>" + esc(r) + "</th><td>" + esc(d[i]) + "</td></tr>"; }).join("");
    var el = document.getElementById("print-sheet");
    el.setAttribute("dir", t.dir);
    el.innerHTML = '<div class="ps-head"><img src="/1-logo.jpg?v=1" alt="" /><div><strong>' + esc(t.school) + "</strong><span>" + esc(t.city) + '</span></div></div><h1 class="ps-title">' + esc(t.title[type]) + '</h1><table class="ps-table">' + rows + '</table><div class="ps-foot"><p class="ps-recv">' + esc(t.recv) + '</p><div class="ps-sign"><span>' + esc(t.sign) + '</span><div class="ps-line"></div></div></div>';
  }
  function status(msg) { var s = document.getElementById("cert-status"); if (s) s.textContent = msg; }
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = T[lang()], d = data(t);
    var lines = [t.intro, ""];
    for (var i = 0; i < d.length; i++) lines.push(t.rows[i] + ": " + d[i]);
    var url = "https://wa.me/" + NUM + "?text=" + encodeURIComponent(lines.join("\n"));
    status(t.ok);
    var w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
  });
  f.querySelector('[data-action="print"]').addEventListener("click", function () {
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var t = T[lang()];
    sheet(t);
    status(t.pr);
    window.print();
  });
  window.addEventListener("afterprint", function () { var el = document.getElementById("print-sheet"); if (el) el.innerHTML = ""; });
})();
