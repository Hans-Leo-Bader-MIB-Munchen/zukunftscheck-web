# ZS-WEB-OKTOBER-EVENTS-2026-001 – Arbeitsvermerk

Stand: 25.08.2026
Status: Branch-/Preview-Arbeitsstand; keine Produktivfreigabe

## Zweck
Begrenzte Erweiterung der bestehenden ZukunftsCheck-Webarchitektur um die Veranstaltungen am 9. und 10. Oktober 2026 in Walsrode und Altenwahlingen.

## Verbindliche Grenzen
- Keine Änderung der Stufe-0-Methodik.
- Keine automatische Überleitung Veranstaltung → Stufe 0 oder Stufe 1.
- Eventkontext ausschließlich für fachlichen Beitrag und allgemeinen Kontakt.
- Keine Anbieter-, Produkt- oder Technologieempfehlung durch den ZukunftsCheck.
- Keine automatische Weitergabe von Stufe-0-Anfragen an Veranstalter oder Anbieter.
- Keine Änderung von noindex/nofollow.
- Keine Änderung von /api/submit in diesem Arbeitsblock.

## Umgesetzter Branch-Stand
Branch: `feature/oktober-events-2026`
Ausgangscommit: `e954de32320c1441eecb8e358a1af84b7012c27d`

Umgesetzt:
- Eventregister um Walsrode und Altenwahlingen erweitert.
- Veranstaltungsübersicht angelegt.
- Detailseite Walsrode mit Plakat `09102026.jpeg` angelegt.
- Detailseite Altenwahlingen mit Plakat `10102026.jpeg` angelegt.
- Eventauswahl auf der Beteiligungsseite wird aus dem Eventregister ergänzt.
- Navigation führt auf die zentrale Veranstaltungsübersicht.
- Anbieter-/Praxisleistung Altenwahlingen und unabhängiger ZukunftsCheck-Einstieg ausdrücklich getrennt.

## Noch nicht umgesetzt
- Attributionsfeld „Wie sind Sie auf den ZukunftsCheck aufmerksam geworden?“.
- Änderungen an Datenschutztext oder API-Schema.
- SEO-/Indexierungsfreigabe.
- Merge auf `main` oder Produktivschaltung.

## Nächster Prüfpunkt
Preview visuell und funktional prüfen, insbesondere Mobilansicht, Poster-Darstellung, Eventauswahl sowie Negativprüfung, dass die Stufe-0-Anfrage keinen Eventkontext übernimmt.
