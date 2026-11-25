const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const duration = 1100;
    const start = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased).toLocaleString('ar-SA');
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    statObserver.unobserve(counter);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach((counter) => statObserver.observe(counter));

const contactForms = [...document.querySelectorAll('form#contact-form, form#page-contact-form')];
contactForms.forEach((form) => {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'جارٍ إرسال طلبك…';
    try {
      const payload = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'تعذر إرسال الطلب.');
      status.textContent = 'وصلنا طلبك بنجاح — سنعود إليك قريبًا.';
      submitButton.innerHTML = 'تم الإرسال ✓';
      form.reset();
    } catch (error) {
      status.textContent = error.message;
      submitButton.innerHTML = 'إعادة الإرسال ←';
    } finally {
      window.setTimeout(() => { submitButton.disabled = false; }, 800);
    }
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => activeObserver.observe(section));

const languageSwitcher = document.querySelector('#language-switcher');
const translations = {
  en: {
    announcement: 'Registration is open for the next Nudge cohort <strong>— limited seats</strong>',
    'nav.home': 'Home', 'nav.about': 'About us', 'nav.values': 'Goals & values', 'nav.life': 'Student life', 'nav.programs': 'Programs', 'nav.method': 'Our method', 'nav.contact': 'Contact us',
    heroEyebrow: 'Nudge Institute for Private Education', heroTitle: 'A future built<br><em>through knowledge.</em>', heroLead: 'At Nudge, we nurture minds and ambition; private education that brings knowledge closer to the heart and gives every learner a path worthy of their potential.', heroCta: 'Explore our programs', heroStory: 'Discover our story',
    aboutTitle: 'We believe every learner is<br><em>a story worth telling.</em>', campusTitle: 'This is where<br><em>the beautiful scene begins.</em>', goalsTitle: 'We teach today,<br><em>to shape a brighter tomorrow.</em>', lifeTitle: 'No two days here<br><em>are ever the same.</em>', programsTitle: 'Learn what<br><em>moves you.</em>', methodTitle: 'Deeper understanding.<br><em>Smarter steps.</em>', voicesTitle: 'Impact<br><em>is heard.</em>', contactTitle: 'Ready to discover<br><em>the space made for you?</em>',
    contactHeroTitle: 'Have a question?<br><em>Let’s talk.</em>', contactHeroLead: 'Whether you are a student looking for the right path or a parent who wants to see their child grow with confidence — the Nudge team is here to listen.', contactFormTitle: 'Message form', mapTitle: 'Come and <em>meet us.</em>', sitemapTitle: 'Everything you need<br><em>in one place.</em>'
  },
  fr: {
    announcement: 'Les inscriptions sont ouvertes pour la prochaine session Nudge <strong>— places limitées</strong>',
    'nav.home': 'Accueil', 'nav.about': 'À propos', 'nav.values': 'Objectifs & valeurs', 'nav.life': 'Vie étudiante', 'nav.programs': 'Programmes', 'nav.method': 'Notre méthode', 'nav.contact': 'Contactez-nous',
    heroEyebrow: 'Institut Nudge pour l’enseignement privé', heroTitle: 'Un avenir bâti<br><em>par le savoir.</em>', heroLead: 'Chez Nudge, nous cultivons les esprits et les ambitions : un enseignement privé qui rapproche le savoir du cœur et offre à chaque apprenant un chemin à la hauteur de son potentiel.', heroCta: 'Découvrir nos programmes', heroStory: 'Découvrir notre histoire',
    aboutTitle: 'Nous croyons que chaque apprenant est<br><em>une histoire à raconter.</em>', campusTitle: 'C’est ici que<br><em>la belle aventure commence.</em>', goalsTitle: 'Nous enseignons aujourd’hui<br><em>pour bâtir demain.</em>', lifeTitle: 'Ici, chaque jour<br><em>est une nouvelle histoire.</em>', programsTitle: 'Apprenez ce qui<br><em>vous inspire.</em>', methodTitle: 'Comprendre mieux.<br><em>Avancer plus loin.</em>', voicesTitle: 'L’impact<br><em>s’entend.</em>', contactTitle: 'Prêt à découvrir<br><em>l’espace qui vous ressemble ?</em>',
    contactHeroTitle: 'Une question ?<br><em>Parlons-en.</em>', contactHeroLead: 'Que vous soyez un élève à la recherche du bon parcours ou un parent qui souhaite voir son enfant grandir avec confiance, l’équipe Nudge est à votre écoute.', contactFormTitle: 'Formulaire de message', mapTitle: 'Venez <em>nous rencontrer.</em>', sitemapTitle: 'Tout ce dont vous avez besoin<br><em>au même endroit.</em>'
  }
};

function setText(selector, html) {
  const element = document.querySelector(selector);
  if (element && html) element.innerHTML = html;
}

function applyLanguage(language) {
  const lang = translations[language] ? language : 'ar';
  const isArabic = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-ltr', !isArabic);
  if (languageSwitcher) languageSwitcher.value = lang;
  localStorage.setItem('nudge-language', lang);
  if (isArabic) return window.location.reload();
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((element) => { if (t[element.dataset.i18n]) element.innerHTML = t[element.dataset.i18n]; });
  setText('.hero .eyebrow', `<span class="eyebrow-line"></span> ${t.heroEyebrow}`);
  setText('#hero-title', t.heroTitle); setText('.hero__lead', t.heroLead);
  setText('.hero__actions .button', `${t.heroCta} <span aria-hidden="true">←</span>`); setText('.hero__actions .text-link', `<span class="play-mark" aria-hidden="true">↗</span> ${t.heroStory}`);
  setText('#about-title', t.aboutTitle); setText('#campus-title', t.campusTitle); setText('#goals-values-title', t.goalsTitle); setText('#student-life-title', t.lifeTitle); setText('#programs-title', t.programsTitle); setText('#method-title', t.methodTitle); setText('#voices-title', t.voicesTitle); setText('#contact-title', t.contactTitle);
  setText('.contact-hero h1', t.contactHeroTitle); setText('.contact-hero__copy > p', t.contactHeroLead); setText('#contact-page-title', t.contactFormTitle); setText('#map-title', t.mapTitle); setText('#sitemap-title', t.sitemapTitle);
  document.title = lang === 'en' ? 'Contact | Nudge Institute' : lang === 'fr' ? 'Contact | Institut Nudge' : document.title;
}

languageSwitcher?.addEventListener('change', (event) => applyLanguage(event.target.value));
const savedLanguage = localStorage.getItem('nudge-language');
if (savedLanguage && savedLanguage !== 'ar') applyLanguage(savedLanguage);


let managedContent = null;
function applyManagedContent() {
  if (!managedContent) return;
  const phone = managedContent.phone;
  const email = managedContent.email;
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => { link.href = `tel:+212${phone.replace(/^0/, '')}`; link.textContent = phone; });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { link.href = `mailto:${email}`; link.textContent = email; });
  if ((document.documentElement.lang || 'ar') === 'ar') {
    const announcement = document.querySelector('[data-i18n="announcement"]');
    if (announcement) announcement.innerHTML = managedContent.announcement_ar;
    setText('.hero__lead', managedContent.hero_lead_ar);
  }
}
fetch('/api/site-content').then((response) => response.ok ? response.json() : null).then((data) => {
  if (data?.settings) { managedContent = data.settings; applyManagedContent(); }
}).catch(() => {});
