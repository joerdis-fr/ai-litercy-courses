<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {onMounted, ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";
import type {Course} from "@/types.ts";

// Steuervariabeln
const ausgeklappteKartenIds = ref<Array<number>>([]);
const courses = ref<Course[]>([]);
const loading =ref(true)

// Einlesen der Daten
async function loadJson(): Promise<Course[]> {
  const content = await fetch("/courses.json");
  return await content.json() as Course[];
}

onMounted(async () => {
  courses.value = await loadJson();
  loading.value = false;

  console.log(courses.value[0].tool.name)
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

</script>

<template>
  <v-container>
    <h1 class="ueberschrift">
      AI Literacy Kurse
    </h1>
    <h2>Filter </h2>
    <Filter />
    <v-divider />
    <h2>Ergebnisse </h2>
    <v-skeleton-loader
        v-if="loading"
        type="article"
    />
    <div v-else>
      <template v-for="course in courses" :key="course.id">
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