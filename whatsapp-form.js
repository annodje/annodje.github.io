/* Contact forms open WhatsApp with a ready message (replaces the old /api/messages call). */
(function () {
  var NUM = "212671979707";
  var L = {
    ar: { hello: "السلام عليكم، أتواصل معكم من موقع مؤسسة النضج.", name: "الاسم", phone: "الهاتف", email: "البريد الإلكتروني", level: "المستوى", subject: "الموضوع", msg: "الرسالة", ok: "جارٍ فتح واتساب لإرسال رسالتك…", btn: "فتح واتساب" },
    fr: { hello: "Bonjour, je vous contacte depuis le site de l'Institution Annodje.", name: "Nom", phone: "Téléphone", email: "E-mail", level: "Niveau", subject: "Sujet", msg: "Message", ok: "Ouverture de WhatsApp pour envoyer votre message…", btn: "Ouvrir WhatsApp" },
    en: { hello: "Hello, I am contacting you from the Institution Annodje website.", name: "Name", phone: "Phone", email: "Email", level: "Level", subject: "Subject", msg: "Message", ok: "Opening WhatsApp to send your message…", btn: "Open WhatsApp" }
  };
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f || (f.id !== "contact-form" && f.id !== "page-contact-form")) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (f.checkValidity && !f.checkValidity()) { if (f.reportValidity) f.reportValidity(); return; }
    var lang = (window.I18N && window.I18N.lang && window.I18N.lang()) || "ar";
    var t = L[lang] || L.ar;
    function val(n) { var el = f.elements[n]; return el ? (el.value || "").trim() : ""; }
    function sel(n) { var el = f.elements[n]; if (!el || el.selectedIndex < 1) return ""; return (el.options[el.selectedIndex].text || "").trim(); }
    var lines = [t.hello, ""];
    if (val("name")) lines.push(t.name + ": " + val("name"));
    if (val("phone")) lines.push(t.phone + ": " + val("phone"));
    if (val("email")) lines.push(t.email + ": " + val("email"));
    var level = sel("level") || sel("interest");
    if (level) lines.push(t.level + ": " + level);
    if (f.elements["subject"]) lines.push(t.subject + ": " + (f.elements["subject"].options[f.elements["subject"].selectedIndex].text || "").trim());
    if (val("message")) lines.push(t.msg + ": " + val("message"));
    var url = "https://wa.me/" + NUM + "?text=" + encodeURIComponent(lines.join("\n"));
    var st = f.querySelector(".form-status");
    if (st) { st.textContent = t.ok; }
    var w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
  }, true);
})();
