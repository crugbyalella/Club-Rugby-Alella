const CLUB_DATA = {
  nom: 'Club Rugby Alella',
  email: 'info@clubrugbyalella.cat',
  telefon: '+34 600 123 456',
  adreca: "Camp Municipal d'Alella, Alella",
  horariGeneral: 'Dilluns a divendres, 17.30 h – 22.00 h',
};

const PUBLIC_NAV_LINKS = [
  ['Inici', '/#inici'],
  ['Club', '/#club'],
  ['Equips', '/#equips'],
  ['Escoleta', '/#escoleta'],
  ['Contacte', '/#contacte'],
];

const PRIVATE_NAV_LINKS = [
  ['Panell', '/area-privada/'],
  ['Famílies', '/area-privada/families/'],
  ['Staff', '/area-privada/staff/'],
];

function isPrivatePath(pathname) {
  return pathname.startsWith('/area-privada/');
}

function navLinkItems(links) {
  return links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
}

function setActiveLinks(scope) {
  const path = window.location.pathname;
  scope.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const clean = href.split('#')[0] || '/';
    if ((clean === '/' && path === '/') || (clean !== '/' && path.startsWith(clean))) {
      a.classList.add('active');
    }
  });
}

function openDrawer(id) {
  document.body.setAttribute('data-drawer-open', 'true');
  document.querySelector(`#${id}`)?.removeAttribute('hidden');
}

function closeDrawer(id) {
  document.body.setAttribute('data-drawer-open', 'false');
  document.querySelector(`#${id}`)?.setAttribute('hidden', '');
}

function renderHeader() {
  const mount = document.querySelector('[data-site-header]');
  if (!mount) return;

  const privateShell = isPrivatePath(window.location.pathname);
  document.body.dataset.shell = privateShell ? 'private' : 'public';
  document.querySelector('main')?.classList.toggle('private-main', privateShell);

  if (privateShell) {
    mount.innerHTML = `
      <header class="private-navbar">
        <div class="private-nav-inner">
          <a class="private-brand" href="/area-privada/">🏉 CRA privada</a>
          <nav class="navbar-links" aria-label="Navegació privada">${navLinkItems(PRIVATE_NAV_LINKS)}</nav>
          <div class="private-user">
            <span class="badge info">Staff</span>
            <a class="btn btn-sm btn-secondary" href="/">Sortir</a>
          </div>
          <button class="nav-toggle" type="button" data-open-drawer="private-drawer">Menú</button>
        </div>
      </header>
      <div class="drawer-overlay" data-close-drawer="private-drawer"></div>
      <aside class="drawer" id="private-drawer" hidden>
        <div class="drawer-head"><strong>Navegació privada</strong><button class="btn btn-sm btn-ghost" data-close-drawer="private-drawer">Tancar</button></div>
        <nav class="drawer-links">${navLinkItems(PRIVATE_NAV_LINKS)}<a href="/" class="btn btn-secondary">Sortir de l'àrea privada</a></nav>
      </aside>
    `;
  } else {
    mount.innerHTML = `
      <header class="pub-navbar" id="public-navbar">
        <div class="pub-nav-inner">
          <a class="brand" href="/" aria-label="Club Rugby Alella">
            <span aria-hidden="true">🏉</span>
            <strong>Club Rugby Alella</strong>
          </a>
          <nav class="pub-nav-links" aria-label="Navegació pública">${navLinkItems(PUBLIC_NAV_LINKS)}</nav>
          <a class="pub-nav-cta" href="/area-privada/">Àrea privada</a>
          <button class="nav-toggle" type="button" data-open-drawer="public-drawer">Menú</button>
        </div>
      </header>
      <div class="drawer-overlay" data-close-drawer="public-drawer"></div>
      <aside class="drawer" id="public-drawer" hidden>
        <div class="drawer-head"><strong>Menú</strong><button class="btn btn-sm btn-ghost" data-close-drawer="public-drawer">Tancar</button></div>
        <nav class="drawer-links">${navLinkItems(PUBLIC_NAV_LINKS)}<a class="btn btn-primary" href="/area-privada/">Accés privat</a></nav>
      </aside>
    `;

    const navbar = mount.querySelector('#public-navbar');
    const onScroll = () => {
      if (!navbar) return;
      navbar.classList.toggle('is-scrolled', window.scrollY > 14 || window.location.pathname !== '/');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  setActiveLinks(mount);

  mount.querySelectorAll('[data-open-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => openDrawer(btn.getAttribute('data-open-drawer')));
  });
  mount.querySelectorAll('[data-close-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => closeDrawer(btn.getAttribute('data-close-drawer')));
  });
}

function renderFooter() {
  const mount = document.querySelector('[data-site-footer]');
  if (!mount) return;
  const isPrivate = isPrivatePath(window.location.pathname);
  if (isPrivate) {
    mount.innerHTML = '';
    return;
  }

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="footer-grid">
        <section>
          <h3 style="color:#f4c430">${CLUB_DATA.nom}</h3>
          <p class="small">Projecte esportiu i comunitari amb base al Maresme. Web pública i accés privat unificats amb prioritat mobile first.</p>
          <p class="small">${CLUB_DATA.adreca}<br>${CLUB_DATA.telefon}<br><a href="mailto:${CLUB_DATA.email}">${CLUB_DATA.email}</a></p>
        </section>
        <section>
          <h3 style="color:#f4c430">Navegació</h3>
          <p class="small"><a href="/#club">El club</a><br><a href="/#equips">Equips</a><br><a href="/#escoleta">Escoleta</a><br><a href="/socis/">Socis</a><br><a href="/sponsors/">Sponsors</a></p>
        </section>
        <section>
          <h3 style="color:#f4c430">Legal</h3>
          <p class="small"><a href="/legal/politica-privacitat/">Política de privacitat</a><br><a href="/legal/politica-cookies/">Política de cookies</a><br><a href="/legal/avis-legal/">Avís legal</a><br><a href="/legal/registre-menor/">Registre de menors</a></p>
        </section>
      </div>
    </footer>
  `;
}

function renderContactBlocks() {
  document.querySelectorAll('[data-club-contact]').forEach((el) => {
    el.innerHTML = `${CLUB_DATA.adreca} · ${CLUB_DATA.telefon} · ${CLUB_DATA.email}`;
  });

  document.querySelectorAll('[data-club-hours]').forEach((el) => {
    el.textContent = CLUB_DATA.horariGeneral;
  });
}

renderHeader();
renderFooter();
renderContactBlocks();
