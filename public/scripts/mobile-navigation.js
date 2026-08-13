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

  nav.querySelectorAll('a[href="/veranstaltung-hamm.html"]').forEach(link => link.remove());

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