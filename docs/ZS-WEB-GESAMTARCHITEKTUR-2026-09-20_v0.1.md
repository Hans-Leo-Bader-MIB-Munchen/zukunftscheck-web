# ZS-WEB-GESAMTARCHITEKTUR-2026-09-20 v0.1

Status: INTERN / ALK-STRICT / ARCHITEKTUR-GATE BESTANDEN / KEINE AUSSENFREIGABE
Stand: 20.09.2026
Branch: feature/gesamtarchitektur-v0-1

## 1. Anlass
Einordnung von ZukunftsCheck, Wärmewende, Kampagne, Praxisfällen und Regenerativer Region in einen gemeinsamen Gesamtzusammenhang, ohne bestehende fachliche oder Governance-Grenzen aufzuheben.

## 2. Bestandsbefund
- Die Website bleibt methodisch und kommunikativ eine ZukunftsCheck-Website.
- Die bestehende Navigation enthält bereits Praxis, Beteiligung und Veranstaltungen.
- Die Startseite enthält bereits einen dynamisch erzeugten Praxisblock.
- Regenerative Region ist nach bestehender Drive-Baseline strategische Entwicklungsarchitektur und derzeit kein öffentlich freigegebenes Angebot.
- Wärmewende ist kein eigenes Top-Level-Projekt, sondern operativer Kampagnen-/Umsetzungscluster innerhalb der Regenerativen Region mit Schnittstellen zum ZukunftsCheck.
- ZukunftsCheck bleibt eigenständig, technologieoffen und ergebnisoffen; Kampagne, Fachplanung und Umsetzung sind nicht Bestandteil der Methode.

## 3. Zielarchitektur
Verbindungsarchitektur, keine Verschmelzung:

Regenerative Region
↕
Wärmewende / weitere reale Transformationsfelder
↕
Information, Medien, Kampagne und Beteiligung
↕
ZukunftsCheck als unabhängiges Prüfverfahren
↕
Entscheidung
↕
gegebenenfalls gesonderte Fachplanung und Umsetzung

Die Pfeile bezeichnen Anschlussfähigkeit, keine automatische Prozesskette und keine organisatorische Unterordnung des ZukunftsChecks.

## 4. Web-Rollen
### 4.1 ZukunftsCheck
BESTEHEND / FÜHREND.
Startseite und Methode bleiben auf Orientierung, Strukturierung, Ergebnisoffenheit und nächsten belastbaren Schritt ausgerichtet.

### 4.2 Praxis
BESTEHEND / AUFWERTEN.
Praxis dokumentiert nicht nur Ergebnisse, sondern nachvollziehbare Prüfwege. Offene Prüfprozesse können sichtbar werden, sofern Fakten, Hypothesen, offene Daten, externe Prüfung und Gegencheck klar getrennt sind.

### 4.3 Essen
VORBEREITEN / PUBLIC-GATE GESPERRT.
Arbeitstitel: „ZukunftsCheck Essen – Stadtwald und funktionale Klimaanpassung“.
Essen ist Kandidat für einen offenen Praxis-/Demonstrationsfall des ZukunftsChecks. Keine Veröffentlichung vor eigenem Public-Gate. Keine Vorfestlegung von forstlichem Fehlverhalten, Kausalität einzelner Fällungen oder rechtlichem Abwägungsergebnis.

### 4.4 Wärmewende
ANSCHLUSS DARSTELLEN / NICHT MIT ZUKUNFTSCHECK VERSCHMELZEN.
Die Wärmewende kann Information, Aktivierung und konkrete Fragestellungen erzeugen. Ein ZukunftsCheck kann anschließend unabhängig prüfen. Fachplanung und Umsetzung folgen nur aufgrund eigener Entscheidungen und Aufträge.

### 4.5 Regenerative Region
STRATEGISCHER GESAMTZUSAMMENHANG / AUSSENFREIGABE GESPERRT.
Die Regenerative Region kann perspektivisch Energie, Wärme, Wasser, Böden, Vegetation, Biodiversität, Siedlungsentwicklung und regionale Wertschöpfung in einen größeren Entwicklungsrahmen stellen. Keine öffentliche Angebots-, Partner- oder Droege-Behauptung aus diesem Dokument.

## 5. Startseiten-Architektur
Bestehenden Hero und die ZukunftsCheck-Kernpositionierung nicht ersetzen.

Vorgesehener neuer Orientierungsblock nach der methodischen Einführung:
„Vom einzelnen Vorhaben zum größeren Zusammenhang“

Drei getrennte Anschlussräume:
1. Praxisfälle – konkrete ZukunftsChecks und ihre Prüfwege.
2. Wärmewende – konkretes Transformationsfeld mit Information, Entscheidung, Prüfung und möglicher Umsetzung.
3. Regenerative Region – größere strategische Perspektive regionaler Regeneration.

Bis zur jeweiligen Freigabe dürfen gesperrte Bereiche nur intern vorbereitet und nicht öffentlich ausgespielt werden.

## 6. Schutzregeln
- ZukunftsCheck bleibt ergebnisoffen und technologieoffen.
- Kampagne ≠ ZukunftsCheck.
- Regenerative Region ≠ Basis-ZukunftsCheck.
- Wärmewende ≠ automatische ZukunftsCheck-Folge.
- ZukunftsCheck-Ergebnis ≠ Empfehlung eines vorab bestimmten Umsetzungspartners oder einer Technologie.
- Essen bleibt bis zum Public-Gate unveröffentlicht.
- Keine Partnerbehauptung zu Peter Droege oder anderen Personen ohne gesonderte Freigabe.
- Keine Änderung von main ohne Branch-Prüfung, Readback und Freigabe.

## 7. Architektur-Gate
Ergebnis: A / PASS.
Keine Grundmodelländerung erforderlich. Die bestehende Website kann durch eine klar getrennte Anschluss- und Praxisarchitektur erweitert werden.

## 8. Operativer nächster Schritt
Auf feature/gesamtarchitektur-v0-1 zunächst nur strukturelle, nicht veröffentlichte Webfassung vorbereiten. Keine Essen-Veröffentlichung und keine Außenfreigabe Regenerative Region. Danach Code-Readback, Konsistenzcheck und visuelle Desktop-/Mobilprüfung. Erst nach bestandenem Gegencheck Entscheidung über Merge bzw. weitere Freigabegates.
