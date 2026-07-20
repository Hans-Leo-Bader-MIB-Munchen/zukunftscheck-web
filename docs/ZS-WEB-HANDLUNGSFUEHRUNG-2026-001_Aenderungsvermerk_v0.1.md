# ZS-WEB-HANDLUNGSFUEHRUNG-2026-001 – Änderungsvermerk v0.1

## Bearbeitungsstand

- Datum: 20. Juli 2026
- Repository: `Hans-Leo-Bader-MIB-Munchen/zukunftscheck-web`
- Branch: `feature/positionierung-v0-1`
- Ausgangsstand: bestehender Arbeitsstand nach Positionierungs- und Navigationskorrektur
- Status: nicht produktiv, nicht veröffentlicht, nicht nach `main` gemergt

## Geänderte Dateien

- `public/index.html`
- `public/kommune.html`
- `public/organisation.html`
- `public/gebaeude-energie.html`
- `public/kommunikation-veranstaltungen.html`
- `public/entscheidung.html`
- `public/teilnahme.html`
- `tests/preview-check.mjs`

## Korrigierte Nutzerführung

Die fünf Angebotsseiten enden nicht mehr mit Projektsteuerung als primärem Handlungsaufruf.

Die verbindliche Reihenfolge wird nun sichtbar:

1. ZukunftsCheck kennenlernen
2. kostenfreie Stufe 0 zur Passungsprüfung
3. Stufe 1 beziehungsweise Stufe 2 je nach Fragestellung
4. mögliche Projektsteuerung nur nach bewusster Entscheidung und gesondertem Auftrag

## CTA-Änderungen

Auf folgenden Seiten wurde der primäre Button auf `Stufe 0 starten` geändert:

- Kommune
- Organisation
- Gebäude und Energie
- Kommunikation und Veranstaltungen
- Entscheidung

Ziel des Buttons:

`/teilnahme.html#stufe-0`

Die Projektsteuerung bleibt nur noch als nachgeordneter Textlink sichtbar.

## Sichtbarkeit des Stufenmodells

Auf der Startseite wurde ein kompakter Abschnitt zum Ablauf ergänzt.

Er erläutert:

- Stufe 0 als kostenfreie Passungsprüfung
- Stufe 1 und 2 als vertiefende ZukunftsCheck-Stufen
- Projektsteuerung als mögliche getrennte Folgeleistung mit gesondertem Auftrag

Der Abschnitt verweist auf:

`/teilnahme.html#stufen`

## Beteiligungsseite

Der Einleitungstext stellt nun ausdrücklich klar, dass die Seite sowohl:

- der Beteiligung an öffentlichen ZukunftsCheck-Veranstaltungen
- als auch der ersten Kontaktaufnahme für einen ZukunftsCheck

dient.

Die getrennten Datenwege für fachliche Beiträge und freiwillige Kontaktanfragen blieben unverändert.

## ARIA-Korrektur

Auf den fünf Angebotsseiten wurde die semantisch falsche Kennzeichnung:

`aria-current="page"`

am Link `Angebote` entfernt.

Es wird keine andere, ebenfalls unzutreffende aktuelle Seite behauptet.

## Testanpassungen

`tests/preview-check.mjs` prüft nun zusätzlich:

- Sichtbarkeit des Stufenmodells auf der Startseite
- primären Stufe-0-CTA auf allen fünf Angebotsseiten
- nachgeordneten Projektsteuerungslink
- Ausschluss von Projektsteuerung als primärem CTA
- Ausschluss der falschen ARIA-Kennzeichnung
- Benennung beider Zielgruppen auf der Beteiligungsseite

## Prüfung und offene Punkte

Strukturell geprüft wurden:

- korrekte Linkziele der neuen CTAs
- konsistente Nutzerführung in den HTML-Dateien
- Entfernung der falschen ARIA-Kennzeichnung
- unveränderte `noindex,nofollow`-Sperren
- unveränderte Formular- und Datenwege

Nicht tatsächlich ausgeführt werden konnten:

- `npm test`
- visuelle Browserprüfung auf Desktop-, Tablet- und Mobilbreiten
- Prüfung der Browser-Konsole

## Sperrbestätigung

- keine neue Funktion
- keine neue Datenerfassung
- keine neuen Formulare
- keine Änderung bestehender Datenwege
- keine Produktivschaltung
- kein Deployment
- kein Merge nach `main`
- keine Veröffentlichung
