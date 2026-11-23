import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=path.resolve('public');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const requiredPages=['index.html','teilnahme.html','veranstaltung-hamm.html','impressum.html','datenschutz.html','404.html','robots.txt','mib-logo.png','kommune.html','organisation.html','gebaeude-energie.html','kommunikation-veranstaltungen.html','entscheidung.html','projektsteuerung.html'];
for(const page of requiredPages)assert.ok(fs.existsSync(path.join(root,page)),`${page} fehlt`);

const home=read('index.html');
const part=read('teilnahme.html');
const privacy=read('datenschutz.html');
const client=read('participation.js');
const apiSource=fs.readFileSync(path.resolve('api/submit.js'),'utf8');

for(const html of requiredPages.filter(name=>name.endsWith('.html')).map(read))assert.match(html,/noindex,nofollow/,'robots-Sperre fehlt');
for(const phrase of ['Fachlichen Beitrag einreichen','Stufe-0-Anfrage','Allgemein Kontakt aufnehmen','Getrennter Datenweg 1','Getrennter Datenweg 2','Getrennter Datenweg 3'])assert.ok(part.includes(phrase),`Getrennter Weg fehlt: ${phrase}`);
assert.equal((part.match(/data-submit-form=/g)||[]).length,3,'Es müssen genau drei getrennte Formulare bestehen');
for(const formType of ['contribution','stage0','contact'])assert.ok(part.includes(`data-submit-form="${formType}"`),`Formulartyp fehlt: ${formType}`);
assert.equal((part.match(/name="formStartedAt"/g)||[]).length,3,'Zeitbasierter Spamschutz fehlt');
assert.equal((part.match(/class="honeypot"/g)||[]).length,3,'Honeypot-Spamschutz fehlt');
assert.equal((part.match(/aria-live="polite" tabindex="-1" hidden/g)||[]).length,3,'Barrierearme Statusausgabe fehlt');
assert.ok(!/<form[^>]+action=/i.test(part),'Formularziel darf nicht im HTML gesetzt sein');
assert.doesNotMatch(part,/type="file"/i,'Uploadfunktion darf nicht vorhanden sein');
assert.doesNotMatch(part,/Stufe 3/,'Fachanschluss darf nicht als Stufe 3 bezeichnet werden');
assert.doesNotMatch(part,/name="interest" value="Stufe [012]"/,'Stufe 0 bis 2 dürfen keine allgemeinen Interessenauswahlen sein');

const stage0Form=(part.match(/<form data-submit-form="stage0"[\s\S]*?<\/form>/)||[])[0]||'';
assert.ok(stage0Form,'Eigenes Stufe-0-Formular fehlt');
for(const field of ['projectTitle','projectType','projectDescription','pendingDecision','requesterRole','involvedParties','existingChecks','openQuestion','name','email','privacy'])assert.ok(stage0Form.includes(`name="${field}"`),`Stufe-0-Pflichtfeld fehlt: ${field}`);
assert.doesNotMatch(stage0Form,/name="eventContext"/,'Stufe-0-Anfrage darf keinen Veranstaltungsbezug erben');
assert.match(stage0Form,/name="formType" value="stage0"/,'Eigene technische Kennung der Stufe 0 fehlt');
assert.match(part,/Keine sensiblen personenbezogenen Daten/,'Datengrenze vor dem Formular fehlt');
assert.match(stage0Form,/keine Zustimmung zu Werbung/,'Kontakt- und Werbetrennung fehlt');

const contributionForm=(part.match(/<form data-submit-form="contribution"[\s\S]*?<\/form>/)||[])[0]||'';
const contactForm=(part.match(/<form data-submit-form="contact"[\s\S]*?<\/form>/)||[])[0]||'';
assert.match(contributionForm,/name="eventContext"/,'Fachlicher Beitrag braucht den ausgewählten Bezug');
assert.match(contactForm,/name="eventContext"/,'Allgemeiner Kontakt braucht den ausgewählten Bezug');
assert.match(part,/Eine Kontaktanfrage löst keine Prüfung der Eignung für den ZukunftsCheck aus/,'Kontaktweg ist nicht klar abgegrenzt');

for(const phrase of ['Stufe 0 – Kurze erste Einordnung','Stufe 1 – Strukturierte Orientierungs- und Zusammenhangsprüfung','Stufe 2 – Kern-Modul-Ansatz','nicht operativ freigegeben','Außerhalb des Stufenmodells'])assert.ok(part.includes(phrase),`Stufeninformation fehlt: ${phrase}`);
assert.equal((part.match(/class="stage-facts"/g)||[]).length,3,'Stufe 0, Stufe 1 und Fachanschluss brauchen vertiefende Informationen');
assert.match(part,/kurze Rückmeldung zur Eignung/,'Verständliche Stufe-0-Ergebnisform fehlt');
assert.match(part,/nicht der passende Weg/,'Verständliche negative Stufe-0-Rückmeldung fehlt');
assert.doesNotMatch(part,/Passungsprüfung|Passungsantwort|Nichtpassung/,'Sperrige interne Stufe-0-Begriffe dürfen auf der Beteiligungsseite nicht sichtbar sein');
assert.match(part,/keine Beauftragung von Stufe 1 oder Stufe 2/,'Abgrenzung zur Folgestufe fehlt');
assert.match(part,/strukturierte, dokumentenbasierte und begrenzte/i,'Stufe 1 ist nicht ausreichend beschrieben');
assert.match(part,/keine operativ, pilotpraktisch oder produktiv freigegebene Stufe/i,'Stufe-2-Status fehlt');
assert.match(part,/profilübergreifenden Grundmodulkern/i,'Grundmodulkern fehlt');
assert.match(part,/noch nicht abgeschlossene konzeptionelle Differenzierung möglicher Anwendungsprofile/i,'Vorläufigkeit der Anwendungsprofile fehlt');
assert.match(part,/abschließend entwickelte oder freigegebene Vertiefungsmodule/i,'Grenze der Vertiefungsmodule fehlt');
assert.match(part,/eine abschließend beschlossene allgemeine Ergebnisbezeichnung/i,'Offene Stufe-2-Ergebnisbezeichnung fehlt');
assert.doesNotMatch(part,/Stufe 2 – Erweiterter Check/,'Veraltete Stufe-2-Bezeichnung vorhanden');
assert.doesNotMatch(part,/gegenstandsabhängige Prüfmodule/,'Nicht bestätigte Prüfmodule vorhanden');
assert.doesNotMatch(client,/correctStageStatus/,'Fachtexte dürfen nicht mehr dynamisch überschrieben werden');

assert.match(home,/kurze, begrenzte und manuelle erste Einordnung/i,'Startseite beschreibt Stufe 0 nicht verständlich');
assert.doesNotMatch(home,/Passungsprüfung|Passungsantwort|Nichtpassung/,'Sperrige interne Stufe-0-Begriffe dürfen auf der Startseite nicht sichtbar sein');
assert.match(home,/strukturierte, dokumentenbasierte und begrenzte Orientierungs- und Zusammenhangsprüfung/i,'Startseite unterbeschreibt Stufe 1');
assert.match(home,/konzeptionell bestätigter Kern-Modul-Ansatz/i,'Startseite beschreibt Stufe 2 nicht korrekt');
assert.match(home,/weder vollständig ausdifferenziert noch operativ, pilotpraktisch oder produktiv freigegeben/i,'Startseite überdehnt Stufe 2');

assert.match(client,/form\.querySelector\(':invalid'\)\?\.focus\(\)/,'Fokus auf erstes ungültiges Feld fehlt');
assert.match(client,/fetch\('\/api\/submit'/,'Serverseitiger Formularweg fehlt');
assert.match(client,/all\('form\[data-submit-form\]'\)\.forEach\(initializeForm\)/,'Nicht alle Formulare werden initialisiert');
assert.match(client,/document\.querySelectorAll\('\[name=eventContext\]'\)/,'Kontext wird nur an vorhandene Kontextfelder übertragen');

for(const phrase of ['Drei getrennte Formularwege','konkreten Stufe-0-Anfrage','Eine allgemeine Kontaktanfrage löst keine Stufe-0-Prüfung aus','keine Zustimmung zu Werbung','keine Upload-Funktion','nicht automatisch bewertet'])assert.ok(privacy.includes(phrase),`Datenschutzhinweis fehlt: ${phrase}`);
assert.match(privacy,/Stand: 21\. Juli 2026/,'Datenschutzstand wurde nicht fortgeschrieben');

// Die öffentlich genutzte Formularverarbeitung wird auf main separat geprüft.
const previewEnvironment = {
  VERCEL_ENV: 'preview',
  GMAIL_USER: 'sender@example.invalid',
  GMAIL_APP_PASSWORD: 'test-only',
  MAIL_TO: 'recipient@example.invalid',
  TURNSTILE_SITE_KEY: 'test-only',
  TURNSTILE_SECRET_KEY: 'test-only',
};

function failOnAccess(operation) {
  return () => assert.fail(operation);
}

for (const [file, method, message] of [
  ['submit.js', 'POST', 'Die interne Vorschau nimmt keine Formulardaten entgegen.'],
  ['turnstile-config.js', 'GET', 'In der internen Vorschau ist die Sicherheitsprüfung für Formulare deaktiviert.'],
]) {
  const sandbox = {
    module: { exports: {} },
    process: { env: previewEnvironment },
    require: failOnAccess('Die Sperre darf keine externe Bibliothek laden.'),
    fetch: failOnAccess('Die Sperre darf keine Netzwerkanfrage auslösen.'),
  };
  const filename = path.resolve('api', file);
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), sandbox, { filename });
  const handler = sandbox.module.exports;

  const request = {
    method,
    get body() {
      assert.fail('Die Sperre darf den Anfrageinhalt nicht auslesen.');
    },
  };
  const headers = new Map();
  let status;
  let payload;
  const response = {
    setHeader(key, value) {
      headers.set(key, value);
    },
    status(code) {
      status = code;
      return this;
    },
    json(result) {
      payload = result;
      return this;
    },
  };

  await handler(request, response);
  assert.equal(status, 503, file);
  assert.equal(headers.get('Cache-Control'), 'no-store', file);
  assert.equal(payload?.ok, false, file);
  assert.equal(payload?.message, message, file);
  assert.equal(Object.hasOwn(payload, 'siteKey'), false, file);
}

const technicalAll=[part,client,apiSource].join('\n');
for(const forbidden of ['localStorage','sessionStorage','XMLHttpRequest','sendBeacon','WebSocket','type="file"'])assert.ok(!technicalAll.includes(forbidden),`Verbotener Bestandteil gefunden: ${forbidden}`);
console.log('ZS-WEB-KK1: Formular-, Datenschutz-, Stufen- und Abgrenzungsprüfung bestanden.');
