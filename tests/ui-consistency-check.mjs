import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve('public');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');

const pages=[
  'index.html','kommune.html','organisation.html','gebaeude-energie.html',
  'kommunikation-veranstaltungen.html','entscheidung.html','projektsteuerung.html',
  'teilnahme.html','veranstaltungen.html','veranstaltung-walsrode.html',
  'veranstaltung-altenwahlingen.html','veranstaltung-hamm.html','impressum.html',
  'datenschutz.html','404.html'
];
for(const page of pages)assert.ok(fs.existsSync(path.join(root,page)),`${page} fehlt`);

const nav=read('scripts/mobile-navigation.js');
const consistency=read('styles/ui-consistency.css');
const colorBalance=read('styles/ui-color-balance.css');
const events=read('veranstaltungen.html');
const participation=read('participation.js');

for(const label of ['Start','Anwendungsfelder','Projektsteuerung','Beteiligung','Veranstaltungen']){
  assert.ok(nav.includes(`label: '${label}'`),`Globale Navigation fehlt: ${label}`);
}
assert.match(nav,/nav\.replaceChildren/,'Navigation wird nicht zentral normalisiert');
assert.match(nav,/ui-consistency\.css/,'Zentrale UI-Konsistenzschicht wird nicht geladen');

assert.match(consistency,/\.highlight\{/,'Globale Highlight-Regel fehlt');
assert.match(consistency,/\.cta\{/,'Globale CTA-Regel fehlt');
assert.match(consistency,/\.projektsteuerung-grundsatz\{/,'Projektsteuerungs-Grundsatz ist nicht gezielt normalisiert');
assert.match(consistency,/\.event-detail\{/,'Event-Detailseiten haben keine gemeinsame Geometrie');
assert.match(consistency,/\.event-facts\{/,'Event-Faktenraster ist nicht zentral normalisiert');
assert.match(consistency,/\.cards\.three>\.card/,'Normale Drei-Karten-Raster werden nicht zentral kontrolliert');
assert.match(consistency,/text-align:left!important/,'Normale Inhaltskarten werden nicht linksbündig zurückgesetzt');

assert.match(colorBalance,/\.card \.text-link/,'Zentrierregel für Kartenlinks fehlt');
assert.match(colorBalance,/width:100%!important/,'Mehrzeilige Kartenlinks spannen nicht die Kartenbreite auf');
assert.match(colorBalance,/align-self:stretch!important/,'Kartenlinks werden nicht über die verfügbare Breite gestreckt');
assert.match(colorBalance,/text-align:center!important/,'Kartenlinks werden nicht mittig ausgerichtet');

assert.match(events,/class="cards events-upcoming"/,'Kommende Veranstaltungen nutzen kein eigenes Raster');
assert.equal((events.match(/class="badge event-badge"/g)||[]).length,2,'Die zwei Oktobertermine brauchen zweizeilige Termin-Badges');
for(const title of ['All-Electric-In: Deutschland wird Electric State','All-Electric-In: Die Praxis'])assert.ok(events.includes(title),`Veranstaltungstitel fehlt: ${title}`);

assert.match(participation,/insertBefore\(article,completedCard\)/,'Kommende Veranstaltungen werden nicht vor der abgeschlossenen Hamm-Veranstaltung einsortiert');

for(const page of ['veranstaltung-walsrode.html','veranstaltung-altenwahlingen.html','veranstaltung-hamm.html']){
  const html=read(page);
  assert.match(html,/class="event-detail"/,`${page}: Event-Detailcontainer fehlt`);
  assert.match(html,/class="event-facts"/,`${page}: Faktenraster fehlt`);
  assert.match(html,/scripts\/mobile-navigation\.js/,`${page}: globale Navigation fehlt`);
}

console.log('ZS-WEB-UI: Navigations-, Raster-, Karten- und Event-Konsistenzprüfung bestanden.');
