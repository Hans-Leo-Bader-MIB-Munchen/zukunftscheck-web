(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');

  if (!header || !nav) return;

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
})();
