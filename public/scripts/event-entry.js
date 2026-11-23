(() => {
  'use strict';

  const id = new URLSearchParams(location.search).get('event');
  if (!id) return;

  const event = (window.ZS_EVENTS || []).find(item => item.id === id && item.id !== 'ALLGEMEIN');
  const status = document.getElementById('event-status');

  if (!event) {
    status.textContent = 'Veranstaltung nicht gefunden. Das allgemeine Beispiel bleibt verfügbar.';
    return;
  }

  document.getElementById('event-title').textContent = event.title;
  status.textContent = 'Vorhandener Veranstaltungseintrag als technisches Beispiel. Keine Anmeldung.';
})();
