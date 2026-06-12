<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {onMounted, ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";
import type {Course} from "@/types.ts";

// Steuervariabeln
const karteAusgeklappt = ref(false);
const courses = ref<Course[]>([]);

// Einlesen der Daten
async function loadJson(): Promise<Course[]> {
  const content = await fetch("/courses-test.json");
  return await content.json() as Course[];
}

onMounted(async () => {
  courses.value = await loadJson();
  console.log(courses);

  console.log(courses.value[0].tool.name)
})
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
    <KursKarteEingeklappt
        v-if="!karteAusgeklappt"
        titel="test"
        beschreibung="test"
        :mein-index="0"
        @toggle-karte="karteAusgeklappt = true"
    />
    <KursKarteAusgeklappt
      v-else
      @click="karteAusgeklappt = false"
    />
  </v-container>
</template>

<style scoped>

</style>