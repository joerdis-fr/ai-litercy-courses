<script setup lang="ts">

import {ref, watch} from "vue";
import type { FilterState } from "src/types.ts"

const emit = defineEmits<{
  (e: 'update:filters', value: FilterState): void
}>()

const selectedFilters = ref<FilterState>({
  kategorien: [],
  altersstufen: [],
  kurslaengen: [],
  anwendungsfelder: [],
  aiLiteracyAspekte: []
})

const kategorien = [
    'Webanwendung',
    'Greifbar',
    'Curriculum',
    'Kognitives Werkzeug',
    'Sammlung von KI Kursen',
    'Lehrmaterialien',
    'Museums Ausstellung',
    'Sonstige'
]

const altersstufen = [
  {title: "Kindergarten und Pre-K (0-6)", value: {min: 0, max: 6}},
  {title: "Grundschule (6-11)", value: {min: 6, max: 11}},
  {title: "Mittelstufe (11-15)", value: {min: 11, max: 15}},
  {title: "Oberstufe (15-18)", value: {min: 15, max: 18}},
  {title: "Hochschulbildung (18-30)", value: {min: 18, max: 30}},
  {title: "Generelle Kurse oder Unbekannt", value: {generell: true}},
]

const kurslaengen = [
  {title: "Unter einer Stunde", value: {min: 0, max: 60}},
  {title: "1 bis 2 Stunden", value: {min: 60, max: 120}},
  {title: "2 bis 3 Stunden", value: {min: 120, max: 180}},
  {title: "3 bis 5 Stunden", value: {min: 180, max: 300}},
  {title: "5 bis 10 Stunden", value: {min: 300, max: 600}},
  {title: "Über 10 Stunden", value: {min: 600, max: null}},
  {title: "Generelle Kurse oder Unbekannt", value: {generell: true}},
]

const anwendungsfelder = [
  'Empfehlungssysteme',
  'Sozialer Einfluss',
  'NLP',
  'ChatGPT',
  'Verschiedene AI und CS Themen',
  'Kritik',
  'ML',
  'Roboter',
  'Klassifizierung',
  'GenAI',
  'Daten',
  'Grundlagen',
  'NNs',
  'Sonstiges',
  'Computer Vision',
  'LLMs',
]

const aiLiteracyAspekte = [
    {title: "KI kennen und verstehen", value: 1},
    {title: "KI verwenden und anwenden", value: 2},
    {title: "KI bewerten und erstellen", value: 3},
    {title: "Ethische Aspekte", value: 4},
    {title: "Sammlung von Kursen", value: 5},
]

watch(selectedFilters, (newFilters) => {
  console.log("Log aus dem Filter, newFilters:", newFilters)
  emit('update:filters', { ...newFilters })
}, { deep: true })
</script>

<template>
  <v-container>
    <v-select
        v-model="selectedFilters.kategorien"
        clearable
        chips
        color="primary"
        density="compact"
        label="Kategorie"
        :items="kategorien"
        multiple
        variant="outlined"
    />
    <v-select
        v-model="selectedFilters.altersstufen"
        clearable
        chips
        color="primary"
        density="compact"
        label="Alter"
        :items="altersstufen"
        multiple
        variant="outlined"
    />
    <v-select
        v-model="selectedFilters.kurslaengen"
        clearable
        chips
        color="primary"
        density="compact"
        label="Kurslänge"
        :items="kurslaengen"
        multiple
        variant="outlined"
    />
    <v-select
        v-model="selectedFilters.anwendungsfelder"
        clearable
        chips
        color="primary"
        density="compact"
        label="Anwendungsfelder"
        :items="anwendungsfelder"
        multiple
        variant="outlined"
    />
    <v-select
        v-model="selectedFilters.aiLiteracyAspekte"
        clearable
        chips
        color="primary"
        density="compact"
        label="AI Literacy Aspekte"
        :items="aiLiteracyAspekte"
        multiple
        variant="outlined"
    />
  </v-container>
</template>

<style scoped>

</style>