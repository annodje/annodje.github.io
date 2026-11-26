(function () {
  var EMAIL = "annodje.ml@gmail.com";
  var T = {
    ar: { dir:"rtl",sname:"مؤسسة النضج للتربية والتعليم الخصوصي",city:"مراكش",ptitle:{new:"طلب التسجيل",re:"طلب إعادة التسجيل"},pdfn:{new:"طلب-التسجيل",re:"طلب-إعادة-التسجيل"},sec1:"معلومات ولي الأمر",sec2:"معلومات التلميذ(ة)",recv:"تاريخ الاستلام: ....... / ....... / .............",sign:"توقيع ولي الأمر",stamp:"ختم المؤسسة",foot:"annodje.ml@gmail.com  ·  annodje.github.io",yesno:["نعم","لا"], eyebrow: "خدمات الأسر", h1: "التسجيل وإعادة التسجيل", lead: "اختر نوع الطلب واملأ المعلومات، ثم أرسلها إلى المؤسسة وسنتواصل معك.", title: "نموذج التسجيل", all: "الحقول مطلوبة", type: "نوع الطلب", tn: "تسجيل", tr: "إعادة التسجيل", guardian: "اسم ولي الأمر", cin: "رقم البطاقة الوطنية (CIN)", phone: "رقم هاتف ولي الأمر", dob: "تاريخ الازدياد", address: "العنوان", transport: "أرغب في خدمة النقل المدرسي", yes: "نعم", no: "لا", student: "اسم التلميذ(ة)", level: "المستوى الدراسي", pick: "اختر المستوى الدراسي", section: "القسم", school: "المؤسسة الحالية", levels: ["التعليم الأولي", "التعليم الابتدائي", "التعليم الإعدادي", "التعليم الثانوي"], note: "ملاحظة: على التلميذ(ة) اجتياز الرائز (اختبار تحديد المستوى) في حالة التسجيل الجديد.", send: "إرسال الطلب", sending: "جارٍ الإرسال…", ok: "تم إرسال طلبك إلى المؤسسة ✓ سنتواصل معك قريبا.", fail: "تعذر الإرسال. حاول من جديد أو راسلنا على واتساب.", subjN: "طلب تسجيل جديد", subjR: "طلب إعادة تسجيل" },
    fr: { dir:"ltr",sname:"Institution Annodje pour l'éducation et l'enseignement privé",city:"Marrakech",ptitle:{new:"Demande d'inscription",re:"Demande de réinscription"},pdfn:{new:"demande-inscription",re:"demande-reinscription"},sec1:"Informations du tuteur",sec2:"Informations de l'élève",recv:"Reçu le : ....... / ....... / .............",sign:"Signature du tuteur",stamp:"Cachet de l'établissement",foot:"annodje.ml@gmail.com  ·  annodje.github.io",yesno:["Oui","Non"], eyebrow: "Services aux familles", h1: "Inscription et réinscription", lead: "Choisissez le type de demande et remplissez les informations. L'établissement vous contactera.", title: "Formulaire d'inscription", all: "Tous les champs sont obligatoires", type: "Type de demande", tn: "Inscription", tr: "Réinscription", guardian: "Nom du tuteur", cin: "N° de la carte nationale (CIN)", phone: "Téléphone du tuteur", dob: "Date de naissance", address: "Adresse", transport: "Je souhaite le transport scolaire", yes: "Oui", no: "Non", student: "Nom de l'élève", level: "Niveau scolaire", pick: "Choisir le niveau", section: "Classe / section", school: "Établissement actuel", levels: ["Maternelle", "Primaire", "Collège", "Lycée"], note: "Remarque : en cas de nouvelle inscription, l'élève doit passer le test de positionnement (الرائز).", send: "Envoyer la demande", sending: "Envoi en cours…", ok: "Votre demande a été envoyée à l'établissement ✓ Nous vous contacterons bientôt.", fail: "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.", subjN: "Nouvelle demande d'inscription", subjR: "Demande de réinscription" },
    en: { dir:"ltr",sname:"Institution Annodje for private education and teaching",city:"Marrakech",ptitle:{new:"Registration request",re:"Re-registration request"},pdfn:{new:"registration-request",re:"re-registration-request"},sec1:"Guardian information",sec2:"Student information",recv:"Received on: ....... / ....... / .............",sign:"Guardian's signature",stamp:"School stamp",foot:"annodje.ml@gmail.com  ·  annodje.github.io",yesno:["Yes","No"], eyebrow: "Family services", h1: "Registration and re-registration", lead: "Choose the request type and fill in the details. The school will contact you.", title: "Registration form", all: "All fields are required", type: "Request type", tn: "Registration", tr: "Re-registration", guardian: "Guardian's name", cin: "National ID number (CIN)", phone: "Guardian's phone number", dob: "Date of birth", address: "Address", transport: "I would like school transport", yes: "Yes", no: "No", student: "Student's name", level: "School level", pick: "Choose the school level", section: "Class / section", school: "Current school", levels: ["Preschool", "Primary school", "Middle school", "High school"], note: "Note: for a new registration, the student must pass the placement test (الرائز).", send: "Send the request", sending: "Sending…", ok: "Your request was sent to the school ✓ We will contact you soon.", fail: "Sending failed. Try again or message us on WhatsApp.", subjN: "New registration request", subjR: "Re-registration request" }
  };
  var F = document.getElementById("reg-form");
  if (!F) return;
  var $ = function (id) { return document.getElementById(id); };
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
    var hl = wrap(c, t.sname, tw), hy = ly - (hl.length * 46 + 40) / 2 + 23;
    for (var h = 0; h < hl.length; h++) tx(hl[h], tx0, hy + h * 46, 36, 700, INK);
    tx(t.city, tx0, hy + hl.length * 46 + 8, 30, 400, GR);
    c.fillStyle = INK; c.fillRect(M, 322, W - 2 * M, 3); c.fillRect(M, 331, W - 2 * M, 1);
    /* title */
    tx(t.ptitle[type], W / 2, 400, 58, 700, INK, "center");
    c.fillStyle = INK; c.fillRect(W / 2 - 230, 456, 190, 2); c.fillRect(W / 2 + 40, 456, 190, 2); diamond(W / 2, 457, 11, true);
    var y = 490, IW = W - 2 * M, pad = 24;
    function section(title) {
      var sx = rtl ? W - M - 14 : M + 14;
      diamond(sx, y + 20, 11, true);
      tx(title, rtl ? sx - 26 : sx + 26, y + 20, 32, 700, INK);
      c.fillStyle = LN; c.fillRect(M, y + 50, IW, 2);
      y += 58;
    }
    function field(label, value, x, w, fs) {
      fs = fs || 32;
      c.font = "400 " + fs + "px " + FONT;
      var lines = wrap(c, value, w - 2 * pad), lh = Math.round(fs * 1.3);
      var bh = Math.max(56, lines.length * lh + 24);
      tx(label, rtl ? x + w : x, y + 14, 24, 700, GR);
      rr(x, y + 34, w, bh, 10); c.fillStyle = LG; c.fill(); c.strokeStyle = LN; c.lineWidth = 2; c.stroke();
      for (var i = 0; i < lines.length; i++) tx(lines[i], rtl ? x + w - pad : x + pad, y + 34 + 12 + lh / 2 + i * lh, fs, 400, INK);
      return bh + 34 + 10;
    }
    var half = (IW - 24) / 2, xa = rtl ? M + half + 24 : M, xb = rtl ? M : M + half + 24;
    function pair(l1, v1, l2, v2) { var h1 = field(l1, v1, xa, half), h2 = field(l2, v2, xb, half); y += Math.max(h1, h2); }
    section(t.sec1);
    y += field(t.guardian, d.guardian, M, IW);
    pair(t.cin, d.cin, t.phone, d.phone);
    section(t.sec2);
    y += field(t.student, d.student, M, IW);
    pair(t.dob, d.dob, t.level, d.level);
    pair(t.section, d.section, t.transport, d.transport);
    y += field(t.address, d.address, M, IW);
    if (type === "new") {
      y += field(t.school, d.school, M, IW);
      c.font = "600 28px " + FONT;
      var nl = wrap(c, t.note, IW - 60), nh = nl.length * 40 + 24;
      rr(M, y + 4, IW, nh, 10); c.strokeStyle = INK; c.lineWidth = 2.5; c.stroke();
      for (var q = 0; q < nl.length; q++) tx(nl[q], rtl ? W - M - 30 : M + 30, y + 4 + 12 + 20 + q * 40, 28, 600, INK);
      y += nh + 10;
    }
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

  function dataObj(t, type) {
    var lv = F.elements.level, yn = t.yesno;
    return { guardian: F.elements.guardian.value.trim(), cin: F.elements.cin.value.trim(), phone: F.elements.phone.value.trim(), student: F.elements.student.value.trim(), dob: F.elements.dob.value, level: lv.options[lv.selectedIndex].text.trim(), section: F.elements.section.value.trim(), address: F.elements.address.value.trim(), transport: F.elements.transport.checked ? yn[0] : yn[1], school: F.elements.school.value.trim() };
  }

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
    d.append("العنوان", F.elements.address.value);
    d.append("النقل المدرسي", F.elements.transport.checked ? "نعم" : "لا");
    if (isNew) { d.append("المؤسسة الحالية", F.elements.school.value); d.append("ملاحظة", "على التلميذ اجتياز الرائز"); }
    var type = isNew ? "new" : "re", blob;
    try { blob = makePdf(drawSheet(t, dataObj(t, type), type)); } catch (err) { st.textContent = t.fail; return; }
    d.append("attachment", blob, t.pdfn[type] + ".pdf");
    btn.disabled = true; st.textContent = t.sending;
    fetch("https://formsubmit.co/" + EMAIL, { method: "POST", body: d, mode: "no-cors" }).then(function () {
      st.textContent = t.ok; F.reset(); toggle(); btn.disabled = false; render();
    }).catch(function () { st.textContent = t.fail; btn.disabled = false; });
  });
})();
