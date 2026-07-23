import { z } from "zod";
import optionsData from './options.json';

export const ANWENDUNGSFELDER = optionsData.anwendungsfelder;
export const KATEGORIEN = optionsData.kategorien;
export const SPRACHEN = [
    {title: "Englisch", value: "en"},
    {title: "Deutsch", value: "de"},
    {title: "Französisch", value: "fr"},
    {title: "Spanisch", value: "es"},
    {title: "Italienisch", value: "it"},
    {title: "Dänisch", value: "da"},
    {title: "Niederländisch", value: "nl"},
    {title: "Portugiesisch", value: "pt"},
    {title: "Ungarisch", value: "hu"},
    {title: "Türkisch", value: "tr"},
    {title: "Malaiisch", value: "ms"},
    {title: "Hebräisch", value: "he"},
    {title: "Arabisch", value: "ar"},
    {title: "Koreanisch", value: "ko"},
    {title: "Schwedisch", value: "sv"},
    {title: "Indonesisch", value: "id"}
]

export const AnwendungsfeldSchema = z.enum(optionsData.anwendungsfelder as [string, ...string[]]);
export const DatenbankSchema = z.enum(optionsData.datenbanken as [string, ...string[]]);
export const KategorienSchema = z.enum(optionsData.kategorien as [string, ...string[]]);
export const SprachenSchema = z.enum(optionsData.sprachen as [string, ...string[]]);

export const LaengeSchema = z.object({
    anzahlSessions: z.number().optional().nullable(),
    zeitInMinutes: z.number().optional().nullable(),
}).nullable().optional();

export const PaperSchema = z.object({
    datenbank: DatenbankSchema,
    titel: z.string(),
    bemerkung: z.string(),
    link: z.string(),
    veroeffentlichungsdatum: z.string(),
    land: z.array(z.string()),
    methode: z.string(),
    sample: z.string(),
    forschungsfrage: z.array(z.string()),
    ergebnisse: z.string()
})

export const ToolSchema = z.object({
    name: z.string(),
    beschreibung: z.string(),
    link: z.string().nullable().optional()
});

export const AltersspanneSchema = z.object({
    min: z.number(),
    max: z.number()
})

export const KurslaengeSchema = z.object({
    min: z.number(),
    max: z.number()
})

export const CourseSchema = z.object({
    id: z.number(),
    zielgruppe: z.string(),
    laenge: LaengeSchema.optional().nullable(),
    erwaehntIn: z.array(z.string()),
    paper: PaperSchema.optional(),
    tool: ToolSchema.optional(),
    kategorie: z.array(KategorienSchema),
    alter: AltersspanneSchema.optional(),
    anwendungsfelder: z.array(AnwendungsfeldSchema),
    aiLiteracyAspekt: z.array(z.number()),
    sprachen: z.array(SprachenSchema),
    registration: z.boolean()
})

export type CourseOptimiert = Omit<Course, 'tool'> & { tool: Tool };

export type Length = z.infer<typeof LaengeSchema>;
export type Paper = z.infer<typeof PaperSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type Altersspanne = z.infer<typeof AltersspanneSchema>;
export type Kurslaenge = z.infer<typeof KurslaengeSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type Anwendungsfeld = z.infer<typeof AnwendungsfeldSchema>;
export type Sprachen = z.infer<typeof SprachenSchema>;

export interface FilterState {
    kategorien: string[]
    altersstufen: Altersspanne[]
    kurslaengen: Kurslaenge[]
    anwendungsfelder: string[]
    aiLiteracyAspekte: number[]
    sprachen: Sprachen[]
}