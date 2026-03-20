# Testkatalog
## Testkatalog Mini-Projekt “Kürzester Weg”


**Funktionale Anforderungen:**

| Nr | Anforderung | Erwartetes Ergebnis | Tatsächliches Ergebnis |
|----|-------------|-------------------|----------------------|
| F1 | Die GUI soll eine Auswahl für Startpunkt und Zielpunkt anbieten. |	Beide Dropdowns sind sichtbar und auswählbar. |	✓ |
| F2 | Die Software soll den Dijkstra-Algorithmus auswählbar machen. |	Nach Auswahl von Dijkstra wird die Route mit Dijkstra berechnet. |	✓ |
| F3 | Die Software soll den A*-Algorithmus auswählbar machen. |	Nach Auswahl von A* wird die Route mit A* berechnet. |	✓ |
| F4 | Die Software soll einen Vergleich beider Algorithmen ermöglichen. |	Bei Auswahl „Beide“ werden Ergebnisse von Dijkstra und A* angezeigt. |	✓ |
| F5 | Die Software soll nach Klick auf „Berechnung starten“ eine Route berechnen. |	Eine gültige Route wird auf der Karte dargestellt. |	✓ |
| F6 | Die Software soll Zwischenschritte anzeigen können. |	Aktivierte Option zeigt die schrittweise Visualisierung der Berechnung. |	✓ |
| F7 | Die Software soll die Geschwindigkeit der Visualisierung einstellbar machen. |	Der Regler verändert die Zeit zwischen den Schritten. |	✓ |
| F8 | Die Software soll Ergebnisse und Statistik anzeigen. |	Distanz, Rechenzeit und untersuchte Kanten werden korrekt ausgegeben. |	✓ |



**Nicht-Funktionale Anforderungen:**

| Nr. | Anforderung | Erwartetes Ergebnis | Tatsächliches Ergebnis |
|----|-------------|-------------------|----------------------|
| NF1 | Die Benutzeroberfläche soll einfach und übersichtlich sein. | Nutzer findet Start, Ziel, Algorithmus und Button schnell. | ✓ |
| NF2 | Die Software soll verständlich bedienbar sein. | Beschriftungen wie „Startpunkt“, „Zielpunkt“ und „Berechnung starten“ sind klar. | ✓ |
| NF3 | Die Berechnung soll schnell reagieren. | Nach dem Start erscheint das Ergebnis ohne störende Wartezeit. | ✓ |
| NF4 | Die Darstellung soll stabil und fehlerfrei laufen. | Keine Abstürze, keine falsche Anzeige, keine leeren Felder ohne Grund. | ✓
