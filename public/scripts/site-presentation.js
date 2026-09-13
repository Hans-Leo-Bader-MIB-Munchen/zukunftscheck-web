(() => {
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

      while (homepageHeroCard.firstChild) heroLink.appendChild(homepageHeroCard.firstChild);
      homepageHeroCard.replaceWith(heroLink);
    }
  }

  const definitionTitle = document.querySelector('#definition-title');
  if (definitionTitle && !definitionTitle.querySelector('.desktop-definition-break')) {
    definitionTitle.replaceChildren(document.createTextNode('Orientierung, Strukturierung und Klärung'), Object.assign(document.createElement('br'), { className: 'desktop-definition-break' }), document.createTextNode(' des nächsten belastbaren Schritts.'));
  }

  const stagesTitle = document.querySelector('#stages-title');
  if (stagesTitle && !stagesTitle.querySelector('.desktop-stages-break')) {
    stagesTitle.replaceChildren(document.createTextNode('Von der kostenfreien ersten Einordnung'), Object.assign(document.createElement('br'), { className: 'desktop-stages-break' }), document.createTextNode(' zum passenden nächsten Schritt.'));
  }

  const limitsTitle = document.querySelector('#limits-title');
  if (limitsTitle && !limitsTitle.querySelector('.desktop-limits-break')) {
    limitsTitle.replaceChildren(document.createTextNode('Der ZukunftsCheck bleibt vor Fachplanung,'), Object.assign(document.createElement('br'), { className: 'desktop-limits-break' }), document.createTextNode(' Umsetzung und spezialisierten Beratungsleistungen.'));
  }

  const questionsTitle = document.querySelector('#questions-title');
  if (questionsTitle && !questionsTitle.querySelector('.desktop-questions-break')) {
    questionsTitle.replaceChildren(document.createTextNode('Am Anfang stehen Ziel, Rolle,'), Object.assign(document.createElement('br'), { className: 'desktop-questions-break' }), document.createTextNode(' Zuständigkeit und Entscheidungsbedarf.'));
  }

  const offersTitle = document.querySelector('#offers-title');
  if (offersTitle && !offersTitle.querySelector('.mobile-offers-break')) {
    offersTitle.replaceChildren(document.createTextNode('Fünf Anwendungsfelder'), Object.assign(document.createElement('br'), { className: 'mobile-offers-break' }), document.createTextNode(' für unterschiedliche Entscheidungssituationen.'));
  }

  const rechtsentwicklungTitle = document.querySelector('#rechtsentwicklung-title');
  if (rechtsentwicklungTitle && !rechtsentwicklungTitle.querySelector('.desktop-rechtsentwicklung-break')) {
    rechtsentwicklungTitle.replaceChildren(document.createTextNode('Was geschieht, wenn bestehende Regeln,'), Object.assign(document.createElement('br'), { className: 'desktop-rechtsentwicklung-break' }), document.createTextNode(' Zuständigkeiten oder Verfahren'), Object.assign(document.createElement('br'), { className: 'desktop-rechtsentwicklung-break' }), document.createTextNode(' erkennbare Probleme nicht lösen?'));
  }

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

  /* Erster öffentlicher Referenzfall: auf der Startseite direkt nach der Arbeitsweise. */
  const questionsSection = document.querySelector('#arbeitsweise');
  if (questionsSection && !document.querySelector('#praxis')) {
    const praxis = document.createElement('section');
    praxis.id = 'praxis';
    praxis.className = 'section highlight split';
    praxis.setAttribute('aria-labelledby', 'praxis-title');
    praxis.innerHTML = `
      <div>
        <p class="section-label">ZukunftsCheck in der Praxis</p>
        <h2 id="praxis-title">Von der Behauptung zur belastbaren Regel.</h2>
        <p>Der ZukunftsCheck prüft Ausgangsthese, Gegenposition, Faktenlage und Folgen – und entwickelt daraus einen tragfähigen nächsten Schritt.</p>
        <a class="text-link" href="/praxis.html">Weitere Praxisfälle →</a>
        <a class="praxis-preview-image" href="/verfassungsschutz-politisch-steuerbar.html" aria-label="Zum ZukunftsCheck über die politische Steuerbarkeit des Verfassungsschutzes">
          <img src="/assets/31CCDA11-9FD8-4924-ABF5-1AA8708FF736.png" alt="Redaktionelle Darstellung von Innenministerium, Verfassungsschutz und demokratischer Kontrolle">
        </a>
      </div>
      <article class="card">
        <p class="section-label">Referenzfall · Demokratie &amp; Gesellschaft</p>
        <h3>Wie politisch steuerbar ist der Verfassungsschutz?</h3>
        <p>Ein ZukunftsCheck zu Tino Chrupallas Kritik, institutioneller Weisungsgebundenheit und der Frage, welche Regeln auch nach einem Regierungswechsel noch tragen.</p>
        <a class="text-link" href="/verfassungsschutz-politisch-steuerbar.html">ZukunftsCheck ansehen →</a>
      </article>`;
    questionsSection.insertAdjacentElement('afterend', praxis);
  }
})();
