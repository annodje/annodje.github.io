(function () {
  var EMAIL = "annodje.ml@gmail.com";
  var T = {
    ar: { eyebrow: "خدمات الأسر", h1: "التسجيل وإعادة التسجيل", lead: "اختر نوع الطلب واملأ المعلومات، ثم أرسلها إلى المؤسسة وسنتواصل معك.", title: "نموذج التسجيل", all: "الحقول مطلوبة", type: "نوع الطلب", tn: "تسجيل", tr: "إعادة التسجيل", guardian: "اسم ولي الأمر", cin: "رقم البطاقة الوطنية (CIN)", phone: "رقم هاتف ولي الأمر", dob: "تاريخ الازدياد", student: "اسم التلميذ(ة)", level: "المستوى الدراسي", pick: "اختر المستوى الدراسي", section: "القسم", school: "المؤسسة الحالية", levels: ["التعليم الأولي", "التعليم الابتدائي", "التعليم الإعدادي", "التعليم الثانوي"], note: "ملاحظة: على التلميذ(ة) اجتياز الرائز (اختبار تحديد المستوى) في حالة التسجيل الجديد.", send: "إرسال الطلب", sending: "جارٍ الإرسال…", ok: "تم إرسال طلبك إلى المؤسسة ✓ سنتواصل معك قريبا.", fail: "تعذر الإرسال. حاول من جديد أو راسلنا على واتساب.", subjN: "طلب تسجيل جديد", subjR: "طلب إعادة تسجيل" },
    fr: { eyebrow: "Services aux familles", h1: "Inscription et réinscription", lead: "Choisissez le type de demande et remplissez les informations. L'établissement vous contactera.", title: "Formulaire d'inscription", all: "Tous les champs sont obligatoires", type: "Type de demande", tn: "Inscription", tr: "Réinscription", guardian: "Nom du tuteur", cin: "N° de la carte nationale (CIN)", phone: "Téléphone du tuteur", dob: "Date de naissance", student: "Nom de l'élève", level: "Niveau scolaire", pick: "Choisir le niveau", section: "Classe / section", school: "Établissement actuel", levels: ["Maternelle", "Primaire", "Collège", "Lycée"], note: "Remarque : en cas de nouvelle inscription, l'élève doit passer le test de positionnement (الرائز).", send: "Envoyer la demande", sending: "Envoi en cours…", ok: "Votre demande a été envoyée à l'établissement ✓ Nous vous contacterons bientôt.", fail: "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.", subjN: "Nouvelle demande d'inscription", subjR: "Demande de réinscription" },
    en: { eyebrow: "Family services", h1: "Registration and re-registration", lead: "Choose the request type and fill in the details. The school will contact you.", title: "Registration form", all: "All fields are required", type: "Request type", tn: "Registration", tr: "Re-registration", guardian: "Guardian's name", cin: "National ID number (CIN)", phone: "Guardian's phone number", dob: "Date of birth", student: "Student's name", level: "School level", pick: "Choose the school level", section: "Class / section", school: "Current school", levels: ["Preschool", "Primary school", "Middle school", "High school"], note: "Note: for a new registration, the student must pass the placement test (الرائز).", send: "Send the request", sending: "Sending…", ok: "Your request was sent to the school ✓ We will contact you soon.", fail: "Sending failed. Try again or message us on WhatsApp.", subjN: "New registration request", subjR: "Re-registration request" }
  };
  var F = document.getElementById("reg-form");
  if (!F) return;
  var $ = function (id) { return document.getElementById(id); };
  function lang() { try { return (window.I18N && window.I18N.lang()) || localStorage.getItem("nudge-language") || "ar"; } catch (e) { return "ar"; } }
  function render() {
    var t = T[lang()] || T.ar, L = lang();
    $("rg-eyebrow").textContent = t.eyebrow; $("rg-h1").textContent = t.h1; $("rg-lead").textContent = t.lead;
    $("rg-form-title").textContent = t.title; $("rg-allreq").textContent = t.all; $("rg-send").textContent = t.send;
    document.title = t.h1 + " | Annodje";
    F.querySelectorAll("[data-k]").forEach(function (s) { s.textContent = t[s.getAttribute("data-k")]; });
    var ty = F.elements.type; ty.options[0].textContent = t.tn; ty.options[1].textContent = t.tr;
    var lv = F.elements.level, cur = lv.selectedIndex; lv.innerHTML = "";
    var o = document.createElement("option"); o.value = ""; o.textContent = t.pick; lv.appendChild(o);
    t.levels.forEach(function (x, i) { var p = document.createElement("option"); p.value = T.ar.levels[i]; p.textContent = x; lv.appendChild(p); });
    lv.selectedIndex = cur > 0 ? cur : 0;
    toggle();
    var n = $("rg-note"); n.textContent = t.note;
    document.documentElement.dir = L === "ar" ? "rtl" : "ltr";
  }
  function toggle() {
    var isNew = F.elements.type.value === "new";
    $("rg-school-wrap").hidden = !isNew; $("rg-note").hidden = !isNew;
    F.elements.school.required = isNew;
  }
  F.elements.type.addEventListener("change", toggle);
  var q = new URLSearchParams(location.search).get("type");
  if (q === "re") F.elements.type.value = "re";
  render();
  window.addEventListener("langchange", render);
  setTimeout(render, 400);
  F.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = T[lang()] || T.ar, isNew = F.elements.type.value === "new", st = $("rg-status"), btn = F.querySelector("button");
    var d = new FormData();
    d.append("_subject", (isNew ? T.ar.subjN : T.ar.subjR) + " - " + F.elements.student.value);
    d.append("_template", "table"); d.append("_captcha", "false");
    d.append("نوع الطلب", isNew ? T.ar.tn : T.ar.tr);
    d.append("اسم ولي الأمر", F.elements.guardian.value);
    d.append("رقم البطاقة الوطنية (CIN)", F.elements.cin.value);
    d.append("رقم هاتف ولي الأمر", F.elements.phone.value);
    d.append("اسم التلميذ(ة)", F.elements.student.value);
    d.append("تاريخ الازدياد", F.elements.dob.value);
    d.append("المستوى الدراسي", F.elements.level.value);
    d.append("القسم", F.elements.section.value);
    if (isNew) { d.append("المؤسسة الحالية", F.elements.school.value); d.append("ملاحظة", "على التلميذ اجتياز الرائز"); }
    btn.disabled = true; st.textContent = t.sending;
    fetch("https://formsubmit.co/" + EMAIL, { method: "POST", body: d, mode: "no-cors" }).then(function () {
      st.textContent = t.ok; F.reset(); toggle(); btn.disabled = false; render();
    }).catch(function () { st.textContent = t.fail; btn.disabled = false; });
  });
})();
