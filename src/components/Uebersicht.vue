<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {computed, onMounted, ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";
import type {Course} from "@/types.ts";

// Steuervariabeln
const ausgeklappteKartenIds = ref<Array<number>>([]);
const courses = ref<Course[]>([]);
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
  const flattenedCourses: Course[] = [];

  rawCourses.forEach((course: Course) => {
    if (Array.isArray(course.tool)) {
      course.tool.forEach(tool => {
        if (tool.name === "/") {
          if (course.paper) {
            // Wir kopieren das Tool-Objekt, um das Original nicht zu verändern
            tool = { ...tool, name: course.paper.titel };
          }
        }
      })
      console.log(course);
      //TODO: Wie bereinige ich es, wenn es mehrere Tools gibt?
    }
    else {
      if (course.tool.name == "/"){
        if (course.paper) course.tool.name = course.paper.titel
      }
    }
  })
  courses.value = rawCourses;
  loading.value = false;
})

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
  activeFilters.value = newFilters
}
const gefilterteKurse = computed(() => {
  return courses.value.filter(kurs => {
    // 1. Filter nach Kategorien (Schnittmenge prüfen)
    // .some() prüft, ob MINDESTENS EINE Kategorie des Kurses in den ausgewählten Filtern steckt.
    const matchesKategorie =
        activeFilters.value.kategorien.length === 0 || // Wenn nichts ausgewählt ist -> alles anzeigen
        kurs.kategorie.some(kat => activeFilters.value.kategorien.includes(kat))

    // 2. Filter für deinen "Nur Tools mit Paper" Switch im Parent
    const matchesPaper = !nurMitPaper.value || kurs.paper !== null

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
            v-else-if="courses"
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