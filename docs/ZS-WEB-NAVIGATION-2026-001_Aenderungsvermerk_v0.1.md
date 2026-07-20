# ZS-WEB-NAVIGATION-2026-001 – Änderungsvermerk v0.1

## Bearbeitungsstand

- Datum: 20. Juli 2026
- Repository: `Hans-Leo-Bader-MIB-Munchen/zukunftscheck-web`
- Branch: `feature/positionierung-v0-1`
- Ausgangsstand: bestehender Positionierungsbranch
- Status: nicht nach `main` gemergt, nicht veröffentlicht

## Verbindliche Navigationsstruktur

Auf allen relevanten Seiten wurde folgende Reihenfolge vereinheitlicht:

1. Start
2. Angebote
3. Projektsteuerung
4. Beteiligung
5. Veranstaltung

Linkziele:

- `Start` → `/index.html`
- `Angebote` → `/index.html#angebote`
- `Projektsteuerung` → `/projektsteuerung.html`
- `Beteiligung` → `/teilnahme.html`
- `Veranstaltung` → `/veranstaltung-hamm.html`

## Geänderte Dateien

- `public/kommune.html`
- `public/organisation.html`
- `public/gebaeude-energie.html`
- `public/kommunikation-veranstaltungen.html`
- `public/entscheidung.html`
- `public/projektsteuerung.html`
- `public/teilnahme.html`
- `public/veranstaltung-hamm.html`
- `tests/preview-check.mjs`

Die Startseite enthielt die vorgesehene Navigationsstruktur bereits und musste nicht geändert werden.

## Aktive Kennzeichnung

- Startseite: `Start`
- Angebotsunterseiten: `Angebote`
- Projektsteuerungsseite: `Projektsteuerung`
- Beteiligungsseite: `Beteiligung`
- Veranstaltungsseite: `Veranstaltung`

## Link- und Konsistenzprüfung

Das bestehende Testskript wurde um Prüfungen ergänzt, die auf allen relevanten Seiten kontrollieren:

- Vorhandensein aller fünf Menüpunkte
- korrekte Linkziele
- einheitliche Reihenfolge
- Vorhandensein der Hauptnavigation

Die bestehenden internen Linkprüfungen bleiben erhalten.

## Offene Prüfungen

Nicht tatsächlich ausgeführt werden konnten:

- `npm test` in einer lokalen Laufzeitumgebung
- visuelle Browserprüfung bei 360, 390, 768 und 1280 Pixel
- Prüfung der Browser-Konsole

Der vorhandene responsive Header wurde unverändert weiterverwendet. Es wurden keine neuen CSS- oder JavaScript-Regeln angelegt.

## Sperrbestätigung

- keine neue Funktion
- keine neue Datenerfassung
- keine neue Menütechnik
- keine neue CSS- oder JavaScript-Datei
- kein Deployment
- keine Veröffentlichung
- kein Merge nach `main`
