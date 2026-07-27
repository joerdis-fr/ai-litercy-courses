# AI Litercy Courses
Eine Webanwendung, in der verschiedene Informationen zu AI-Literacy Kursen gesammelt werden

---

## Über das Projekt

Kuenstliche Intelligenz (KI) prägt den Alltag von Jugendlichen in sozialen Medien, E-Learning, E-Shopping und durch generative Chatbots nachhaltig. Häufig fehlt es jedoch an fundiertem Wissen über die Funktionsweise und die gesellschaftlichen Einflüsse von KI. Die Vermittlung von AI Literacy ist daher essenziell, um Jugendliche für einen kritischen und sicheren Umgang mit dieser Technologie zu befähigen.

Um den Aufwand bei der Recherche geeigneter Bildungsangebote zu reduzieren, bietet diese Webanwendung eine strukturierte Übersicht bestehender Ansätze zur Vermittlung von AI Literacy bei Jugendlichen.

Hauptmerkmale:

* Übersichtliche Darstellung von Tools und methodischen Ansätzen zur AI-Literacy-Vermittlung.
* Gezielte Filteroptionen nach verschiedenen Merkmalen zur schnellen Findung passender Bildungsangebote.
* Praxisnah optimiert und auf Basis der Evaluation mit Praktikerinnen weiterverbessert.
* Responsive Ansicht
* Steuerung des Ein- und Ausklappens der Karten über zentrale Buttons

---

## Anwendung starten

Starte den Entwicklungs-Server mit folgendem Befehl:

```bash
npm run dev
```

## Build & Deployment

### Production-Build erstellen

Um die Anwendung für die Produktion zu bauen und ein bereitstellbares Artefakt zu erzeugen, führe folgenden Befehl aus:

```bash
npm run build
```

## Neue Einträge hinzufügen

Um ein neues Tool oder einen neuen methodischen Ansatz in die Daten aufzunehmen, passe die Datei `public/courses.json` an. 

### Vorgehensweise

1. Öffne die Datei [courses.json](public/courses.json).
2. Füge am Ende des Arrays ein neues JSON-Objekt ein.
3. Vergib eine neue, eindeutige `id` (fortlaufende Nummer).
4. Befülle die Felder entsprechend des vorgegebenen Schemas.

### Datenstruktur (`CourseSchema`)

Jeder Eintrag besteht aus folgenden Feldern:

* **id** (*Zahl*, Pflicht): Eindeutige ID des Eintrags.
* **zielgruppe** (*Text*, Pflicht): Beschreibung der Zielgruppe (z. B. `"Schüler ab 10 Jahren"`).
* **erwaehntIn** (*Array aus Texten*, Pflicht): Titel weiterer Paper oder Studien, in denen dieses Tool/diese Methode ebenfalls erwähnt oder aufgegriffen wird (z. B. `["Paper A", "Paper B"]`). Ist es in keinen weiteren Papern vorhanden, wird ein leeres Array `[]` angegeben.
* **kategorie** (*Array aus Texten*, Pflicht): Zuordnung zu einer oder mehreren Kategorien.
* **anwendungsfelder** (*Array aus Texten*, Pflicht): Themenbereiche (z. B. `["Robotik", "NLP"]`).
* **sprachen** (*Array aus Sprachcodes*, Pflicht): Zuordnung der Sprachen über den ISO-Code (z. B. `["de", "en"]`).
* **registration** (*Boolean*, Pflicht): `true`, wenn eine Registrierung erforderlich ist, sonst `false`.
* **aiLiteracyAspekt** (*Array aus Zahlen*, Pflicht): IDs der vermittelten AI-Literacy-Aspekte.
* **alter** (*Objekt*, Optional): `{ "min": 8, "max": 18 }`
* **laenge** (*Objekt*, Optional): `{ "anzahlSessions": 2, "zeitInMinutes": 90 }` oder `null`
* **paper** (*Objekt*, Optional): Details zum zugrundeliegenden Paper (`datenbank`, `titel`, `link`, `veroeffentlichungsdatum`, `land`, `methode`, `sample`, `forschungsfrage`, `ergebnisse`).
* **tool** (*Objekt*, Optional): Details zum Tool (`name`, `beschreibung`, `link`).

### AI Literacy Aspekte

Für das Feld `aiLiteracyAspekt` wird ein Array mit den passenden Nummern (`1` bis `5`) der vermittelten Kompetenzen angegeben:

* `1` – **KI kennen und verstehen:** Vermittlung von Grundlagenwissen über Funktionsweise, Begriffe und Modelle von KI.
* `2` – **KI verwenden und anwenden:** Praktische Nutzung bestehender KI-Tools und Anwendungen.
* `3` – **KI bewerten und erstellen:** Kritische Evaluation von KI-Systemen oder eigenes Entwickeln/Trainieren von KI-Systemen.
* `4` – **Ethische Aspekte:** Auseinandersetzung mit gesellschaftlichen Einflüssen, Datenschutz, Fairness oder Risiken von KI.
* `5` – **Sammlung von Kursen:** Wenn es sich um ein Meta-Angebot oder ein Repository handelt, das mehrere Kurse vereint.

*Beispiel:* ` "aiLiteracyAspekt": [1, 4] ` (für ein Angebot, das sowohl Grundlagen als auch Ethik behandelt).

### Sprachcodes etc.

Für das Feld `sprachen` stehen unter anderem folgende Codes zur Verfügung:
* `de` (Deutsch), `en` (Englisch), `fr` (Französisch), `es` (Spanisch), `it` (Italienisch), `nl` (Niederländisch), `da` (Dänisch), `sv` (Schwedisch), `tr` (Türkisch) etc.

Eine vollständige Liste der Sprachcodes, Kategorien und Anwendungsfelder ist in [options.json](src/options.json) zu finden.

### Beispiel-Eintrag

```json
{
  "id": 3,
  "zielgruppe": "Sechstklässler",
  "laenge": {
    "anzahlSessions": 1,
    "zeitInMinutes": 45
  },
  "erwaehntIn": [],
  "paper": {
    "datenbank": "ACM",
    "titel": "Supporting Holistic AI Ethics Literacy Education Through Critical Reflection: Three Recommendations for Fostering Children's Ethical Growth",
    "bemerkung": "Szenarien für ethische AI Prinzipien, funktioniert ohne source Code",
    "link": "https://dl.acm.org/doi/10.1145/3772318.3791477",
    "veroeffentlichungsdatum": "13.04.2026",
    "land": ["UK"],
    "methode": "Co-Design, Power Analyse, Post- und Pre Umfragen, Semi-strukturierte Interviews(Design Fiction)",
    "sample": "66 Schüler zwischen 10 und 11",
    "forschungsfrage": ["RQ1: How do children understand and articulate ethical issues and principles related to AI?", "RQ2: In what ways do children’s attitudes towards the scenarios evolve over the course of the study?"],
    "ergebnisse": "1. an empirical map of where unaided reflection clusters and thins across key ethical principles; 2. evidence that short, design fiction-based scenarios can reliably induce measured caution rather than outright rejection in AI ethics literacy education; and 3. three practicable recommendations for future holistic AI ethics literacy research with Children"
  },
  "tool": {
    "name": "/",
    "beschreibung": "Design Fiction Szenarien, an UNESCO’s ethischen Prinzipien für KI ausgerichtet, wir haben 10 Design Fiction Szenarien aus bekannten Kontexten verwendet, um Reflektion anzuspornen.",
    "link": null
  },
  "kategorie": ["Kognitives Werkzeug"],
  "alter" : {
    "min": 11,
    "max": 12
  },
  "anwendungsfelder": [
    "Sozialer Einfluss"
  ],
  "aiLiteracyAspekt": [1, 4],
  "sprachen": ["en"],
  "registration": false
}
```

