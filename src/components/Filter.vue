<script setup lang="ts">

import {ref, watch} from "vue";
import type { FilterState } from "src/types.ts"

const emit = defineEmits<{
  (e: 'update:filters', value: FilterState): void
}>()

const selectedFilters = ref<FilterState>({
  kategorien: [],
  altersstufen: []
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
      clearable
      chips
      color="primary"
      density="compact"
      disabled
      label="Thema"
      :items="['Alle', 'AI Grundlagen', 'NLP', 'Ethik', 'Robotik', 'Computer Vision']"
      multiple
      variant="outlined"
    />
    <v-select
        clearable
        chips
        color="primary"
        density="compact"
        disabled
        label="Kurslänge"
        :items="['Alle', '1h', '3h', 'kp']"
        multiple
        variant="outlined"
    />
  </v-container>
</template>

<style scoped>

</style>