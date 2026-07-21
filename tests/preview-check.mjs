import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=path.resolve('public');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const requiredPages=['index.html','teilnahme.html','veranstaltung-hamm.html','impressum.html','datenschutz.html','404.html','robots.txt','mib-logo.png','kommune.html','organisation.html','gebaeude-energie.html','kommunikation-veranstaltungen.html','entscheidung.html','projektsteuerung.html'];
for(const page of requiredPages)assert.ok(fs.existsSync(path.join(root,page)),`${page} fehlt`);

const part=read('teilnahme.html');
const privacy=read('datenschutz.html');
const client=read('participation.js');
const apiSource=fs.readFileSync(path.resolve('api/submit.js'),'utf8');

for(const html of requiredPages.filter(name=>name.endsWith('.html')).map(read)){
  assert.match(html,/noindex,nofollow/,'robots-Sperre fehlt');
}

for(const phrase of ['Fachlichen Beitrag einreichen','Stufe-0-Anfrage','Allgemein Kontakt aufnehmen','Getrennter Datenweg 1','Getrennter Datenweg 2','Getrennter Datenweg 3']){
  assert.ok(part.includes(phrase),`Getrennter Weg fehlt: ${phrase}`);
}
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
for(const field of ['projectTitle','projectType','projectDescription','pendingDecision','requesterRole','involvedParties','existingChecks','openQuestion','name','email','privacy']){
  assert.ok(stage0Form.includes(`name="${field}"`),`Stufe-0-Pflichtfeld fehlt: ${field}`);
}
assert.doesNotMatch(stage0Form,/name="eventContext"/,'Stufe-0-Anfrage darf keinen Veranstaltungsbezug erben');
assert.match(stage0Form,/name="formType" value="stage0"/,'Eigene technische Kennung der Stufe 0 fehlt');
assert.match(part,/Keine sensiblen personenbezogenen Daten/,'Datengrenze vor dem Formular fehlt');
assert.match(stage0Form,/keine Zustimmung zu Werbung/,'Kontakt- und Werbetrennung fehlt');

const contributionForm=(part.match(/<form data-submit-form="contribution"[\s\S]*?<\/form>/)||[])[0]||'';
const contactForm=(part.match(/<form data-submit-form="contact"[\s\S]*?<\/form>/)||[])[0]||'';
assert.match(contributionForm,/name="eventContext"/,'Fachlicher Beitrag braucht den ausgewählten Bezug');
assert.match(contactForm,/name="eventContext"/,'Allgemeiner Kontakt braucht den ausgewählten Bezug');
assert.match(part,/löst keine Bedarfs- und Passungsprüfung aus/,'Kontaktweg ist nicht klar abgegrenzt');

for(const phrase of ['Stufe 0 – Bedarfs- und Passungsprüfung','Stufe 1 – Strukturierte Erstklärung','Stufe 2 – Vertiefte Prüfung','Fachanschluss außerhalb des ZukunftsChecks','Außerhalb des Stufenmodells']){
  assert.ok(part.includes(phrase),`Stufeninformation fehlt: ${phrase}`);
}
assert.equal((part.match(/class="stage-facts"/g)||[]).length,4,'Stufen und Fachanschluss brauchen vertiefende Informationen');
assert.match(part,/kein zusätzlicher ZukunftsCheck erforderlich/,'Gleichwertiges Ergebnis ohne Vertiefung fehlt');
assert.match(part,/keine Beauftragung von Stufe 1 oder Stufe 2/,'Abgrenzung zur Folgestufe fehlt');

assert.match(client,/form\.querySelector\(':invalid'\)\?\.focus\(\)/,'Fokus auf erstes ungültiges Feld fehlt');
assert.match(client,/fetch\('\/api\/submit'/,'Serverseitiger Formularweg fehlt');
assert.match(client,/all\('form\[data-submit-form\]'\)\.forEach\(initializeForm\)/,'Nicht alle Formulare werden initialisiert');
assert.match(client,/document\.querySelectorAll\('\[name=eventContext\]'\)/,'Kontext wird nur an vorhandene Kontextfelder übertragen');

for(const phrase of ['Drei getrennte Formularwege','konkreten Stufe-0-Anfrage','Eine allgemeine Kontaktanfrage löst keine Stufe-0-Prüfung aus','keine Zustimmung zu Werbung','keine Upload-Funktion','nicht automatisch bewertet']){
  assert.ok(privacy.includes(phrase),`Datenschutzhinweis fehlt: ${phrase}`);
}
assert.match(privacy,/Stand: 21\. Juli 2026/,'Datenschutzstand wurde nicht fortgeschrieben');

assert.match(apiSource,/\['contribution','stage0','contact'\]/,'Server akzeptiert nicht genau die drei Formulartypen');
assert.match(apiSource,/formType === 'stage0'/,'Eigene serverseitige Stufe-0-Verarbeitung fehlt');
assert.match(apiSource,/STAGE0_PROJECT_TYPES/,'Anwendungsbereiche werden nicht serverseitig geprüft');
assert.match(apiSource,/Manuelle Bedarfs- und Passungsprüfung; keine automatische Ergebniszuweisung/,'Manuelle Bearbeitungsgrenze fehlt');
assert.match(apiSource,/Ihre Stufe-0-Anfrage wurde übermittelt/,'Sachliche Eingangsbestätigung fehlt');
assert.match(apiSource,/\.replace\(\/\[<>\]\/g, ''\)/,'HTML- und Scriptzeichen werden nicht neutralisiert');
assert.match(apiSource,/text:`\$\{content\}/,'E-Mails müssen als Klartext versendet werden');
assert.doesNotMatch(apiSource,/\bhtml\s*:/,'HTML-E-Mail darf nicht erzeugt werden');

const sent=[];
const sandbox={
  module:{exports:{}},
  exports:{},
  require:name=>{
    if(name!=='nodemailer')throw new Error(`Unerwartetes Modul: ${name}`);
    return {createTransport:()=>({sendMail:async message=>{sent.push(message)}})};
  },
  process:{env:{GMAIL_USER:'sender@example.org',GMAIL_APP_PASSWORD:'secret',MAIL_TO:'receiver@example.org'}},
  console,
  URL,
  Date,
  Map,
  Set,
  String,
  Number,
  Array,
  Object,
  RegExp
};
vm.runInNewContext(apiSource,sandbox,{filename:'api/submit.js'});
const handler=sandbox.module.exports;

function request(body,ip){
  return {
    method:'POST',
    headers:{'content-type':'application/json','origin':'https://www.zukunftscheck.org','x-forwarded-for':ip},
    socket:{remoteAddress:ip},
    body:{...body,formStartedAt:Date.now()-3000,privacy:true}
  };
}
function response(){
  return {
    statusCode:200,
    payload:null,
    headers:{},
    setHeader(key,value){this.headers[key]=value},
    status(code){this.statusCode=code;return this},
    json(payload){this.payload=payload;return payload}
  };
}
const validStage0={
  formType:'stage0',projectTitle:'Kommunales Wärmeprojekt',projectType:'Kommune',
  projectDescription:'Kurze Beschreibung',pendingDecision:'Grundsatzentscheidung steht an',
  requesterRole:'Projektverantwortung',involvedParties:'Verwaltung und Fachstelle',
  existingChecks:'Fachplanung liegt vor',openQuestion:'Sind langfristige Abhängigkeiten ausreichend abgedeckt?',
  name:'Test Person',email:'test@example.org'
};

let res=response();
await handler(request(validStage0,'198.51.100.1'),res);
assert.equal(res.statusCode,200,'Vollständige Stufe-0-Anfrage wird nicht angenommen');
assert.match(res.payload.message,/manuell darauf geprüft/,'Eingangsbestätigung behauptet keine manuelle Prüfung');
assert.equal(sent.length,1,'Stufe-0-Anfrage erzeugt nicht genau eine Nachricht');
assert.match(sent[0].subject,/neue Stufe-0-Anfrage/,'Eigene Betreffkennzeichnung fehlt');
assert.match(sent[0].text,/Datenweg: Stufe-0-Anfrage/,'Eigener Datenweg fehlt in der Nachricht');
assert.doesNotMatch(sent[0].text,/Veranstaltungskennung/,'Stufe-0-Anfrage wurde einer Veranstaltung zugeordnet');

res=response();
await handler(request({...validStage0,openQuestion:''},'198.51.100.2'),res);
assert.equal(res.statusCode,400,'Unvollständige Stufe-0-Anfrage muss abgewiesen werden');

res=response();
await handler(request({...validStage0,projectDescription:'<script>alert(1)</script>'},'198.51.100.3'),res);
assert.equal(res.statusCode,200,'Bereinigter Klartext darf verarbeitet werden');
assert.doesNotMatch(sent.at(-1).text,/[<>]/,'HTML-Zeichen wurden nicht neutralisiert');

res=response();
await handler(request({formType:'contact',eventContext:'ALLGEMEIN',purpose:'Sonstige Kontaktaufnahme',name:'Kontakt Test',email:'kontakt@example.org'},'198.51.100.4'),res);
assert.equal(res.statusCode,200,'Allgemeine Kontaktanfrage funktioniert nicht');
assert.match(sent.at(-1).text,/Datenweg: Allgemeiner Kontakt/,'Kontaktweg ist serverseitig nicht getrennt');

res=response();
await handler(request({formType:'contribution',eventContext:'ALLGEMEIN',type:'Hinweis',text:'Ein fachlicher Hinweis'},'198.51.100.5'),res);
assert.equal(res.statusCode,200,'Fachlicher Beitrag funktioniert nicht');
assert.match(sent.at(-1).text,/Datenweg: Fachlicher Beitrag/,'Beitragsweg ist serverseitig nicht getrennt');

const mailsBeforeHoneypot=sent.length;
res=response();
await handler(request({...validStage0,website:'bot'},'198.51.100.6'),res);
assert.equal(res.statusCode,200,'Honeypot soll neutral antworten');
assert.equal(sent.length,mailsBeforeHoneypot,'Honeypot-Anfrage darf keine Nachricht erzeugen');

res=response();
await handler(request({formType:'unknown'},'198.51.100.7'),res);
assert.equal(res.statusCode,400,'Unerwarteter Formulartyp muss abgewiesen werden');

const technicalAll=[part,client,apiSource].join('\n');
for(const forbidden of ['localStorage','sessionStorage','XMLHttpRequest','sendBeacon','WebSocket','type="file"']){
  assert.ok(!technicalAll.includes(forbidden),`Verbotener Bestandteil gefunden: ${forbidden}`);
}

console.log('ZS-STUFE-0-2026-002: Formular-, Datenweg-, Datenschutz-, Spam- und Abgrenzungsprüfung bestanden.');
