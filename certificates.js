/* Certificate request: builds an A4 PDF in the browser and emails it through FormSubmit.co. Nothing is stored by this site. */
(function () {
  var T = {
    ar: { dir: "rtl", school: "مؤسسة النضج للتربية والتعليم الخصوصي", city: "مراكش", title: { leaving: "طلب شهادة المغادرة", school: "طلب شهادة مدرسية" }, intro: "طلب شهادة من موقع مؤسسة النضج. أرفقت ملف PDF بهذه الرسالة.", pdfn: "طلب-شهادة", rows: ["نوع الشهادة", "اسم ولي الأمر", "رقم البطاقة الوطنية (CIN)", "اسم التلميذ(ة)", "المستوى الدراسي", "القسم أو الفصل", "سبب الطلب"], types: { leaving: "شهادة المغادرة", school: "شهادة مدرسية" }, recv: "تاريخ الاستلام: ....... / ....... / .............", sign: "توقيع ولي الأمر", ok: "تم تنزيل ملف PDF. أرفقه في محادثة واتساب ثم أرسل.", pr: "جارٍ فتح نافذة الطباعة…", sending: "جارٍ إرسال الطلب…", sent: "تم إرسال طلبك إلى المؤسسة بالبريد الإلكتروني ✓", fail: "تعذر إرسال الطلب. جرّب من جديد أو استعمل واتساب." },
    fr: { dir: "ltr", school: "Institution Annodje pour l'éducation et l'enseignement privé", city: "Marrakech", title: { leaving: "Demande de certificat de départ", school: "Demande de certificat de scolarité" }, intro: "Demande de certificat depuis le site de l'Institution Annodje. Je joins le PDF à ce message.", pdfn: "demande-certificat", rows: ["Type de certificat", "Nom du tuteur", "N° de la carte nationale (CIN)", "Nom de l'élève", "Niveau scolaire", "Classe / section", "Motif de la demande"], types: { leaving: "Certificat de départ", school: "Certificat de scolarité" }, recv: "Reçu le : ....... / ....... / .............", sign: "Signature du tuteur", ok: "PDF téléchargé. Joignez-le dans la discussion WhatsApp puis envoyez.", pr: "Ouverture de la fenêtre d'impression…", sending: "Envoi en cours…", sent: "Votre demande a été envoyée à l'établissement par e-mail ✓", fail: "L'envoi a échoué. Réessayez ou utilisez WhatsApp." },
    en: { dir: "ltr", school: "Institution Annodje for private education and teaching", city: "Marrakech", title: { leaving: "Leaving certificate request", school: "School certificate request" }, intro: "Certificate request from the Institution Annodje website. I am attaching the PDF to this message.", pdfn: "certificate-request", rows: ["Type of certificate", "Guardian's name", "National ID number (CIN)", "Student's name", "School level", "Class / section", "Reason for the request"], types: { leaving: "Leaving certificate", school: "School certificate" }, recv: "Received on: ....... / ....... / .............", sign: "Guardian's signature", ok: "PDF downloaded. Attach it in the WhatsApp chat, then send.", pr: "Opening the print window…", sending: "Sending…", sent: "Your request was emailed to the school ✓", fail: "Sending failed. Try again or use WhatsApp." }
  };
  var f = document.getElementById("cert-form");
  if (!f) return;
  function lang() { var l = (window.I18N && window.I18N.lang && window.I18N.lang()) || "ar"; return T[l] ? l : "ar"; }
  function data(t) {
    var type = f.elements.type.value;
    var lv = f.elements.level;
    return [t.types[type], f.elements.guardian.value.trim(), f.elements.cin.value.trim(), f.elements.student.value.trim(), lv.options[lv.selectedIndex].text.trim(), f.elements.section.value.trim(), f.elements.reason.value.trim()];
  }
  var logo = new Image(); logo.src = "/1-logo.jpg?v=1";
  try { if (document.fonts && document.fonts.load) { document.fonts.load('700 30px "IBM Plex Sans Arabic"'); document.fonts.load('400 30px "IBM Plex Sans Arabic"'); } } catch (x) {}
  var FONT = '"IBM Plex Sans Arabic", Tajawal, Arial, sans-serif';
  function wrap(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var tryL = cur ? cur + " " + words[i] : words[i];
      if (ctx.measureText(tryL).width > maxW && cur) { lines.push(cur); cur = words[i]; } else cur = tryL;
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function drawSheet(t, d, type) {
    var W = 1240, H = 1754, M = 100, rtl = t.dir === "rtl";
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var c = cv.getContext("2d");
    c.fillStyle = "#fff"; c.fillRect(0, 0, W, H);
    c.direction = t.dir; c.textBaseline = "middle";
    var xs = rtl ? W - M : M, al = rtl ? "right" : "left";
    function tx(str, x, y, size, weight, color, align) { c.font = weight + " " + size + "px " + FONT; c.fillStyle = color; c.textAlign = align || al; c.fillText(str, x, y); }
    var ly = 160;
    if (logo.complete && logo.naturalWidth) {
      var lx = rtl ? W - M - 140 : M;
      c.save(); c.beginPath(); c.arc(lx + 70, ly, 70, 0, Math.PI * 2); c.clip(); c.drawImage(logo, lx, ly - 70, 140, 140); c.restore();
    }
    var tx0 = rtl ? W - M - 140 - 30 : M + 140 + 30;
    c.font = "700 34px " + FONT;
    var hl = wrap(c, t.school, W - 2 * M - 170), hy = ly - (hl.length * 44 + 40) / 2 + 22;
    for (var h = 0; h < hl.length; h++) tx(hl[h], tx0, hy + h * 44, 34, 700, "#16324f");
    tx(t.city, tx0, hy + hl.length * 44 + 10, 30, 400, "#444");
    c.fillStyle = "#16324f"; c.fillRect(M, 270, W - 2 * M, 4);
    tx(t.title[type], W / 2, 380, 58, 700, "#16324f", "center");
    var y = 470, labW = Math.round((W - 2 * M) * 0.36), valW = W - 2 * M - labW, pad = 22, lh = 46;
    c.strokeStyle = "#666"; c.lineWidth = 2;
    for (var i = 0; i < t.rows.length; i++) {
      c.font = "400 34px " + FONT;
      var lines = wrap(c, d[i], valW - 2 * pad);
      c.font = "700 32px " + FONT;
      var ll = wrap(c, t.rows[i], labW - 2 * pad);
      var rh = Math.max(96, lines.length * lh + 2 * pad, ll.length * lh + 2 * pad);
      if (i === t.rows.length - 1) rh = Math.max(rh, 220);
      var labX = rtl ? W - M - labW : M, valX = rtl ? M : M + labW;
      c.fillStyle = "#eeeeee"; c.fillRect(labX, y, labW, rh);
      c.strokeRect(labX, y, labW, rh); c.strokeRect(valX, y, valW, rh);
      for (var q = 0; q < ll.length; q++) tx(ll[q], rtl ? labX + labW - pad : labX + pad, y + rh / 2 + (q - (ll.length - 1) / 2) * lh, 32, 700, "#111");
      for (var j = 0; j < lines.length; j++) tx(lines[j], rtl ? valX + valW - pad : valX + pad, y + pad + lh / 2 + j * lh + (rh - 2 * pad - lines.length * lh) / 2 * (i === t.rows.length - 1 ? 0 : 1), 34, 400, "#111");
      y += rh;
    }
    y += 70;
    tx(t.recv, xs, y, 34, 400, "#111");
    y += 110;
    var bw = 520, bx = rtl ? M : W - M - bw;
    tx(t.sign, bx + bw / 2, y, 32, 700, "#111", "center");
    c.strokeRect(bx, y + 40, bw, 200);
    return cv;
  }
  function makePdf(cv) {
    var b64 = cv.toDataURL("image/jpeg", 0.92).split(",")[1], bin = atob(b64), jpg = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) jpg[i] = bin.charCodeAt(i);
    var enc = function (s) { var a = new Uint8Array(s.length); for (var k = 0; k < s.length; k++) a[k] = s.charCodeAt(k) & 255; return a; };
    var parts = [], off = 0, xref = [];
    function push(u8) { parts.push(u8); off += u8.length; }
    function obj(n, head, stream) { xref[n] = off; push(enc(n + " 0 obj\n" + head)); if (stream) { push(enc("\nstream\n")); push(stream); push(enc("\nendstream")); } push(enc("\nendobj\n")); }
    push(enc("%PDF-1.4\n"));
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
    obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    obj(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
    obj(4, "<< /Type /XObject /Subtype /Image /Width " + cv.width + " /Height " + cv.height + " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + jpg.length + " >>", jpg);
    var cs = enc("q 595 0 0 842 0 0 cm /Im0 Do Q");
    obj(5, "<< /Length " + cs.length + " >>", cs);
    var xo = off, x = "xref\n0 6\n0000000000 65535 f \n";
    for (var n = 1; n <= 5; n++) x += ("0000000000" + xref[n]).slice(-10) + " 00000 n \n";
    push(enc(x + "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xo + "\n%%EOF"));
    return new Blob(parts, { type: "application/pdf" });
  }
  function status(msg) { var s = document.getElementById("cert-status"); if (s) s.textContent = msg; }
  var ENDPOINT = "https://formsubmit.co/ajax/annodje.ml@gmail.com";
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = T[lang()], type = f.elements.type.value, d = data(t), btn = f.querySelector('button[type="submit"]');
    var blob;
    try { blob = makePdf(drawSheet(t, d, type)); } catch (err) { status(t.fail); return; }
    var fd = new FormData();
    fd.append("_subject", t.title[type] + " - " + d[3]);
    fd.append("_template", "table");
    fd.append("_captcha", "false");
    for (var i = 0; i < d.length; i++) fd.append(t.rows[i], d[i]);
    fd.append("attachment", blob, t.pdfn + ".pdf");
    btn.disabled = true; status(t.sending);
    fetch(ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (r) { if (r.ok && String(r.j.success) === "true") { status(t.sent); f.reset(); } else { status(t.fail); } })
      .catch(function () { status(t.fail); })
      .then(function () { btn.disabled = false; });
  });
})();
