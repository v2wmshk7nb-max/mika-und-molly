# Mika & Molly – Dienstweg ins Chaos

Lokales Büro-Adventure, Version 0.8. Sechs Räume, drei spielbare Vorgehensweisen, unabhängige Sachvorgänge, neue Kombinationsrätsel und erinnernde NPCs. Grafik, kontinuierliche Bewegung, deutsche Browser-Sprachausgabe und Mollys cinematisches Gespräch bleiben erhalten. Das gesamte Spiel steckt in `index.html`; keine Bibliotheken, Downloads oder Build-Umgebung nötig.


## Version 0.8 – Molly, Führung und animierte Szenen

Molly verschiebt, verwechselt Speichern mit Versenden und versucht, Mika die Arbeit zurückzugeben. Die drei bisherigen Wege, sechs Räume, Rätsel, Nebenquests, Nahansichten und die flüssige Bewegung bleiben erhalten. Der Sieg erfordert weiterhin Mollys eigenen Versand der geprüften Einladung.

### Entscheidungen und spätere Folgen

- **Kooperativ:** Das Gespräch beruhigt Mika zunächst. Dieter hilft weiterhin mit Papier. Molly legt die freundliche Zusage später als unverbindlich ab; das belastet Mika beim letzten Gespräch. Eine vorher bei Molly gesetzte Frist „vor der nächsten Pause“ verringert diese Folge.
- **Konsequent:** Eine klare Anweisung entlastet Mika. Materialfreigabe und eigene Abnahme bleiben erhalten. Molly übernimmt hastig die alte Uhrzeit; der bestehende Belegabgleich korrigiert sie. Klare Führung ist eine vollwertige, sichere Lösung.
- **Formell:** Die zusätzliche Rückfrage kostet zunächst Nerven. Schriftliche Auskünfte helfen weiterhin. Später verwechselt Molly den Aktenabschluss mit dem Versand; beim Finale erleichtert die vorbereitete Akte die verbindliche Bestätigung.
- **Finale:** Nach der Entwurfskorrektur kann Mika auf sofortigem Versand bestehen, Kollegen um Rückendeckung bitten oder eine offizielle Bestätigung verlangen. Frist, Vorgehen und ein früherer unberichtigter Vorwurf beeinflussen die Wirkung. Unnötige Schrift- und Abstandskorrekturen kosten dagegen Nerven. Molly klickt bei allen erfolgreichen Varianten selbst.

Entscheidungen und Erinnerungen gelten innerhalb der Partie. Es gibt weiterhin keinen dauerhaften Spielstand. Ein Wechsel des Vorgehens entfernt keine Belege. Entlastungen je Vorgehen, Frist und Nebenquest sind begrenzt und lassen sich nicht durch wiederholtes Anklicken sammeln.

### Stress und Inszenierung

Keine Stresskosten für Laufen, Warten oder Erkunden. Mollys erste Verweigerung und die späte Folge des Führungswegs wirken einmalig. Unvermeidbare Storykosten stoppen spätestens knapp unter Burnout, damit eine noch lebende Partie gewinnbar bleibt. Bewusst wiederholtes Nachfragen, Fehlschläge, Vorwürfe und Perfektionismus können dagegen 100 erreichen. Die Zahlen einzelner Entscheidungen bleiben unsichtbar.

Mika zeigt bei mittlerem Stress gelegentliche Stirngesten, bei hohem Stress Anspannung und Schweiß. Kurz vor dem Limit folgen eine kurze Nahansicht und eine deutliche Umrandung der Anzeige. Die Steuerung wird nicht künstlich erschwert. Kaffeepause, Pflanze, Stempel und erfolgreiche Aufgaben bleiben begrenzte Entlastungen.

Die neue Szenenansicht verwendet ausschließlich lokal erzeugte SVG-Grafik mit zeitgesteuerten Figuren, Requisiten und Kamerabewegungen:

- **A – Überraschung:** Beim ersten Betreten von Mollys Büro greift sie hastig zum verdrehten Ordner.
- **B – Alte Vorlage:** Beim Untersuchen des ursprünglichen Entwurfs, spätestens vor dem Finale, zoomt die Ansicht auf die zurückgezogene Anlage und zeigt Mikas Reaktion.
- **C – Gerät:** Beim ersten Druckerbesuch fliegen Blätter aus dem Gerät. Die vorhandenen Optionen erlauben Diagnose oder einen nutzlosen Neustart. Ein überlaufender Kaffee hat zusätzlich seine eigene Animation und die bestehende Aufräumaktion.
- **D – Konfrontation:** Nach allen Voraussetzungen wechseln die Einstellungen zwischen Mika und Molly. Anschließend folgen Entwurfskorrektur und Führungsentscheidung.
- **Versand:** Molly bewegt den Arm zum Rechner; die Anzeige wechselt auf „Gesendet“.
- **Burnout:** Bewegung und Sprache stoppen sofort, die Kamera nähert sich Mika, sein Kopf sinkt auf den Schreibtisch, das Bild dunkelt ab. Danach erscheint **BURNOUT – GAME OVER** mit Neustart.

Szenen dauern drei bis acht Sekunden. „Überspringen“, Escape, Enter oder Leertaste führen denselben Abschluss wie das natürliche Ende aus. Unterbrochene Nahansichten und Gespräche werden wiederhergestellt. Kein Questfortschritt hängt davon ab, die Animation vollständig anzusehen. Die Systemoption für reduzierte Bewegung verwendet ruhigere Standphasen. Die optionale Sprachausgabe liest kurze Szenenzeilen; „Geräusche“ aktiviert dezente synthetische Signale. Es gibt keine Musikdateien oder Netzwerkabhängigkeiten.

### Neue Version konkret testen

1. `index.html` doppelklicken oder die vorhandene Browserseite neu laden. Einführung beenden, Mollys Büro betreten: Szene A ansehen; bei einem zweiten Neustart überspringen. Danach muss Mika wieder laufen können.
2. Mit Molly sprechen und einen Weg wählen. Auf dem kooperativen Weg einmal ohne und einmal mit der zusätzlichen Frist spielen. Beim letzten Gespräch fallen ihre Reaktion und die Belastung unterschiedlich aus.
3. Mollys Posteingang öffnen: Szene B und lesbarer Entwurf. Den Drucker im Archiv untersuchen: Szene C, dann Diagnose oder Neustart. In der Küche großen Kaffee bestellen und anschließend aufwischen.
4. Die vorhandenen Rätsel lösen und gegebenenfalls Abnahme beziehungsweise Abschlussanruf erledigen. Zu Molly zurückkehren: Szene D, alte Uhrzeit korrigieren, Versand verlangen. Je Partie eine andere Schlussentscheidung ausprobieren.
5. Bei Molly wiederholt nach dem Stand fragen oder mehrfach bewusst falsche Entscheidungen treffen: Bei 100 muss die Burnout-Szene erscheinen. Überspringen und natürlichen Abschluss getrennt testen; anschließend „Neuer Montag“.
6. Auf schmalem Fenster (etwa 390 px) und Laptopbreite kontrollieren: Szenengrafik, Text, Geräusche-Schalter und Überspringen müssen erreichbar bleiben. Escape während Objektansicht, Szene und Gespräch prüfen. Vorlesen aktivieren und beim Szenenwechsel auf abgebrochene alte Sprache achten.

**Tatsächlich geprüft:** Automatisierte Node-Tests der drei vollständigen Wege, sechs Wechsel, Dialognavigation, Kollisionen, Aufgaben, begrenzter Entlastung, aller acht Animationen mit unterschiedlichen Renderständen, natürlichem Ende und Abbruch, Modalwiederherstellung, Neustart, einmaligen Folgekosten, Fristwirkung und 27 Kombinationen aus Schlussentscheidung, Vorgehen und niedrigem/mittlerem/hohem Stress. Sichere Führung bei 99 und Burnout durch wiederholtes Hinterherfragen sind ebenfalls geprüft. Szenengrafiken wurden als statische SVG-Bilder gerendert und visuell kontrolliert.

**Noch offen:** Echtes manuelles Safari-/Chrome-Probespiel, tatsächliche Fokus- und Layoutwirkung bei verschiedenen Fenstergrößen, hörbare Browserstimmen und Geräusche sowie das Spielgefühl und die Zielspielzeit von 15–20 Minuten. Die verfügbare Browsersteuerung konnte lokale Dateien nicht öffnen; die automatisierten DOM-Simulationen ersetzen diesen Test nicht.

## Start und Bedienung

1. `index.html` im Finder doppelklicken und in Safari oder Chrome öffnen. Eine bereits geöffnete Version neu laden. Petras Anruf startet automatisch; mit „Weiter“, Enter oder Leertaste durch die sechs kurzen Sprechblasen gehen oder den Einstieg überspringen.
2. Pfeiltasten oder WASD halten; Loslassen stoppt Mika. Diagonalen, Möbelkollisionen und Laufanimation bleiben erhalten. Auch die Bildschirmtasten lassen sich halten.
3. Freie Stelle, Objekt oder Tür anklicken: Mika sucht einen Weg und untersucht das Ziel bei Ankunft. Alternativ Enter/Leertaste oder Aktionstaste beim nächsten Objekt.
4. Antworten per Button wählen; Rätsel über Auswahlfelder bearbeiten. Escape, „Weitergehen“, „Schließen“ oder „Später“ verlassen die Ansicht. Solange Antworten oder ein großes Fenster offen sind, pausiert die Bewegung.
5. **Aufträge & Entdeckungen** rechts neben der Welt ein-/ausklappen. Auf schmalen Bildschirmen steht das Menü unter der Karte. Genau ein konkreter nächster Hauptschritt, entdeckte Nebenaufgaben und erledigte Aufgaben aktualisieren sich automatisch. Die dauerhaft sichtbare Zielkarte über der Welt nennt zusätzlich den Ort. Ihr Hilfe-Button bietet drei freiwillige Stufen.
6. Das Notizbuch enthält gefundene Belege, Gegenstände und die Entscheidungshistorie. Denkanstöße orientieren sich am Wissensstand; sie verraten keine vollständigen Lösungen.

Entscheidungen, NPC-Erinnerungen, Belege und Fortschritt bleiben innerhalb der laufenden Partie erhalten. Es gibt noch keinen dauerhaften Speicherstand: Neuladen oder Neustart beginnt einen neuen Montag.

## Reparierte Dialognavigation und neue Inszenierung

**Fehlerursache:** Die alte Eröffnung hatte elf Szenenabschnitte, aber zusätzlich eine zweite Navigation für einzelne Sprechblasen. Der Zähler zeigte etwa „1 / 11“, während der Weiter-Button in der Blase wegen ihrer einzigen lokalen Textseite ausgeblendet und deaktiviert war. Der tatsächlich funktionierende Szenen-Button stand separat unter der Karte; der Tastaturfokus lag auf „Überspringen“. Die Tests hatten bisher nur diesen separaten Button direkt aufgerufen und die widersprüchlichen Bedienelemente nicht geprüft.

Jetzt verwenden Einführung, Molly-Szenen und normale Texte dieselbe sichtbare Seitennavigation. Zurück, Weiter, Seitenzahl und Abschluss beziehen sich auf dieselbe Folge. Der Fokus bleibt beim passenden Weiter-Button beziehungsweise wandert am Ende zu den echten Antworten. Enter und Leertaste setzen fort; Antwortbuttons und Formulare behalten ihre normale Bedienung. Doppelklicks, gehaltene Tasten, sehr schnelle Folgeeingaben und veraltete Antwort-Handler lösen keine mehrfachen Schritte aus. Escape und Schließen geben die Bewegung wieder frei. Der eigentliche Einstieg ist auf sechs kurze Seiten gekürzt; die ursprüngliche elfseitige Fassung wird einschließlich Seite 11 und Abschluss ausdrücklich als Regressionstest durchlaufen.

Die Geschichte wird durch kurze, kontrollierte Ereignisse begleitet:

- **Nach Molly:** Mika denkt über die eine einzige Einladung nach, während Molly kurz an der Flurtür auftaucht.
- **Bei der Ankunft:** Dieter schaut im Archiv herein; Petra begrüßt Mika beim Besprechungsraum und bestätigt später im Büro den gebuchten Raum.
- **Bei wichtigen Funden:** Alte Vorlage, widersprüchliche Aushänge, Druckerdiagnose und Tagesordnung lösen kurze Kommentare und dezente Hervorhebungen in der Nahansicht aus. Bereits sichtbare Dokumenttexte werden nicht noch einmal vollständig vorgelesen.
- **Bei Erfolgen:** Gemeinsames Sortieren, verbindlicher Auftrag, formelle Klärung, Buchung, Testseite und Empfängerprüfung erhalten kurze Reaktionen. Der neue Auftrag wird sichtbar hervorgehoben und nennt weiterhin Ort und Zweck.
- **Bei Folgen:** Der voreilige Rundruf kann Petra im Flur zu einer Bemerkung veranlassen. Kaffeepfütze, Aufräumen, ruppige Kopiererbedienung und zurückgebrachter Stempel erhalten eigene Reaktionen.
- **Bei Stress:** Mika führt kurz die Hand an die Stirn; sehr hoher Stress ist zusätzlich im Gesicht sichtbar. Die vorhandenen Stresskosten ändern sich dadurch nicht.
- **Zum Schluss:** Molly sendet selbst; Petras Eingangsbestätigung erscheint im Abschlussgespräch.

Gedanken und Besucherauftritte dauern wenige Sekunden, verlangen keinen zusätzlichen Klick und blockieren keine Wege. Sie werden kontrolliert einmalig ausgelöst. Beim Raumwechsel verschwinden alte Kommentare; wichtige Erfolge verdrängen überholte Nebenbemerkungen. Das dritte Untersuchen eines Gegenstands kann einmal pro Partie einen selbstironischen Kommentar auslösen. Alle vorhandenen Rätsel und Entscheidungswege bleiben erhalten.

### Dialog- und Szenentest

1. Neu laden. Alle **sechs** Einführungsseiten mit dem Weiter-Button **in der Sprechblase** durchlaufen. Zurück ausprobieren; anschließend Enter und Leertaste verwenden. Danach muss Mika frei laufen können und das Ziel zu Molly führen.
2. Schnell doppelklicken oder Enter halten: Es darf keine Serie von Seiten übersprungen werden. Einen Dialog per Escape schließen und erneut öffnen.
3. Bei Molly bis zu den Antworten blättern. Enter ohne ausgewählte Antwort darf keine Entscheidung treffen. Ein bewusst fokussierter Antwortbutton muss normal funktionieren.
4. Molly verlassen, ins Archiv gehen und die kurzen Auftritte beobachten. Raum wechseln oder weiterlaufen: Kein Ereignis darf einen Weg versperren.
5. Alte Vorlage beziehungsweise Tagesordnung ansehen, Raum buchen, Testseite drucken und Versanddaten prüfen. Kurze Reaktionen und „NEUER AUFTRAG“ beobachten. Alle drei Wege funktionieren weiterhin mit den unten dokumentierten Lösungen.
6. Kaffeepfütze verursachen und aufwischen, Vorwurf am Telefon äußern und berichtigen. Bei hohem Stress auf Mikas Stirngeste achten. Burnout muss weiterhin zum Neustart führen.

**Prüfstand:** Automatisierte Tests umfassen die alte Seite 11, die neue Einführung, Maus-/Tastaturereignisse, Doppelklicks, Tastenwiederholung, veraltete Handler, Abschluss und Abbruch sowie alle Hauptwege und die neuen Ereignisse. Besucher und Stressgesten wurden zusätzlich als Canvas-Zeichnungen statisch kontrolliert. Ein manueller Test im echten Browser wurde nicht durchgeführt: Die verfügbare Browsersteuerung blockiert lokale `file://`-Seiten. Darstellung, Fokusverhalten und hörbare Ausgabe bitte daher auch direkt in Safari/Chrome anhand dieser Schritte prüfen.

## Einstieg und roter Faden

Das Spiel beginnt mit einem kurzen Telefonat: Petra fragt nach der Einladung zur Besprechung. Mika verweist selbstbewusst auf Molly und seine sorgfältig gewählte Schriftgröße. Petra merkt an, dass bislang nicht einmal der Raum bestätigt ist. Mika beschließt, Molly zu fragen. Die Szene nutzt sechs kurze Sprechblasen, ein sichtbar klingelndes Telefon und die vorhandene optionale Sprachausgabe. Sie läuft im eigenen Tempo und lässt sich jederzeit überspringen. Es gibt keine erzwungenen Wartezeiten oder automatische Tonwiedergabe.

Der Verlauf hat jetzt erkennbare Stationen:

1. **Petra ruft an → Molly fragen.** Schon vor der freien Erkundung steht fest: Für Mittwoch fehlt eine korrekte Einladung, und Molly soll sie selbst verschicken.
2. **Molly weicht aus → Mika legt das Vorgehen fest.** Raum fehlt, Drucker streikt, Empfängerliste und Anhang stammen aus einer alten Vorlage. Kooperation, klare Führung und formelle Klärung bleiben spielbare Alternativen.
3. **Termin klären → Petra bestätigt Raum und Zeit.** Terminmappe, Raumplan und Dieters Erklärung liefern einen begründeten Vorschlag. Petra reagiert auf die Buchung; die Tagesordnung übernimmt die bestätigten Angaben.
4. **Technik-Ausrede klären → eine Testseite drucken.** Materialhilfe, Freigabe oder Schrankcode führen wie bisher zum Papier. Die erfolgreiche Testseite zeigt, dass das Gerät funktioniert.
5. **Alte Vorlage berichtigen → richtige Menschen und richtige Anlage.** Rundschreiben, Register und Tagesordnung erklären ihre Bedeutung für den Versand. Mika bestätigt den Abgleich.
6. **Zusage erfüllen → gemeinsam prüfen und Molly senden lassen.** Je nach Weg bleiben eigene Abnahme oder Abschlussanruf nötig. Molly korrigiert die alte Uhrzeit und klickt selbst auf Senden. Petra bestätigt den Eingang.

Die Reihenfolge der drei Sachaufgaben bleibt frei. Reaktionen und Empfehlungen berücksichtigen bereits erledigte Arbeit; sie schicken Mika nicht zu einem abgeschlossenen Vorgang zurück. Die Zielkarte bleibt auch bei eingeklapptem Auftragsmenü sichtbar. Darunter stehen ein kurzer Rückblick auf das letzte Ereignis und der Grund für den nächsten Schritt. Nebenaufgaben sind im Auftragsmenü separat eingeklappt.

### Informationen und Hilfe

Vor dem ersten Gespräch mit Molly zeigen wichtige Gegenstände zunächst eine kurze Einordnung statt einer Liste von Verwaltungsangaben. „Erst mit Molly sprechen“ führt zurück ins Büro. Wer bewusst erkunden möchte, kann „Trotzdem genauer ansehen“ wählen; dabei gesammelte Belege bleiben erhalten. Nach Mollys Erklärung öffnen sich dieselben Objekte direkt mit ihren Informationen. Neue Hinweise erklären jeweils, wofür sie nützlich sind. Es entsteht keine neue Pflichtaufgabe durch das frühe Untersuchen.

Die Hilfe zur aktuellen Zielkarte hat drei Stufen:

- **1:** Warum dieser Schritt gerade wichtig ist.
- **2:** Worauf Mika bei der nächsten Handlung achten sollte.
- **3:** Weg vom aktuellen Raum zum konkreten Gegenstand oder NPC, einschließlich der nächsten Handlung.

Hilfe kostet keinen Stress. Bei einem neuen Hauptschritt werden alte Tipps ausgeblendet. Alle drei Entscheidungswege und spätere Wechsel werden berücksichtigt. Alte Denkanstöße im Notizbuch verweisen bei erledigten Vorgängen auf das aktuelle Ziel.

### Die Geschichte testen

- Neu laden, den ganzen Anruf durchspielen: Danach muss „Sprich mit Molly“ samt Ortsangabe erscheinen. Bei einem zweiten Start den Einstieg überspringen; dasselbe Ziel muss erreichbar sein.
- Vor Molly ein wichtiges Dokument öffnen: Es zeigt zunächst eine Einordnung. Schließen, Molly sprechen und später wiederkommen: Jetzt sind die Belege regulär lesbar. Alternativ frühe Details ausdrücklich öffnen und kontrollieren, dass der Fund erhalten bleibt.
- Jeden der drei unten beschriebenen Lösungswege spielen. Nach Buchung, Testseite und Empfängerprüfung auf die kurzen Reaktionen und den nächsten begründeten Schritt achten.
- Hilfe bis Stufe 3 öffnen, den Schritt erledigen und erneut Hilfe wählen: Sie muss zum neuen Fortschritt passen. Zwischenzeitlich Pflanze oder Stempel erledigen; das Hauptziel darf dadurch nicht verschwinden.

Die Erzählung und Orientierung sind automatisiert geprüft. Ob neue Spieler ohne Vorwissen alles sofort verstehen und wie lange sie für den Einstieg brauchen, muss ein menschliches Probespiel bestätigen.

## Neue Oberfläche: Sprechblasen und Nahansichten

Normale Gespräche stehen als animierte Sprechblasen direkt in der Spielwelt. Name und heller Ring kennzeichnen die sprechende Figur; die Blase wird neben Mika, Petra oder Dieter platziert und an die Kartenbreite angepasst. Ein bis zwei Sätze erscheinen pro Seite. Pfeile blättern ohne Zeitdruck; Antworten stehen separat unter der Karte. Escape oder „Weitergehen“ schließen das Gespräch. Lange Belege bleiben vollständig im Notizbuch.

Molly behält ihre große cinematische Ansicht. Mika und Molly erhalten wechselnde große Porträts passend zum gesprochenen Abschnitt; Sprechblasen, kleine Bewegungen und Mollys veränderter Gesichtsausdruck begleiten das Gespräch. Es gibt keine erzwungenen Wartepausen. Die Vorlesefunktion liest die aktuelle Seite und Antworten; beim Blättern wird die alte Ausgabe abgebrochen. Automatik und Stimmenwahl liegen rechts unter „Vorlesen & Stimme“ sowie in den großen Ansichten.

**Tagesordnung als Vorlage:** Im Besprechungsraum das Whiteboard anklicken. Das große Dokument zeigt Mittwoch, 14. Oktober (fiktiver Spieltermin), acht Personen, drei Tagesordnungspunkte und die Freigabe von Version 2. Raum und Zeit sind zunächst sichtbar offen. Nach Petras Buchung erscheinen 203 und 10:00–11:30. „Untersuchen“, „Alte Version markieren“ und „Kopie mitnehmen“ geben kurze Rückmeldungen. Markierung und Kopie bleiben erhalten. Der Hinweis wird schon beim Betrachten gesammelt; Mitnehmen ist keine zusätzliche Pflichtaufgabe.

**Weitere Nahansichten:** Kaffeemaschine, Drucker, Computer, Telefon und Kopierer zeigen große lokale Vektorzeichnungen mit aktuellem Zustand. Kaffee kann sichtbar überlaufen und wieder aufgewischt werden; reparierte Geräte zeigen ihre fertige Ausgabe. Terminmappe, Posteingang, Raumplan, Verteilerregister, Rundschreiben, Ablaufkarte, Archivindex und Servicezettel erscheinen als lesbare Dokumente. Kalender, Verfahrensakte, Fristenkorb, Materialschrank, Pinnwand und Aktenvernichter öffnen ebenfalls Detailansichten mit den bisherigen Aktionen.

Während der Nahansicht pausiert Mika. „Zurück ins Büro“ oder Escape schließen sie. Beim Öffnen eines bestehenden Rätsels schließt sich die Objektansicht zuerst; es stapeln sich keine modalen Fenster. Es wurden keine neuen Pflicht-Rätsel oder Verwaltungsabläufe ergänzt.

Die Auftragsanzeige empfiehlt genau einen nächsten Schritt in Alltagssprache. Sie berücksichtigt vorhandene Hinweise, Hilfe, Vorwürfe und den gewählten Weg. Andere Aufgaben bleiben freiwillig in beliebiger Reihenfolge lösbar. Nebenaufgaben und Entdeckungen stehen separat. Die optionale Hilfe steigert sich von einem kleinen Hinweis über eine deutlichere Erklärung zur konkreten Wegbeschreibung. Sobald der empfohlene Schritt wechselt, beginnt sie wieder bei Stufe 1.

### Die neue Oberfläche gezielt testen

1. **Tagesordnung:** Raumplan im Flur lesen, Besprechungsraum betreten, Whiteboard anklicken. Offene Raum-/Zeitangaben prüfen; untersuchen, markieren, mitnehmen. Schließen und erneut öffnen: Markierung bleibt. Nach erfolgreicher Buchung bei Petra müssen Zeit und Raum bestätigt erscheinen.
2. **Sprechblasen:** Dieter oder Petra ansprechen. Name, markierte Figur und Blase vergleichen; längere Antworten vor- und zurückblättern. Anschließend Escape drücken und weiterlaufen.
3. **Molly:** Eröffnungsgespräch durchblättern. Zuerst spricht Mika mit eigenem Porträt, dann Molly. Antworten, Vorlesen und Schließen müssen unverändert funktionieren.
4. **Geräte:** Kaffeemaschine → großen Bezug wählen → Pfütze ansehen → Tuch holen → aufwischen. Drucker → Auftrag einrichten: Nur das Rätsel darf offen bleiben. Computer und Telefon öffnen und ihre bisherigen Aktionen ausprobieren.
5. **Auftrag:** Molly besuchen und einen Weg wählen. Es steht genau ein nächster Schritt da. Hilfe dreimal anklicken, den Schritt erledigen: Auftrag aktualisiert sich, alter Tipp klappt zu. Vorgehen bei Molly wechseln und die Empfehlung erneut prüfen.
6. **Fenstergrößen:** Safari/Chrome auf ungefähr 1280, 768 und 390 Pixel Breite verkleinern. Die Objektansicht wechselt von zwei Spalten zu einer, Inhalte bleiben scrollbar. Blasen sollen innerhalb der Karte bleiben. Alle Schließen-Buttons, Antworten und die Sprachsteuerung müssen erreichbar sein.
7. **Abbrechen:** Eine Nahansicht mehrfach öffnen und per Escape schließen; währenddessen Bewegungstasten halten. Mika darf in der Ansicht nicht laufen und nach dem Schließen nicht ohne neue Eingabe weiterlaufen. Vorlesen beim Blättern oder Schließen darf später nicht erneut einsetzen.

## Entscheidungen mit Folgen

Molly bietet nach dem ersten Gespräch drei gleichwertige Wege. Raumplanung, Drucktechnik und Versanddaten bleiben in beliebiger Reihenfolge bearbeitbar.

| Vorgehen | Eigenes Rätsel und Vorteil | Verpflichtung und spätere Wirkung |
| --- | --- | --- |
| Kooperative Klärung | Fristenkorb mit Kalender und aktueller Pinnwandregel ordnen. Dieter liefert Papier und Betriebsanweisung; das Zahlenschloss kann entfallen. | Erst gemeinsame Sortierarbeit; Molly lässt die Zusage zunächst liegen; eine Frist begrenzt die spätere Belastung. Ein unberichtigter öffentlicher Vorwurf verhindert Dieters freiwillige Hilfe. |
| Konsequente Führung | Zuständigkeiten und geeigneten Versandnachweis aus Kalender und Verfahrensakte kombinieren. Materialfreigabe öffnet das Reservefach am Schrank. | Mika verpflichtet sich zur dokumentierten Abnahme nach den drei Sachvorgängen. Molly erinnert an diese Verantwortung und übergibt die Versandbestätigung. |
| Formelle Eskalation | Entwurf, Verfahrensakte und telefonische Vorgangsnummer zu einer sachlichen Akte verbinden. Original oder lesbare Kopie sind echte Alternativen. Schriftliche Auskünfte ersetzen einzelne Informationsgespräche. | Akte anlegen und nach den drei Sachvorgängen telefonisch abschließen. Hinterlegte Originale lassen sich zurückholen. Molly bleibt selbst Absenderin. |

Bei Molly lässt sich das Vorgehen jederzeit neu vereinbaren. Erledigte Vorgänge und alte Freigaben bleiben erhalten; die Abschlussbedingungen des aktuellen Wegs gelten. NPCs sprechen einen Wechsel später an. Keine Entscheidung zerstört einen notwendigen Beleg oder sperrt einen Raum dauerhaft.

Weitere Folgen:

- Ein voreiliger telefonischer Vorwurf verändert die Reaktionen von Molly, Dieter und Petra. Eine kostenlose Richtigstellung stellt die freiwillige Hilfe wieder her; der Vorfall bleibt in der Historie und im Ende erwähnt.
- Ein übergelaufener Kaffee legt einen alternativen Fristenhinweis frei. Wer das Missgeschick mit einem Küchentuch beseitigt, erhält ebenfalls Zugang zu Dieters Materialhilfe.
- Ein vorsichtig reparierter Kopierer liefert eine Kopie ohne Kollateralschaden. Gewaltsames Ziehen rettet einen Durchschlag, hinterlässt aber ein gestörtes Gerät und eine spätere Rückfrage von Petra. Reparatur bleibt möglich.
- Eine gerettete Kopie aus dem Papierkorb, eine frische Druckerkopie oder das Original können die formelle Akte ermöglichen. Die Nebenreparatur ist kein Pflichtumweg.
- Petras zurückgebrachter Stempel bringt einmalige Kulanz bei einem falschen Raumvorschlag. Pflanze, Besprechungsuhr und bewusste Kaffeepause entlasten einmalig.

Ziel ist ungefähr **20 Minuten bei erster Erkundung**. Die tatsächliche Spielzeit wurde noch nicht durch menschliche Probespiele gemessen. Es gibt keine künstlichen Wartezeiten oder verlängerten Laufwege; mit bekannten Lösungen ist das Spiel schneller.

## Räume und neue Interaktionen

Alle sechs bestehenden Räume bleiben erhalten. Zehn zusätzliche Gegenstände haben eigene Zeichnungen und Dialoge:

| Raum | Neue Gegenstände | Weiterhin vorhanden |
| --- | --- | --- |
| Mikas Büro | Bürotelefon, Teamkalender | Terminmappe, Prüfcomputer, Pflanze, nun durchsuchbarer Papierkorb |
| Mollys Vorzimmer | Fristenkorb, Aktenvernichter | Molly, Posteingang, Ablaufkarte |
| Flur | Pinnwand mit widersprüchlichen Aushängen, Hauspostrohr | Raumplan, Rundschreiben, Türen |
| Besprechungsraum | Einstellbare Besprechungsuhr | Petra, Whiteboard, großer Tisch |
| Kaffeeküche | Tassen und Küchentücher | Dieter, Kaffeemaschine mit Bedienoptionen und Missgeschick, Gießkanne, Stempel, Servicezettel |
| Druckerraum & Archiv | Kopierer mit Papierstau, Verfahrensakte | Materialschrank, Drucker, Archivindex, Verteilerregister, Altakten |

Das Archiv öffnet nach Mollys erstem Gespräch. Der Raumplan enthält den Zugang zu Raum 203. Gefundene Informationen bleiben auch erhalten, wenn sie vor dem dazugehörigen Auftrag entdeckt wurden.

## Stress

Der Balken bleibt sichtbar; Text beschreibt Mikas Zustand, Anlass und Reaktion. Dialogoptionen nennen keine Punktkosten oder Punktgewinne. Fehlversuche, voreilige Vorwürfe und nachvollziehbare Missgeschicke belasten Mika. Erfolge und begrenzte Nebenaufgaben entlasten.

**Bewegung, Erkundung, Lesen, Warten und Vorlesen erzeugen keinen automatischen Stress.** Fehlende Belege oder unvollständige Eingaben zählen nicht als Fehlversuch. Hilfen sind kostenlos. Richtige Lösungen verursachen keinen unvermeidbaren Stress: Auch nahe der Grenze bleibt ein erfolgreicher Abschluss möglich. Wiederholte erledigte Nebenaufgaben liefern keine weiteren Entlastungen.

Bei **100 Stress: BURNOUT – GAME OVER**. Bewegung stoppt, offene Rätsel schließen; „Neuer Montag“ setzt alles zurück.

## Vorlesen

- **▶ Vorlesen:** aktuellen Text und Antwortmöglichkeiten vorlesen.
- **Automatisch:** neue Dialoge und Rätseltexte automatisch lesen; jederzeit abschaltbar, standardmäßig aus.
- **■ Stopp:** sofort abbrechen. Schließen, Raumwechsel, neue Texte, Tabwechsel und Neustart beenden alte Ausgaben ebenfalls.
- **Stimme:** verfügbare deutsche Browser-/Systemstimmen; eine lokale deutsche Stimme wird bevorzugt. Deren Offline-Verfügbarkeit hängt von der Installation auf dem Mac ab.
- Ohne deutsche Stimme wird der Browserstandard mit `de-DE` angefragt. Ohne Speech-API werden die Sprachknöpfe deaktiviert; das Spiel bleibt spielbar.

## Konkrete Testwege — enthält Lösungen

### Gemeinsame Sachvorgänge

Molly besuchen und ein Vorgehen wählen. Danach diese Vorgänge in beliebiger Reihenfolge lösen:

1. **Raum:** Terminmappe in Mikas Büro, Raumplan im Flur und Dieters Erklärung der Planmarkierung lesen. Bei Petra **203 / 10:00 / 90 Minuten** buchen. Auf dem formellen Weg kann die telefonische schriftliche Auskunft Dieters Erklärung ersetzen.
2. **Technik:** Papier über die jeweilige Materialhilfe/Freigabe besorgen. Alternativ Ablaufkarte im Vorzimmer und Archivindex lesen, dann am Materialschrank das Zahlenschloss **2 / 4 / 1** öffnen. Druckerdiagnose und Servicezettel in der Küche lesen. Drucker mit **Fach 2 / A4 einseitig / Nur M-ALT löschen** einrichten.
3. **Versand:** Rundschreiben im Flur, Verteilerregister im Archiv und Whiteboard in Raum 203 lesen. Am Rechner in Mikas Büro **LK-C / Tagesordnung 2 / Nur aktive Mitglieder** prüfen. Schriftliche Auskunft kann das Register liefern.

### Die drei Wege vergleichen

Jeweils einen neuen Montag beginnen:

- **Kooperativ:** Teamkalender → datierte Vorgänge lesen. Pinnwand → freigegebenen Aushang lesen. Fristenkorb → **Raumfreigabe / Einladung / Inventur**. Dieter um Materialhilfe bitten. Sachvorgänge erledigen, bei Molly gemeinsamen Abgleich wählen und sie selbst senden lassen.
- **Konsequente Führung:** Zuständigkeitsnotiz am Kalender und Regeln in der Verfahrensakte lesen. Im Kalender Auftrag **Molly sendet / Mika prüft / Sendeprotokoll**. Materialfreigabe am Schrank nutzen. Nach den Sachvorgängen im Kalender Abnahme **10:00 / Molly / Sendeprotokoll**. Bei Molly Uhrzeit abgleichen und sie selbst senden lassen.
- **Formell:** Mollys Posteingang, Verfahrensregeln im Archiv und Telefon → interne Koordination. In der Verfahrensakte **Versand offen / Interne Koordination E-17 / Original hinterlegen** wählen. Alternativ vorher den Durchschlag im Papierkorb glätten und **lesbare Kopie** wählen. Telefon → schriftliche Auskünfte anfordern. Nach den Sachvorgängen dort Abschluss melden. Bei Molly die technische Terminprüfung oder den Belegabgleich wählen; anschließend muss Molly selbst senden.

### Folgen und Grenzfälle gezielt prüfen

1. Kooperation vereinbaren und Fristenkorb lösen. Am Telefon Molly voreilig verantwortlich machen. Dieter bietet nun keine freiwillige Materialhilfe; Molly erinnert an den Anruf. Am Telefon oder bei Molly richtigstellen, Dieters Hilfe erneut prüfen. Der frühere Vorfall bleibt im Ende erwähnt.
2. Nach erledigten Sachvorgängen bei Molly den Weg wechseln. Die drei Häkchen und gesammelten Belege bleiben erhalten. Neues Weg-Rätsel und dessen Abschlussbedingung erfüllen, dann senden lassen. NPCs erwähnen den Wechsel.
3. Großen Kaffee in kleiner Tasse beziehen. Tuch bei „Tassen & Tücher“ holen, Missgeschick beseitigen. Dieter bietet Materialhilfe. Kaffee und Aufräumen lassen sich nicht als endlose Entlastung wiederholen.
4. Kopierer: Wartungskarte und Servicezettel lesen; **pausieren / Seitenklappe / A4 einseitig**. Alternativ Durchschlag ziehen und Petras Rückfrage ansehen; die formelle Akte bleibt damit lösbar. Nachträglich reparieren.
5. Pflanze mit der gefüllten Gießkanne versorgen; Stempel aus der Fundschale zu Petra bringen. Erster falscher Raumvorschlag bleibt durch Kulanz folgenlos, weitere Fehlversuche belasten Mika.
6. Länger laufen oder stillstehen: Balken bleibt unverändert. Bewusst wiederholte falsche Rätselantworten bis Burnout: Welt und Rätsel stoppen, Neustart funktioniert.
7. Vorlesen manuell/automatisch, Stimmenwahl, Stopp und Escape ausprobieren. Nach dem Schließen darf alter Text nicht neu beginnen.
8. Fenster schmal ziehen: Aufträge, Antworten und Rätsel müssen scrollbar und Schließen-Buttons erreichbar bleiben. Bewegung mit Tastatur, Bildschirmtasten und Zielklick prüfen.

## Struktur und Prüfungen

`index.html` enthält deklarative Räume (`ROOMS`), Hinweise (`CLUES`), Vorgehensweisen (`APPROACHES`), Rätsel (`PUZZLES`), Interaktionen (`HANDLERS`), Aufgabenableitung (`getTasks`), Entscheidungshistorie/NPC-Erinnerungen sowie die getrennten Bewegungs-, Zeichen- und Sprachfunktionen. `ui.sequence`, `renderNavigation` und `advanceSpeech` steuern die gemeinsame Dialognavigation. `director` verwaltet einmalige kurze Ereignisse, Besucher und Gesten unabhängig von Kollisionen und Questflags. `splitSpeech`, `nextMainStep` und die Objektansichten trennen Darstellung von Questfortschritt. Neue Aufgaben können diese Bausteine erweitern. Einmalige Hilfen verwenden persistente Flags innerhalb der Partie; ein Wechsel des Vorgehens setzt sie nicht zurück.

Mit vorhandenem Node.js, ohne Zusatzpakete:

```sh
node tests/game.test.cjs
```

Die Tests simulieren DOM und Speech-API. Geprüft werden drei vollständige Lösungswege über die echte Wegsuche, alle sechs Wechsel zwischen den Wegen, NPC-Erinnerung und Wiedergutmachung, alternative Belege, Abschluss nahe der Stressgrenze, endliche Entlastung, freie Erkundung, Burnout/Neustart, sechs erreichbare Raumlayouts, Kollisionen, kontinuierliche/diagonale Bewegung bei unterschiedlichen Bildraten, Bildschirmtasten und Sprachausgabe-Abbruch.

Zusätzlich werden kurze Dialogseiten, Sprecherwechsel, die Tagesordnungsaktionen, 21 weitere Objektansichten, Fensterwechsel ohne Stapelung, genau ein nächster Auftrag und Blasenpositionen bei sieben Kartenbreiten geprüft. Das sind Logik-/DOM-Vertragstests und geometrische Prüfungen, keine Browser-Layouttests. Auch der vollständige und übersprungene Einstieg, frühes Untersuchen mit späterem Wiederbesuch, alle drei Hilfestufen, die Hauptstationen auf allen Wegen und die Rückkehr nach Nebenquests werden geprüft. Die Raumzeichnungen und neuen Geräte-Vektorgrafiken wurden statisch kontrolliert. Das ersetzt keinen echten Browsertest: Die integrierte Browsersteuerung blockiert lokale `file://`-Seiten. Tatsächliche HTML-Darstellung, Bewegungsgefühl und hörbare Ausgabe müssen noch in Safari/Chrome geprüft werden. Ein echter iPhone-Test steht ebenfalls aus.
