# ZS-WEB-REFERENZKERN-v3.0-WIRKUNGSARCHITEKTUR-v1.3.0-GESAMTDARSTELLUNG-v1.2-KONSISTENZKORREKTUR-2026-001

## Status
Arbeits- und Änderungsvermerk v0.1

## Gegenstand
Eng begrenzte Konsistenzkorrektur der bereits weitgehend zutreffenden Website gegen den Referenzkern ZukunftsCheck v3.0, die Systemische Wirkungsarchitektur v1.3.0 und die Gesamtdarstellung v1.2.

## Geänderte Dateien
- `public/index.html`
- `public/teilnahme.html`
- `public/participation.js`
- `tests/preview-check.mjs`

## Inhaltliche Korrekturen
- Stufe 0 als kostenfreie, knappe, begrenzte und manuelle Passungsprüfung präzisiert.
- Stufe 1 als strukturierte, dokumentenbasierte und begrenzte Orientierungs- und Zusammenhangsprüfung beschrieben.
- Stufe 2 durch eine konsistente Darstellung des nicht operativ freigegebenen Kern-Modul-Ansatzes ersetzt.
- Keine endgültigen Anwendungsprofile, Vertiefungsmodule, Statuscodes, Fragenkataloge oder allgemeine Ergebnisbezeichnung behauptet.
- Keine operative, pilotpraktische oder produktive Implementierung behauptet.
- Automatische Übergänge ausgeschlossen.
- Fachanschlüsse weiterhin außerhalb des Stufenmodells geführt.

## Technische Korrektur
Die dynamische Überschreibung der Stufentexte in `public/participation.js` wurde entfernt. Fachliche Inhalte werden damit ausschließlich statisch in der HTML-Datei geführt; widersprüchliche Doppelpflege wird vermieden.

## Tests
`tests/preview-check.mjs` wurde auf die verbindlichen Begriffe, Statusgrenzen und Ausschlüsse fortgeschrieben. Der Test prüft insbesondere:
- keine Stufe 3;
- korrekte Stufe-0-Passungsprüfung;
- vollständige Stufe-1-Funktion;
- Kern-Modul-Ansatz ohne operative Überdehnung;
- keine bereits verfügbaren Prüfmodule;
- keine dynamische Fachtextüberschreibung;
- unveränderte Formular-, Datenschutz- und Datensparsamkeitsgrenzen.

## Nicht verändert
- API- und Formularverarbeitung;
- Datenschutzdatenwege;
- Upload- und Tracking-Sperren;
- Fachunterseiten, soweit bereits konsistent;
- Design- und Markenarchitektur;
- Produkt-, Preis-, Pilot- oder Betriebsstatus.

## Governance
Die Änderung erfolgt im Branch `feature/zs-web-konsistenzkorrektur-2026-001` und wird über einen Pull Request gegen `main` geführt. Ein Direkt-Push auf `main` erfolgt nicht.

## Vorläufige Entscheidung
Die Website-Grundarchitektur bleibt bestätigt. Die Änderungen sind auf fachliche Präzisierung, statische Konsistenz und Testabsicherung begrenzt. Eine öffentliche Aktivierung oder neue Außenfreigabe ist damit nicht verbunden.
