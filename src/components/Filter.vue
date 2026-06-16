<script setup lang="ts">

import {ref, watch} from "vue";
import type { FilterState } from "src/types.ts"

const emit = defineEmits<{
  (e: 'update:filters', value: FilterState): void
}>()

const selectedFilters = ref<FilterState>({
  kategorien: []
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
        label="Alter"
        :items="['Alle', 'Grundschüler (6-11)', 'Mittelschüler(12-16)', 'Generell']"
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