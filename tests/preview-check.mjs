import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve('public');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const pages=['index.html','teilnahme.html','veranstaltung-hamm.html','impressum.html','datenschutz.html'];
for(const page of pages) assert.ok(fs.existsSync(path.join(root,page)),`${page} fehlt`);

const index=read('index.html');
const part=read('teilnahme.html');
const event=read('veranstaltung-hamm.html');
const js=read('preview.js');
const css=read('styles/main.css');
const all=[index,part,event,js,css].join('\n');

for(const html of [index,part,event]) assert.match(html,/noindex,nofollow/,'robots-Sperre fehlt');
for(const phrase of ['Neutrale Erstklärung','Was der ZukunftsCheck ist','Räume sind nicht nur Flächen','Was der ZukunftsCheck leistet','Welche Fragen zuerst geklärt werden','Für wen das Format gedacht ist','Wie die Erstklärung abläuft','Räume erfüllen Funktionen','Welche Informationen genügen','Klare Grenzen für saubere Entscheidungen','Mögliche spätere Übergabepunkte','Neutraler nächster Schritt','Aktueller Status']) assert.ok(index.includes(phrase),`Bestandsinhalt fehlt: ${phrase}`);
for(const phrase of ['ALLGEMEIN','Leben mit der Energiewende','Fachlichen Beitrag vorbereiten','Freiwillig Kontakt aufnehmen','Stufe 0 – Passungsprüfung','Stufe 1 – Basis-ZukunftsCheck','Stufe 2 – Erweiterter ZukunftsCheck','Stufe 3 – Fachanschluss']) assert.ok(part.includes(phrase),`Teilnahmeinhalt fehlt: ${phrase}`);
for(const phrase of ['21. Juli 2027','19:00 Uhr','Hochschule Hamm-Lippstadt, Hörsaal HAM 4','Marker Allee 76–78, Hamm','Energiesystem der Zukunft','Electric All-In']) assert.ok(event.includes(phrase),`Veranstaltungsangabe fehlt: ${phrase}`);
for(const forbidden of ['localStorage','sessionStorage','XMLHttpRequest','sendBeacon','WebSocket','type="file"','Interne Testprüfung','Gesamtsicherung','Synthetische Demodaten']) assert.ok(!all.includes(forbidden),`Verbotener Bestandteil gefunden: ${forbidden}`);
assert.ok(!/<form[^>]+action=/i.test(part),'Formularziel darf nicht gesetzt sein');
assert.equal((part.match(/data-preview-form/g)||[]).length,2,'Beitrag und Kontakt müssen getrennte Formulare sein');
assert.match(js,/preventDefault\(\)/,'Absenden wird nicht abgefangen');
assert.match(js,/übermittelt und speichert derzeit keine Daten/,'Preview-Hinweis fehlt');
assert.match(css,/:focus-visible/,'sichtbarer Fokus fehlt');
assert.equal((part.match(/class="stage-facts"/g)||[]).length,4,'Alle vier Stufen brauchen vertiefende Informationen');
for(const phrase of ['Das Ergebnis','Die Grenze']) assert.equal((part.match(new RegExp(phrase,'g'))||[]).length,4,`Stufeninformation fehlt: ${phrase}`);
assert.match(css,/\.five\{grid-template-columns:repeat\(3,/,'Fragenkarten bleiben auf Desktop zu schmal');
assert.match(css,/@media\(max-width:760px\)\{\.five,\.stage-facts\{grid-template-columns:1fr\}\}/,'Fragenkarten wechseln mobil nicht sicher auf eine Spalte');
for(const href of [...all.matchAll(/(?:href|src)="\/(?!\/)([^"?#]+)/g)].map(m=>m[1])) assert.ok(fs.existsSync(path.join(root,href)),`Lokales Ziel fehlt: ${href}`);
console.log('ZS-WEB-022 Preview-Prüfung bestanden.');
