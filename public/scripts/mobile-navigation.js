(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');

  if (!header || !nav) return;

  if (!document.querySelector('link[href="/styles/rfn-editorial-theme.css"]')) {
    const themeStylesheet = document.createElement('link');
    themeStylesheet.rel = 'stylesheet';
    themeStylesheet.href = '/styles/rfn-editorial-theme.css';
    document.head.appendChild(themeStylesheet);
  }

  if (!document.querySelector('link[href="/styles/hero-watermark.css"]')) {
    const watermarkStylesheet = document.createElement('link');
    watermarkStylesheet.rel = 'stylesheet';
    watermarkStylesheet.href = '/styles/hero-watermark.css';
    document.head.appendChild(watermarkStylesheet);
  }

  if (!document.querySelector('link[href="/styles/ui-consistency.css"]')) {
    const consistencyStylesheet = document.createElement('link');
    consistencyStylesheet.rel = 'stylesheet';
    consistencyStylesheet.href = '/styles/ui-consistency.css';
    document.head.appendChild(consistencyStylesheet);
  }

  document.querySelectorAll('.hero, .module-hero').forEach(hero => {
    if (!hero.querySelector(':scope > .hero-watermark')) {
      const watermark = document.createElement('span');
      watermark.className = 'hero-watermark';
      watermark.setAttribute('aria-hidden', 'true');
      hero.appendChild(watermark);
    }

    if (!hero.querySelector(':scope > .hero-watermark-top')) {
      const watermarkTop = document.createElement('span');
      watermarkTop.className = 'hero-watermark-top';
      watermarkTop.setAttribute('aria-hidden', 'true');
      hero.appendChild(watermarkTop);
    }

    if (!hero.querySelector(':scope > .hero-watermark-center')) {
      const watermarkCenter = document.createElement('span');
      watermarkCenter.className = 'hero-watermark-center';
      watermarkCenter.setAttribute('aria-hidden', 'true');
      hero.appendChild(watermarkCenter);
    }
  });

  const homepageHeroCard = document.querySelector('.hero[aria-labelledby="hero-title"] .hero-card');
  if (homepageHeroCard) {
    homepageHeroCard.querySelector('.text-link')?.remove();

    if (homepageHeroCard.tagName !== 'A') {
      const heroLink = document.createElement('a');
      heroLink.href = '/teilnahme.html#stufe-0';
      heroLink.className = homepageHeroCard.className;
      heroLink.setAttribute('aria-label', 'Stufe 0 ansehen');
      heroLink.style.marginBottom = '0';
      heroLink.style.textDecoration = 'none';

      while (homepageHeroCard.firstChild) {
        heroLink.appendChild(homepageHeroCard.firstChild);
      }

      homepageHeroCard.replaceWith(heroLink);
    }
  }

  /* Globale Navigation: auf allen Inhaltsseiten dieselben fünf Hauptziele. */
  const currentPath = window.location.pathname;
  const navItems = [
    { href: '/index.html', label: 'Start', active: currentPath === '/' || currentPath === '/index.html' },
    { href: '/index.html#angebote', label: 'Anwendungsfelder', active: ['/kommune.html','/organisation.html','/gebaeude-energie.html','/kommunikation-veranstaltungen.html','/entscheidung.html'].includes(currentPath) },
    { href: '/projektsteuerung.html', label: 'Projektsteuerung', active: currentPath === '/projektsteuerung.html' },
    { href: '/teilnahme.html', label: 'Beteiligung', active: currentPath === '/teilnahme.html' },
    { href: '/veranstaltungen.html', label: 'Veranstaltungen', active: currentPath === '/veranstaltungen.html' || currentPath.startsWith('/veranstaltung-') }
  ];

  nav.replaceChildren(...navItems.map(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    if (item.active) link.setAttribute('aria-current', 'page');
    return link;
  }));

  const button = document.createElement('button');
  button.className = 'menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'main-navigation');
  button.setAttribute('aria-label', 'Menü öffnen');
  button.innerHTML = '<span aria-hidden="true"></span><span class="menu-toggle-label">Menü</span>';

  nav.id = nav.id || 'main-navigation';
  header.insertBefore(button, nav);

  const closeMenu = () => {
    header.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Menü öffnen');
  };

  button.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      button.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const applicationGrid = document.querySelector('#angebote .cards.three');
  if (applicationGrid && applicationGrid.children.length === 6) {
    if (!document.querySelector('link[href="/styles/anwendungsfelder.css"]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/styles/anwendungsfelder.css';
      document.head.appendChild(stylesheet);
    }

    applicationGrid.classList.add('applications-grid');
    applicationGrid.children[5].classList.add('project-control-card');
  }
})();
