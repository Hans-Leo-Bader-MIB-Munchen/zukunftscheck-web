# ZS-WEB-UI-KONSISTENZCHECK-2026-001

## Zweck
Systematische visuelle Konsolidierung der ZukunftsCheck-Website nach dem Stand vom 26.08.2026.

## Ausgangsbefund
Mehrere historische CSS- und Theme-Schichten führen zu uneinheitlichen Seitenbreiten, Highlight-Flächen, CTA-Blöcken, Navigationsbezeichnungen und Kartenlogiken. Besonders sichtbar ist dies auf der Projektsteuerungsseite.

## Umfang dieses Arbeitsblocks
- globale Navigation vereinheitlichen
- zentrale Inhaltsbreiten und Abschnittsabstände vereinheitlichen
- Highlight- und CTA-Logik normalisieren
- Karten- und Panelgeometrie vereinheitlichen
- Projektsteuerungsseite visuell konsolidieren
- Veranstaltungsübersicht in zentrale Höhenlogik aufnehmen
- 404-Seite in globale Navigation und Theme-Logik integrieren
- Desktop-, Tablet- und Mobile-Sichtprüfung vor Merge

## Nicht Gegenstand
- keine Inhaltsänderung
- keine Änderung von Formularfeldern oder Datenwegen
- keine Änderung von `/api/submit`
- keine Änderung der ZukunftsCheck-Stufen oder Methodik
- keine SEO-/Indexierungsfreigabe
- kein automatischer Merge auf `main`

## Branch
`design/systematischer-ui-konsistenzcheck-2026`

## Freigaberegel
Merge auf `main` ausschließlich nach visueller Prüfung des Vercel-Previews und ausdrücklicher Freigabe.
