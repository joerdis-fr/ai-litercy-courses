import { z } from "zod";
import optionsData from './options.json';

export const AnwendungsfeldSchema = z.enum(optionsData.anwendungsfelder as [string, ...string[]]);
export const DatenbankSchema = z.enum(optionsData.datenbanken as [string, ...string[]]);

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
    kategorie: z.array(z.string()),
    alter: AltersspanneSchema.optional(),
    anwendungsfelder: z.array(AnwendungsfeldSchema),
    aiLiteracyAspekt: z.array(z.number()),
    sprachen: z.array(z.string()),
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

export interface FilterState {
    kategorien: string[]
    altersstufen: Altersspanne[]
    kurslaengen: Kurslaenge[]
    anwendungsfelder: string[]
    aiLiteracyAspekte: number[]
}