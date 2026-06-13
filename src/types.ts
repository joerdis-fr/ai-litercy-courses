export interface Course {
    id: number;
    zielgruppe: string;
    laenge: Lenght | null;
    erwaehntIn: Array<string>;
    paper: Paper | null;
    tool: Tool,
    kategorie: Array<string>;
    thema: Array<string>;
}

export interface Lenght {
    anzahlSessions: number;
    zeitInMinutes: number;
}

export interface Paper {
    datenbank: "ACM" | "Science Direct" | "Springer" | "MIT Media Lab" | "AAAI";
    titel: string;
    bemerkung: string;
    link: string;
    veroeffentlichungsdatum: string;
    land: Array<string>;
    methode: string;
    sample: string;
    forschungsfrage: Array<string>;
    ergebnisse: string;
}

export interface Tool {
    name: string;
    beschreibung: string;
    link: string | null;
}