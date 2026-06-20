export interface Course {
    id: number;
    zielgruppe: string;
    laenge: Lenght | null;
    erwaehntIn: Array<string>;
    paper: Paper | null;
    tool: Tool | Array<Tool>,
    kategorie: Array<string>;
    thema?: Array<string>;
    alter?: Altersspanne | null;
    anwendungsfelder: Array<string>;
    aiLiteracyAspekt: Array<number>;
}

export interface CourseOptimiert {
    id: number;
    zielgruppe: string;
    laenge: Lenght | null;
    erwaehntIn: Array<string>;
    paper: Paper | null;
    tool: Tool,
    kategorie: Array<string>;
    thema: Array<string>;
    alter?: Altersspanne | null;
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

export interface FilterState {
    kategorien: string[]
    altersstufen: Altersspanne[]
    kurslaengen: Kurslaenge[]
    // themen: string[]
}

export interface Altersspanne {
    min: number;
    max: number;
}

export interface Kurslaenge {
    min: number;
    max: number;
}