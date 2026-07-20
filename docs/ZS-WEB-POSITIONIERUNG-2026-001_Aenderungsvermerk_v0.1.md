# ZS-WEB-POSITIONIERUNG-2026-001 – Änderungsvermerk v0.1

## Bearbeitungsstand

- Datum: 20. Juli 2026
- Repository: `Hans-Leo-Bader-MIB-Munchen/zukunftscheck-web`
- Branch: `feature/positionierung-v0-1`
- Ausgangsstand: aktueller Stand von `main`
- Status: nicht nach `main` gemergt, nicht veröffentlicht

## Geänderte Dateien

- `public/index.html`
- `public/kommune.html`
- `public/organisation.html`
- `public/gebaeude-energie.html`
- `public/kommunikation-veranstaltungen.html`
- `public/entscheidung.html`
- `public/projektsteuerung.html`
- `tests/preview-check.mjs`

## Zentrale sprachliche Änderungen

- ZukunftsCheck als Vorprüfung, Orientierung, Strukturierung und Entscheidungsvorbereitung geschärft
- Leitsatz „Erst verstehen. Dann entscheiden. Danach planen.“ aufgenommen
- allgemeine Positionierung von Gebäude-, Wärme- und Energiethemen auf komplexe Vorhaben erweitert
- Prüfung, Folgeauftrag, Fachplanung und Umsetzung sprachlich getrennt

## Neue beziehungsweise verstärkte Abgrenzungen

- keine kommunale Wärmeplanung
- keine Energieberatung im rechtlich oder förderrechtlich geregelten Sinn
- keine technische Fach- oder Detailplanung
- keine klassische oder umfassende Unternehmensberatung
- keine Rechts-, Steuer-, Finanzierungs- oder Anlageberatung
- keine automatische Veranstaltungs- oder Kampagnenproduktion
- keine automatische Anbieterweitergabe
- keine automatische Projektsteuerung
- Projektsteuerung nur mit bewusster Entscheidung und gesondertem Auftrag

## Qualitäts- und Konsistenzprüfung

Das Testskript wurde an die neuen Positionierungstexte angepasst und prüft nun ausdrücklich:

- Abgrenzung kommunale Wärmeplanung
- Abgrenzung Energieberatung
- Abgrenzung Unternehmensberatung
- Abgrenzung regulierter Beratung
- Abgrenzung Veranstaltungsagentur
- gesonderten Übergang in die Projektsteuerung
- Fortbestand der Noindex-Sperren und vorhandenen Seiten

Eine tatsächliche Laufzeit- und Browserprüfung konnte über den GitHub-Connector nicht ausgeführt werden. `npm test`, Darstellungen bei Desktop- und Mobilbreiten sowie die Browser-Konsole bleiben in einer lokalen oder Preview-Umgebung zu prüfen.

## Unveränderte Bereiche

- keine neuen Funktionen
- keine neuen Formulare oder Eingabefelder
- keine Änderung der Datenerfassung
- keine Änderung an CSS oder JavaScript der Website
- keine neue Abhängigkeit
- keine Änderung an Impressum oder Datenschutz
- keine Entfernung von `noindex,nofollow`

## Sperrbestätigung

- keine funktionale Änderung
- keine neue Datenerfassung
- keine Produktivschaltung
- kein Deployment
- kein Merge nach `main`
- keine Veröffentlichung
