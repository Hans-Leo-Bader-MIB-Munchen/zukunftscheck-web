# ZS-WEB-005 – Vercel-Staging-Freigabe und Testplan v0.1

## Status

Interne Prüf- und Freigabefassung. Keine Produktivschaltung.

## Zweck

Dieses Dokument regelt die kontrollierte technische Anbindung des Repository-Standes an Vercel als Staging-Deployment. Es ersetzt keine Datenschutz-, Betreiber- oder Inhaltsfreigabe.

## Zulässiger Umfang

- Verbindung des privaten GitHub-Repositories mit einem Vercel-Projekt.
- Deployment ausschließlich aus `main` als kontrollierter technischer Teststand.
- Nutzung einer von Vercel bereitgestellten Vorschau- oder Projektadresse.
- Sichtprüfung der statischen Shell.

## Nicht zulässig

- keine Verbindung von zukunftscheck.org als Produktivdomain
- keine öffentliche Kommunikationsfreigabe
- keine Formulare, Uploads oder Datenerhebung
- keine Analyse-, Marketing- oder Trackingdienste
- keine Partnerweitergabe
- keine Verarbeitung von Echtdaten

## Technische Einstellungen

- Framework Preset: Other / Static Site
- Root Directory: Repository-Wurzel
- Build Command: leer
- Output Directory: leer
- Node- oder Package-Installation: nicht erforderlich
- Deployment-Schutz: Vercel Authentication aktivieren, sofern im Tarif verfügbar
- Environment Variables: keine

## Testfälle vor Freigabe des Staging-Standes

1. Die Staging-URL zeigt ausschließlich die statische ZukunftsCheck-Shell.
2. Die Seite enthält keine Eingabefelder, Kontaktwege oder Upload-Möglichkeiten.
3. Browser-Quelltext enthält keine externen Tracker oder Marketing-Skripte.
4. `noindex,nofollow` ist im HTML vorhanden.
5. Die Antwortheader enthalten `X-Robots-Tag: noindex, nofollow`.
6. Die Seite behauptet keine öffentliche oder fachliche Freigabe.
7. Es ist keine Custom Domain verbunden.

## Freigabegate

Die Staging-Anbindung darf erst als abgeschlossen gelten, wenn alle sieben Testfälle dokumentiert bestanden sind. Eine Domain-Anbindung, ein Formular oder eine Datenerhebung erfordern jeweils einen separaten dokumentierten Beschluss und einen neuen Pull Request.

## Steuerungsnachtrag

- ZS-020 Projektregister: ZS-WEB-005 als laufender technischer Prüfauftrag ergänzen.
- ZS-021 Entwicklungslogbuch: 02.07.2026 – Branch `feature/vercel-staging-gate` angelegt; Vercel-Staging-Gate v0.1 erstellt; keine technische Aktivierung erfolgt.
