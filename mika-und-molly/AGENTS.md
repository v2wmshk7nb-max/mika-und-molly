# Projektleitlinien für Codex: Mika & Molly

## Spielidee
Humorvolles, fiktives, deutschsprachiges 2D-Pixel-Art-Browser-Adventure „Mika & Molly – Dienstweg ins Chaos“. Mika ist eine gewissenhafte, perfektionistische Führungskraft in einem fiktiven Polizeiverwaltungsbüro; Molly eine ältere Büroangestellte, die Arbeitsaufträge ständig liegen lässt. Mika muss Molly dazu bringen, die Einladung für eine wichtige Führungsbesprechung **selbst** korrekt zu versenden.

## Mechaniken
- Steuerung per Pfeiltasten/WASD, Interaktion per Leertaste/Enter, bedienbare Bildschirmtasten.
- Begehbare Bürowelt, untersuchbare Gegenstände, Gespräche mit NPCs und Dialogauswahl.
- Stressanzeige 0–100; Konsequenzen von Entscheidungen; bei 100: „BURNOUT – GAME OVER“ und Neustart.
- Sieg nur, wenn Molly die Einladung selbst absendet.
- Zusammenhängende Rätselkette, etwa 20 Minuten Zielspielzeit, vier Haupträtsel und 2–3 optionale Nebenquests mit sinnvollen Effekten (Hinweise, Stressabbau, neue Dialogoptionen).

## Ton und Sicherheit
- Besonders wichtig: trockener, intelligenter, eskalierender und absurder Bürohumor; Witze durch Situationen, überraschende Dialoge und Timing statt dauernder Punchlines.
- Alle Figuren, Schauplätze und Ereignisse sind fiktionalisiert. Keine echten Dienststellen, Nachnamen oder klar identifizierenden Angaben erfinden.
- Keine angeblich überlieferten Zitate als reale Aussagen ausgeben. Insbesondere „Ich war gerade dabei“ ist keine belegte typische Ausrede.
- Mika ist kompetent, aber zunehmend gestresst; Molly ist unbeeindruckt und erfinderisch. Auch die Bürokratie und die anderen NPCs sind Teil der Satire.

## Technik
- Aktuell ein einzelnes `index.html` mit HTML, CSS und JavaScript und einer Canvas-Spielwelt. Für die ersten Iterationen keine externen Bibliotheken oder Netzwerkabhängigkeiten hinzufügen.
- Das Spiel soll per Doppelklick auf `index.html` in Safari/Chrome auf dem Mac starten; später auch auf dem iPhone bedienbar sein.
- Bevor größere Änderungen umgesetzt werden, vorhandene Funktionen lesen und bewahren; kein Neubau ohne ausdrücklichen Auftrag.
- In kleinen, überprüfbaren Schritten arbeiten. Nach Codeänderungen die jeweiligen Testschritte kurz beschreiben.
