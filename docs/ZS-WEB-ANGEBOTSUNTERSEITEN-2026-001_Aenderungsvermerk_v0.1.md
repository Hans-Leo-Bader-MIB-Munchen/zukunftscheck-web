# ZS-WEB-ANGEBOTSUNTERSEITEN-2026-001 – Änderungsvermerk v0.1

## Bearbeitungsstand

- Datum: 20. Juli 2026
- Repository: `Hans-Leo-Bader-MIB-Munchen/zukunftscheck-web`
- Branch: `feature/angebotsunterseiten-v0-1`
- Ausgangsstand: `main`
- Status: nichtproduktiv, nicht veröffentlicht, nicht nach `main` gemergt

## Neu angelegte Seiten

- `public/kommune.html`
- `public/organisation.html`
- `public/gebaeude-energie.html`
- `public/kommunikation-veranstaltungen.html`
- `public/entscheidung.html`
- `public/projektsteuerung.html`

## Geänderte Dateien

- `public/index.html`
  - Abschnitt „ZukunftsCheck für unterschiedliche Aufgaben“ ergänzt
  - fünf Angebotslinien verlinkt
  - Projektsteuerung nachgeordnet verlinkt
  - Hauptnavigation um Angebote und Projektsteuerung ergänzt
- `tests/preview-check.mjs`
  - Existenzprüfung für alle sechs neuen Seiten ergänzt
  - Noindex-Prüfung auf alle neuen Seiten erweitert
  - Startseitenverlinkung und lokale Linkziele in die Prüfung aufgenommen

## Inhaltliche Grundsätze

- einheitliche Seitenstruktur
- bestehende Gestaltung und vorhandene CSS-Komponenten wiederverwendet
- klare Trennung zwischen ZukunftsCheck, Projektsteuerung, Fachplanung und Umsetzung
- keine automatische Folgebeauftragung
- keine verdeckte Anbieterbindung
- keine Rechts-, Steuer-, Finanzierungs-, Anlage- oder Fachplanungsversprechen
- Kommunikation und Veranstaltungen: fachliche Beteiligung, Ergebnisinformation und freiwillige Interessentenabfrage getrennt

## Datenerfassung und Technik

- keine neuen Formulare
- keine neuen Eingabefelder
- keine Datenbank
- keine neue Schnittstelle
- keine neue Abhängigkeit
- keine Änderung an Tracking, Datenschutz oder Impressum
- bestehende `noindex,nofollow`-Sperre auf allen neuen Seiten gesetzt

## Prüfungen

### Strukturell auf dem GitHub-Branch geprüft

- sechs neue Seiten vorhanden
- Startseitenlinks ergänzt
- interne Ziele stimmen mit den angelegten Dateinamen überein
- bestehende CSS-Dateien werden wiederverwendet
- Testskript um die neuen Seiten erweitert

### Noch lokal beziehungsweise in einer Preview-Umgebung zu prüfen

- `npm test`
- Desktopdarstellung bei ungefähr 1280 und 1440 Pixel
- Mobilansicht bei ungefähr 360 und 390 Pixel
- optional Tabletansicht bei ungefähr 768 Pixel
- sichtbare Prüfung von Navigation, Umbrüchen und vollständigen Überschriften
- Browser-Konsole

Diese Prüfungen wurden im GitHub-Connector nicht als erfolgreich behauptet, weil dort keine Browser- oder lokale Laufzeitprüfung ausgeführt wurde.

## Sperrbestätigung

- keine Produktivschaltung
- kein Deployment ausgelöst
- kein Merge nach `main`
- keine Veröffentlichung
- keine neue Datenerfassung
