const loginView = document.querySelector('#login-view');
const dashboardView = document.querySelector('#dashboard-view');
const loginForm = document.querySelector('#login-form');
const loginStatus = document.querySelector('#login-status');
const contentForm = document.querySelector('#content-form');
const contentStatus = document.querySelector('#content-status');
const messagesList = document.querySelector('#messages-list');
const logoutButton = document.querySelector('#logout-button');
const refreshMessagesButton = document.querySelector('#refresh-messages');

function showStatus(element, message, success = false) {
  element.textContent = message;
  element.classList.toggle('success', success);
}

async function api(url, options = {}) {
  const response = await fetch(url, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'تعذر تنفيذ العملية.');
  return data;
}

function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  loadContent();
  loadMessages();
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
}

async function loadContent() {
  try {
    const { settings } = await api('/api/site-content');
    for (const [key, value] of Object.entries(settings)) {
      const field = contentForm.elements.namedItem(key);
      if (field) field.value = value;
    }
  } catch (error) {
    showStatus(contentStatus, error.message);
  }
}

function formatDate(value) {
  try { return new Intl.DateTimeFormat('ar-MA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); } catch { return value; }
}

function messageCard(message) {
  const card = document.createElement('article');
  card.className = `message-card ${message.status === 'new' ? 'is-new' : ''}`;
  const top = document.createElement('div'); top.className = 'message-top';
  const name = document.createElement('strong'); name.textContent = message.name;
  const time = document.createElement('time'); time.textContent = formatDate(message.created_at);
  top.append(name, time); card.append(top);
  const meta = document.createElement('div'); meta.className = 'message-meta';
  const email = document.createElement('span'); email.textContent = message.email;
  const phone = document.createElement('span'); phone.textContent = message.phone;
  const subject = document.createElement('span'); subject.textContent = message.subject;
  meta.append(email, phone, subject); card.append(meta);
  const text = document.createElement('p'); text.textContent = message.message; card.append(text);
  if (message.status === 'new') {
    const button = document.createElement('button'); button.className = 'read-button'; button.type = 'button'; button.textContent = 'تحديد كمقروء';
    button.addEventListener('click', async () => { button.disabled = true; await api(`/api/messages/${message.id}`, { method: 'PUT', body: '{}' }); await loadMessages(); });
    card.append(button);
  }
  return card;
}

async function loadMessages() {
  messagesList.innerHTML = '<p class="muted">جارٍ تحميل الرسائل…</p>';
  try {
    const { messages } = await api('/api/messages');
    messagesList.replaceChildren();
    if (!messages.length) { messagesList.innerHTML = '<p class="empty-state">لا توجد رسائل حتى الآن.</p>'; return; }
    messages.forEach((message) => messagesList.append(messageCard(message)));
  } catch (error) {
    messagesList.innerHTML = `<p class="empty-state">${error.message}</p>`;
    if (error.message === 'unauthorized') showLogin();
  }
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = loginForm.querySelector('button'); button.disabled = true;
  showStatus(loginStatus, 'جارٍ التحقق…');
  try {
    const payload = Object.fromEntries(new FormData(loginForm));
    await api('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    showStatus(loginStatus, '', true); showDashboard();
  } catch (error) {
    showStatus(loginStatus, error.message);
  } finally { button.disabled = false; }
});

contentForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = contentForm.querySelector('button'); button.disabled = true;
  showStatus(contentStatus, 'جارٍ حفظ التعديلات…');
  try {
    const payload = Object.fromEntries(new FormData(contentForm));
    await api('/api/site-content', { method: 'PUT', body: JSON.stringify(payload) });
    showStatus(contentStatus, 'تم حفظ التعديلات بنجاح.', true);
  } catch (error) { showStatus(contentStatus, error.message); }
  finally { button.disabled = false; }
});

logoutButton?.addEventListener('click', async () => { await api('/api/auth/logout', { method: 'POST' }); showLogin(); });
refreshMessagesButton?.addEventListener('click', loadMessages);

api('/api/auth/me').then((data) => data.authenticated ? showDashboard() : showLogin()).catch(showLogin);
