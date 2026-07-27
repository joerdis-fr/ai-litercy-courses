<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {computed, onMounted, ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";
import {
  type Altersspanne,
  type Course,
  type CourseOptimiert,
  CourseSchema,
  type Kurslaenge, type Tool,
} from "@/types.ts";
import { z } from "zod";

// Steuervariabeln
const ausgeklappteKartenIds = ref<Array<number>>([]);
const courses = ref<CourseOptimiert[]>([]);
const loading = ref(true)
const activeFilters = ref({
  kategorien: [] as string[],
  altersstufen: [] as Altersspanne[],
  kurslaengen: [] as Kurslaenge[],
  anwendungsfelder: [] as string[],
  aiLiteracyAspekte: [] as number[],
  sprachen: [] as string[],
})
const nurMitPaper = ref(false)
const registrierungNotwendig = ref(true)

async function loadJson(): Promise<Course[]> {
  const response = await fetch("courses.json");
  const rawData = await response.json();

  return z.array(CourseSchema).parse(rawData);
}

onMounted(async () => {
  try {
    const rawCourses = await loadJson();
    const flattenedCourses: CourseOptimiert[] = [];

    rawCourses.forEach((course: Course) => {
      const toolsArray = Array.isArray(course.tool) ? course.tool : [course.tool];
    // Für jedes Tool in diesem Kurs erstellen wir eine eigene Karte (ein eigenes Objekt)
    toolsArray.forEach((singleTool: Tool, index: number) => {
        if (singleTool.name === "/" && course.paper) {
          singleTool = { ...singleTool, name: course.paper.titel };
        }
        const uniqueId = course.id * 1000 + index;
        const newCourseCard: Course = {
          ...course,
          id: uniqueId,
          tool: singleTool
        };
        flattenedCourses.push(newCourseCard as CourseOptimiert);
      });
    });
    console.log("Erfolgreich geladen & geflattened:", flattenedCourses);

    courses.value = flattenedCourses;
    loading.value = false;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Fehler in der courses.json Validierung:", error.issues);
    } else {
      console.error("Unbekannter Fehler beim Laden:", error);
    }
  }
});

// Karten Ein- und Ausklappen steuern
const karteEinklappen = (id: number) => {
  ausgeklappteKartenIds.value = ausgeklappteKartenIds.value.filter(kartenId => kartenId !== id);
}
const karteAusklappen = (id: number) => {
  if (!ausgeklappteKartenIds.value.includes(id)) {
    ausgeklappteKartenIds.value.push(id);
  }
}
const alleAusklappen = () => {
  courses.value.forEach((course) => {karteAusklappen(course.id)});
}
const alleEinklappen = () => {
  ausgeklappteKartenIds.value = []
}

// Filter steuern
const handleFilterUpdate = (newFilters: typeof activeFilters.value) => {
  activeFilters.value.kategorien = newFilters.kategorien;
  activeFilters.value.altersstufen = newFilters.altersstufen;
  activeFilters.value.kurslaengen = newFilters.kurslaengen;
  activeFilters.value.anwendungsfelder = newFilters.anwendungsfelder;
  activeFilters.value.aiLiteracyAspekte = newFilters.aiLiteracyAspekte;
  activeFilters.value.sprachen = newFilters.sprachen;
}

const gefilterteKurse = computed(() => {
    return courses.value.filter(kurs => {
      const matchesKategorie =
          activeFilters.value.kategorien.length === 0 ||
          kurs.kategorie.some(kat => activeFilters.value.kategorien.includes(kat))
      const matchesPaper = !nurMitPaper.value || (kurs.paper !== null && kurs.paper !== undefined)
      const matchesRegistrierung = registrierungNotwendig.value || (kurs.registration !== null && kurs.registration !== undefined && !kurs.registration)
      const matchesAlter =
          activeFilters.value.altersstufen.length === 0 ||
          activeFilters.value.altersstufen.some(spanne => {
            if ('generell' in spanne) {
              return kurs.alter === null || kurs.alter === undefined;
            }
            if (kurs.alter && kurs.alter.min !== undefined && kurs.alter.max !== undefined) {
              return kurs.alter.min <= spanne.max && kurs.alter.max >= spanne.min;
            }
            return false;
          });
      const matchesLength =
          activeFilters.value.kurslaengen.length === 0 ||
          activeFilters.value.kurslaengen.some(spanne => {
            if ('generell' in spanne) {
              return kurs.laenge === null || kurs.laenge === undefined || kurs.laenge.zeitInMinutes === null || kurs.laenge.zeitInMinutes === undefined;
            }
            if (kurs.laenge && kurs.laenge.anzahlSessions !== undefined &&
                kurs.laenge.zeitInMinutes !== undefined &&
                kurs.laenge && kurs.laenge.anzahlSessions !== null &&
                kurs.laenge.zeitInMinutes !== null
            ) {
              const zeitInsgesamt = kurs.laenge.anzahlSessions * kurs.laenge.zeitInMinutes
              if (spanne.max == null) {
                return zeitInsgesamt >= spanne.min
              }
              return zeitInsgesamt <= spanne.max && zeitInsgesamt >= spanne.min;
            }
            return false;
            })
      const matchesAnwendungsfeld =
          activeFilters.value.anwendungsfelder.length === 0 ||
          kurs.anwendungsfelder.some(anw => activeFilters.value.anwendungsfelder.includes(anw))
      const matchesAiLiteracyAspekt =
          activeFilters.value.aiLiteracyAspekte.length === 0 ||
          kurs.aiLiteracyAspekt.some(aspekt => activeFilters.value.aiLiteracyAspekte.includes(aspekt))
      const matchesSprache =
          activeFilters.value.sprachen.length === 0 ||
          kurs.sprachen.some(lang => activeFilters.value.sprachen.includes(lang))
      return matchesKategorie &&
          matchesPaper &&
          matchesRegistrierung &&
          matchesAlter &&
          matchesLength &&
          matchesAnwendungsfeld &&
          matchesAiLiteracyAspekt &&
          matchesSprache;
    }).sort((a, b) => {
          const nameA = a.tool?.name || '';
          const nameB = b.tool?.name || '';
          // localeCompare sorgt für korrekte alphabetische Sortierung inkl. Umlauten (Ä, Ö, Ü)
          return nameA.localeCompare(nameB, 'de', { sensitivity: 'base' });
        });
})
</script>

<template>
  <v-container>
    <h1 class="ueberschrift">
      AI Literacy Kurse
    </h1>
    <h2>Filter </h2>
    <Filter
        @update:filters="handleFilterUpdate"
    />
    <v-divider />
    <v-row>
      <v-col>
        <h2>{{gefilterteKurse.length}} Ergebnisse </h2>
      </v-col>

      <v-spacer class="d-none d-sm-flex" />
      <v-col cols="12" sm="auto">
        <v-switch
            v-model="nurMitPaper"
            color="success"
            class="mt-2"
            label="Nur Tools mit Paper anzeigen"
            true-icon="mdi-check"
            false-icon="mdi-close"
        ></v-switch>
        <v-switch
            v-model="registrierungNotwendig"
            color="error"
            class="mt-n8"
            label="Registrierung notwendig"
            true-icon="mdi-shield-account"
            false-icon="mdi-shield-account"
        ></v-switch>
      </v-col>
      <v-col cols="auto">
        <v-btn
            class="ma-2"
            color="purple"
            icon="mdi-arrow-expand-all"
            @click="alleAusklappen()"
        />
        <v-btn
            class="ma-2"
            color="orange"
            icon="mdi-arrow-collapse-all"
            @click="alleEinklappen()"
        />
      </v-col>
    </v-row>
    <v-skeleton-loader
        v-if="loading"
        type="article"
    />
    <div v-else>
      <template v-for="course in gefilterteKurse" :key="course.id">
        <KursKarteAusgeklappt
            v-if="ausgeklappteKartenIds.includes(course.id)"
            class="mt-4"
            :course="course"
            @toggle-karte="karteEinklappen(course.id)"
        />
        <KursKarteEingeklappt
            v-else
            class="mt-4"
            :titel="course.tool.name"
            :beschreibung="course.tool.beschreibung"
            :kategorie="course.kategorie"
            @toggle-karte="karteAusklappen(course.id)"
        />
      </template>
    </div>
  </v-container>
</template>

<style scoped>

</style>