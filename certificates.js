/* Certificate request: builds an A4 PDF in the browser and emails it through FormSubmit.co. Nothing is stored by this site. */
(function () {
  var T = {
    ar: { dir: "rtl", school: "مؤسسة النضج للتربية والتعليم الخصوصي", city: "مراكش", title: { leaving: "طلب شهادة المغادرة", school: "طلب شهادة مدرسية" }, intro: "طلب شهادة من موقع مؤسسة النضج. أرفقت ملف PDF بهذه الرسالة.", pdfn: { leaving: "طلب-شهادة-المغادرة", school: "طلب-شهادة-مدرسية" }, rows: ["نوع الشهادة", "اسم ولي الأمر", "رقم البطاقة الوطنية (CIN)", "اسم التلميذ(ة)", "المستوى الدراسي", "القسم أو الفصل", "سبب الطلب"], types: { leaving: "شهادة المغادرة", school: "شهادة مدرسية" }, recv: "تاريخ الاستلام: ....... / ....... / .............", sign: "توقيع ولي الأمر", stamp: "ختم المؤسسة", sec1: "معلومات ولي الأمر", sec2: "معلومات التلميذ(ة)", sec3: "تفاصيل الطلب", foot: "annodje.ml@gmail.com  ·  annodje.github.io", ok: "تم تنزيل ملف PDF. أرفقه في محادثة واتساب ثم أرسل.", pr: "جارٍ فتح نافذة الطباعة…", sending: "جارٍ إرسال الطلب…", sent: "تم إرسال طلبك إلى المؤسسة بالبريد الإلكتروني ✓", fail: "تعذر إرسال الطلب. جرّب من جديد أو استعمل واتساب." },
    fr: { dir: "ltr", school: "Institution Annodje pour l'éducation et l'enseignement privé", city: "Marrakech", title: { leaving: "Demande de certificat de départ", school: "Demande de certificat de scolarité" }, intro: "Demande de certificat depuis le site de l'Institution Annodje. Je joins le PDF à ce message.", pdfn: { leaving: "demande-certificat-de-depart", school: "demande-certificat-de-scolarite" }, rows: ["Type de certificat", "Nom du tuteur", "N° de la carte nationale (CIN)", "Nom de l'élève", "Niveau scolaire", "Classe / section", "Motif de la demande"], types: { leaving: "Certificat de départ", school: "Certificat de scolarité" }, recv: "Reçu le : ....... / ....... / .............", sign: "Signature du tuteur", stamp: "Cachet de l'établissement", sec1: "Informations du tuteur", sec2: "Informations de l'élève", sec3: "Détails de la demande", foot: "annodje.ml@gmail.com  ·  annodje.github.io", ok: "PDF téléchargé. Joignez-le dans la discussion WhatsApp puis envoyez.", pr: "Ouverture de la fenêtre d'impression…", sending: "Envoi en cours…", sent: "Votre demande a été envoyée à l'établissement par e-mail ✓", fail: "L'envoi a échoué. Réessayez ou utilisez WhatsApp." },
    en: { dir: "ltr", school: "Institution Annodje for private education and teaching", city: "Marrakech", title: { leaving: "Leaving certificate request", school: "School certificate request" }, intro: "Certificate request from the Institution Annodje website. I am attaching the PDF to this message.", pdfn: { leaving: "leaving-certificate-request", school: "school-certificate-request" }, rows: ["Type of certificate", "Guardian's name", "National ID number (CIN)", "Student's name", "School level", "Class / section", "Reason for the request"], types: { leaving: "Leaving certificate", school: "School certificate" }, recv: "Received on: ....... / ....... / .............", sign: "Guardian's signature", stamp: "School stamp", sec1: "Guardian information", sec2: "Student information", sec3: "Request details", foot: "annodje.ml@gmail.com  ·  annodje.github.io", ok: "PDF downloaded. Attach it in the WhatsApp chat, then send.", pr: "Opening the print window…", sending: "Sending…", sent: "Your request was emailed to the school ✓", fail: "Sending failed. Try again or use WhatsApp." }
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
    var W = 1240, H = 1754, M = 108, rtl = t.dir === "rtl", INK = "#111", GR = "#555", LG = "#f1f1f1", LN = "#9a9a9a";
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var c = cv.getContext("2d");
    c.fillStyle = "#fff"; c.fillRect(0, 0, W, H);
    c.direction = t.dir; c.textBaseline = "middle";
    var xs = rtl ? W - M : M, al = rtl ? "right" : "left";
    function tx(str, x, y, size, weight, color, align) { c.font = weight + " " + size + "px " + FONT; c.fillStyle = color; c.textAlign = align || al; c.fillText(str, x, y); }
    function rr(x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
    function diamond(x, y, r, fill) { c.beginPath(); c.moveTo(x, y - r); c.lineTo(x + r, y); c.lineTo(x, y + r); c.lineTo(x - r, y); c.closePath(); if (fill) { c.fillStyle = INK; c.fill(); } else { c.strokeStyle = INK; c.lineWidth = 2; c.stroke(); } }
    /* double frame + corner diamonds */
    c.strokeStyle = INK; c.lineWidth = 7; c.strokeRect(34, 34, W - 68, H - 68);
    c.lineWidth = 2; c.strokeRect(54, 54, W - 108, H - 108);
    [[54, 54], [W - 54, 54], [54, H - 54], [W - 54, H - 54]].forEach(function (p) { c.fillStyle = "#fff"; c.fillRect(p[0] - 14, p[1] - 14, 28, 28); diamond(p[0], p[1], 13, true); });
    /* geometric band */
    var bandY = 96, n = 0;
    for (var bx = M; bx <= W - M; bx += 40, n++) { diamond(bx, bandY, 14, n % 2 === 0); if (n % 2 === 1) diamond(bx, bandY, 6, true); }
    c.fillStyle = INK; c.fillRect(M, bandY + 26, W - 2 * M, 3);
    /* header: logo (grayscale) + names */
    var ly = 218, lr = 72, lcx = rtl ? W - M - lr - 6 : M + lr + 6;
    c.beginPath(); c.arc(lcx, ly, lr + 8, 0, Math.PI * 2); c.lineWidth = 4; c.strokeStyle = INK; c.stroke();
    if (logo.complete && logo.naturalWidth) {
      var lc = document.createElement("canvas"); lc.width = lc.height = lr * 2; var lx = lc.getContext("2d");
      lx.drawImage(logo, 0, 0, lr * 2, lr * 2);
      try { var im = lx.getImageData(0, 0, lr * 2, lr * 2), px = im.data; for (var q = 0; q < px.length; q += 4) { var g = 0.3 * px[q] + 0.59 * px[q + 1] + 0.11 * px[q + 2]; px[q] = px[q + 1] = px[q + 2] = g; } lx.putImageData(im, 0, 0); } catch (e1) {}
      c.save(); c.beginPath(); c.arc(lcx, ly, lr, 0, Math.PI * 2); c.clip(); c.drawImage(lc, lcx - lr, ly - lr); c.restore();
    }
    var tx0 = rtl ? lcx - lr - 40 : lcx + lr + 40, tw = W - 2 * M - 2 * lr - 60;
    c.font = "700 36px " + FONT;
    var hl = wrap(c, t.school, tw), hy = ly - (hl.length * 46 + 40) / 2 + 23;
    for (var h = 0; h < hl.length; h++) tx(hl[h], tx0, hy + h * 46, 36, 700, INK);
    tx(t.city, tx0, hy + hl.length * 46 + 8, 30, 400, GR);
    c.fillStyle = INK; c.fillRect(M, 322, W - 2 * M, 3); c.fillRect(M, 331, W - 2 * M, 1);
    /* title */
    tx(t.title[type], W / 2, 400, 58, 700, INK, "center");
    c.fillStyle = INK; c.fillRect(W / 2 - 230, 456, 190, 2); c.fillRect(W / 2 + 40, 456, 190, 2); diamond(W / 2, 457, 11, true);
    /* sections and fields */
    var y = 500, IW = W - 2 * M, pad = 24;
    function section(title) {
      var sx = rtl ? W - M - 14 : M + 14;
      diamond(sx, y + 20, 11, true);
      tx(title, rtl ? sx - 26 : sx + 26, y + 20, 32, 700, INK);
      c.fillStyle = LN; c.fillRect(M, y + 50, IW, 2);
      y += 58;
    }
    function field(label, value, x, w, minH, fs) {
      fs = fs || 34;
      c.font = "400 " + fs + "px " + FONT;
      var lines = wrap(c, value, w - 2 * pad), lh = Math.round(fs * 1.3);
      var bh = Math.max(minH || 60, lines.length * lh + 28);
      tx(label, rtl ? x + w : x, y + 14, 24, 700, GR);
      rr(x, y + 34, w, bh, 10); c.fillStyle = LG; c.fill(); c.strokeStyle = LN; c.lineWidth = 2; c.stroke();
      for (var i = 0; i < lines.length; i++) tx(lines[i], rtl ? x + w - pad : x + pad, y + 34 + 14 + lh / 2 + i * lh, fs, 400, INK);
      return bh + 34 + 10;
    }
    section(t.sec1);
    y += field(t.rows[1], d[1], M, IW);
    y += field(t.rows[2], d[2], M, IW);
    section(t.sec2);
    y += field(t.rows[3], d[3], M, IW);
    var half = (IW - 24) / 2, xa = rtl ? M + half + 24 : M, xb = rtl ? M : M + half + 24;
    var h1 = field(t.rows[4], d[4], xa, half), h2 = field(t.rows[5], d[5], xb, half);
    y += Math.max(h1, h2);
    section(t.sec3);
    y += field(t.rows[0], d[0], M, IW);
    y += field(t.rows[6], d[6], M, IW, 110, d[6].length > 220 ? 28 : 32);
    /* footer: received line, signature box, stamp box */
    var fy = Math.max(y + 20, 1380);
    tx(t.recv, xs, fy, 32, 400, INK);
    var by = fy + 44, bh = Math.min(170, 1660 - by), bw = 500;
    var sx = rtl ? W - M - bw : M, tx2 = rtl ? M : W - M - bw;
    tx(t.sign, sx + bw / 2, by + 6, 28, 700, INK, "center");
    c.strokeStyle = INK; c.lineWidth = 2.5; rr(sx, by + 30, bw, bh - 30, 8); c.stroke();
    tx(t.stamp, tx2 + bw / 2, by + 6, 28, 700, INK, "center");
    c.setLineDash([10, 8]); c.strokeStyle = GR; rr(tx2, by + 30, bw, bh - 30, 8); c.stroke(); c.setLineDash([]);
    tx(t.foot, W / 2, 1688, 24, 400, GR, "center");
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
  var ENDPOINT = "https://formsubmit.co/annodje.ml@gmail.com";
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
    fd.append("attachment", blob, t.pdfn[type] + ".pdf");
    btn.disabled = true; status(t.sending);
    /* Native multipart POST (the documented way to send files). The reply is opaque (no-cors), so success means the request was sent. */
    fetch(ENDPOINT, { method: "POST", body: fd, mode: "no-cors" })
      .then(function () { status(t.sent); f.reset(); })
      .catch(function () { status(t.fail); })
      .then(function () { btn.disabled = false; });
  });
})();
