<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {computed, onMounted, ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";
import type {Course, CourseOptimiert, Tool} from "@/types.ts";

// Steuervariabeln
const ausgeklappteKartenIds = ref<Array<number>>([]);
const courses = ref<CourseOptimiert[]>([]);
const loading = ref(true)
const activeFilters = ref({
  kategorien: [] as string[]
})
const nurMitPaper = ref(false)

// Einlesen der Daten
async function loadJson(): Promise<Course[]> {
  const content = await fetch("/courses.json");
  return await content.json() as Course[];
}

onMounted(async () => {
  const rawCourses = await loadJson();
  const flattenedCourses: CourseOptimiert[] = [];

  rawCourses.forEach((course: Course) => {
    // 1. Vorbereiten: Wenn es ein einzelnes Tool ist, machen wir ein Array daraus,
    // damit wir danach beide Fälle mit derselben Logik behandeln können.
    const toolsArray = Array.isArray(course.tool) ? course.tool : [course.tool];

    // 2. Für jedes Tool in diesem Kurs erstellen wir eine eigene Karte (ein eigenes Objekt)
    toolsArray.forEach((singleTool: Tool, index: number) => {

      // Bereinigungslogik
      if (singleTool.name === "/") {
        if (course.paper) {
          // Wir kopieren das Tool-Objekt, um das Original nicht zu verändern
          singleTool = { ...singleTool, name: course.paper.titel };
        }
      }
      // Eindeutige ID generieren:
      const uniqueId = course.id * 100 + index;
      // Wir erstellen eine flache Kopie des Kurses, ersetzen aber ID und Tool
      const newCourseCard: Course = {
        ...course,
        id: uniqueId,
        tool: singleTool
      };
      flattenedCourses.push(<CourseOptimiert>newCourseCard);
    });
  });

  // Jetzt enthält `courses.value` für jedes Tool eine eigene Karte mit eindeutiger ID
  courses.value = flattenedCourses;
  loading.value = false;
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
const handleFilterUpdate = (newFilters: { kategorien: string[] }) => {
  activeFilters.value.kategorien = newFilters.kategorien;
}
const gefilterteKurse = computed(() => {
    console.log("Filter-Zustand:", activeFilters.value.kategorien);
    console.log("Switch-Zustand (nurMitPaper):", nurMitPaper.value);
    return courses.value.filter(kurs => {
      // 1. Filter nach Kategorien
      const matchesKategorie =
          activeFilters.value.kategorien.length === 0 ||
          kurs.kategorie.some(kat => activeFilters.value.kategorien.includes(kat))
      // 2. Filter für "Nur Tools mit Paper"
      const matchesPaper = !nurMitPaper.value || (kurs.paper !== null && kurs.paper !== undefined)
      return matchesKategorie && matchesPaper
    })
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
      <v-spacer />
      <v-col>
        <v-switch
            v-model="nurMitPaper"
            color="success"
            class="mt-2"
            label="Nur Tools mit Paper anzeigen"
            true-icon="mdi-check"
            false-icon="mdi-close"
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
            @toggle-karte="karteAusklappen(course.id)"
        />

      </template>
    </div>
  </v-container>
</template>

<style scoped>

</style>