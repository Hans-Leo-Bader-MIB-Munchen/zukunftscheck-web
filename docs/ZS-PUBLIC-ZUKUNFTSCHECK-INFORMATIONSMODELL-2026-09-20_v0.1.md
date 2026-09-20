# ZS-PUBLIC-ZUKUNFTSCHECK-INFORMATIONSMODELL-2026-09-20 v0.1

Status: INTERN / ALK-STRICT / ENTWURF / KEINE AUSSENFREIGABE
Stand: 20.09.2026
Pilotfall: Essen – Stadtwald und funktionale Klimaanpassung

## 1. Zweck
Dieses Informationsmodell definiert, wie ein laufender ZukunftsCheck öffentlich nachvollziehbar werden kann, ohne vorläufige Arbeitsstände als Befunde auszugeben. Es ist zunächst ein internes Testmodell am Fall Essen und noch keine öffentliche Fallseite.

## 2. Grundregel
Ein offener ZukunftsCheck zeigt nicht nur ein Ergebnis, sondern den jeweils belegbaren Prüfstand. Jede Information muss einer Statusklasse zugeordnet werden. Änderungen bleiben nachvollziehbar.

## 3. Sechs Informationsebenen
### A. Ausgangsfrage
Welche konkrete Frage wird geprüft, warum ist sie relevant und was wird ausdrücklich nicht vorweggenommen?

### B. Aktueller Prüfstand
Kurze datierte Zusammenfassung: Wo steht die Prüfung heute? Welche Teilfragen sind abgeschlossen, offen oder blockiert?

### C. Gesicherte Tatsachen
Nur dokumentierte und reproduzierbar belegte Tatsachen. Quelle, Datum und Reichweite müssen sichtbar sein. Keine Interpretation als Tatsachenlabel.

### D. Prüf-Hypothesen und offene Fragen
Hypothesen werden ausdrücklich als Hypothesen gekennzeichnet. Sie dürfen weder Kausalität noch Fehlverhalten oder Rechtswidrigkeit vorwegnehmen.

### E. Laufende externe Prüfung und Datenzugang
Sichtbar werden können Datenanfragen, methodische Rückfragen, externe Expertise und Gegenchecks. Dabei wird getrennt zwischen angefragt, beantwortet, geprüft und übernommen/nicht übernommen.

### F. Änderungs- und Befundprotokoll
Datierte Deltas dokumentieren, was sich durch neue Daten oder Gegenprüfung geändert hat. Frühere Arbeitsstände werden nicht stillschweigend überschrieben.

## 4. Statussystem
- GESICHERT – dokumentierte Tatsache innerhalb klarer Reichweite.
- PRÜFHYPOTHESE – plausible, aber noch zu prüfende Annahme.
- OFFEN – relevante Frage ohne belastbare Antwort.
- ANGEFRAGT – externe Information/Daten wurden angefragt.
- RÜCKLAUF – Antwort liegt vor, ist aber noch nicht abschließend eingeordnet.
- GEGENCHECK – Befund wird unabhängig oder methodisch gegengeprüft.
- KORRIGIERT – früherer Arbeitsstand wurde aufgrund neuer Evidenz geändert.
- BLOCKIERT – Fortgang hängt von Daten, Freigabe oder methodischer Klärung ab.
- BEFUND – nach Prüfung belastbarer Teil- oder Abschlussbefund mit definierter Reichweite.

## 5. Essen als Testfall
### 5.1 Ausgangsfrage v0.1
Zu prüfen ist, ob Veränderungen von Stadtwald und städtischem Baumbestand in Essen funktionale Klimaanpassungsleistungen wie Kühlung, Verschattung, Wasserrückhalt, räumliche Vernetzung oder Regenerationsfähigkeit relevant verändern und ob vorhandene kommunale Daten diese Veränderungen hinreichend räumlich-funktional sichtbar machen können.

Nicht vorweggenommen werden Fehlbewirtschaftung, Kausalität einzelner Fällungen oder ein bestimmtes rechtliches Abwägungsergebnis.

### 5.2 Aktueller Prüfstand
- Amtliche Angaben zur Kronen-Beschirmungsfläche 2022 und 2024 sind dokumentiert.
- Ein reproduzierbarer öffentlicher Direktzugang zum abgeleiteten Essener Kronenschirm-Datensatz wurde bislang nicht verifiziert.
- Technische Datenanfrage an Amt 62/Open Data ist versandt; Rücklauf offen.
- ECONICS/Ibisch ist als methodische Prüfspur vorbereitet, aber noch nicht versandt; zusätzlicher Hambach-/Sophienhöhe-Input wird vor Versand als Delta geprüft.
- H-AWG1 zur möglichen asymmetrischen Abwägungsgewichtung ist Prüf-Hypothese, kein Rechtswidrigkeitsbefund.

### 5.3 Öffentliche Darstellung derzeit
BLOCKIERT. Essen bleibt bis zum gesonderten PUBLIC-ZUKUNFTSCHECK-GATE intern. Der vorliegende Aufbau dient ausschließlich dazu zu testen, ob ein komplexer laufender Prüfprozess transparent und verständlich abbildbar ist.

## 6. Darstellungslogik für eine spätere Fallseite
Oben: Titel + Status + Datum + Ein-Satz-Ausgangsfrage.
Danach: „Was ist gesichert?“ / „Was prüfen wir?“ / „Was fehlt noch?“.
Vertiefung: Quellen und Daten, externe Prüfungen, Gegenpositionen, methodische Grenzen.
Abschluss: datiertes Änderungsprotokoll und jeweils aktuell belastbare Teilbefunde.
Komplexität wird gestuft dargestellt; die Kurzebene muss ohne Kenntnis der Detailakte verständlich bleiben.

## 7. Prominenz-Gate
Eine prominente Darstellung eines laufenden ZukunftsChecks auf der Startseite wird erst entschieden, wenn:
1. der Fall öffentlich angenommen/freigegeben ist,
2. eine verständliche Kurzfassung des Prüfstands existiert,
3. Status und Aktualisierungslogik belastbar funktionieren,
4. keine vorläufige Hypothese wie ein Befund erscheint.

Mögliche spätere Form: „Aktueller ZukunftsCheck – Prüfung läuft“. Keine Festlegung in v0.1.

## 8. ALK-Gate
Informationsarchitektur: B / TESTFÄHIG.
Keine Veröffentlichung. Keine Sachentscheidung zum Essen-Fall. Nächster Schritt ist ein interner Seitenprototyp auf dem Feature-Branch, der ausschließlich diese Status- und Informationsebenen testet.
