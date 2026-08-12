(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');

  if (!header || !nav) return;

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
    applicationGrid.classList.add('applications-grid');
    applicationGrid.children[5].classList.add('project-control-card');

    const style = document.createElement('style');
    style.textContent = `
      #angebote .applications-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 1rem;
      }

      #angebote .applications-grid > .card:nth-child(1),
      #angebote .applications-grid > .card:nth-child(2),
      #angebote .applications-grid > .card:nth-child(3) {
        grid-column: span 2;
      }

      #angebote .applications-grid > .card:nth-child(4) {
        grid-column: 2 / span 2;
      }

      #angebote .applications-grid > .card:nth-child(5) {
        grid-column: 4 / span 2;
      }

      #angebote .applications-grid > .project-control-card {
        grid-column: 2 / span 4;
        margin-top: 1rem;
        background: var(--gold-soft);
        border-color: var(--gold);
        position: relative;
        padding-top: 3rem;
      }

      #angebote .applications-grid > .project-control-card::before {
        content: "Getrennte Leistung";
        position: absolute;
        top: 1.15rem;
        left: 1.3rem;
        padding: .28rem .65rem;
        border-radius: 999px;
        background: #f3df9a;
        color: #5e4800;
        font-size: .82rem;
        font-weight: 800;
        letter-spacing: .02em;
      }

      @media (max-width: 760px) {
        #angebote .applications-grid {
          grid-template-columns: 1fr;
        }

        #angebote .applications-grid > .card:nth-child(n),
        #angebote .applications-grid > .project-control-card {
          grid-column: auto;
        }

        #angebote .applications-grid > .project-control-card {
          margin-top: .75rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();