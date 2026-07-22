<script setup lang="ts">

import {computed, ref, watch} from "vue";
import type { FilterState } from "src/types.ts"
import {SPRACHEN} from "@/types.ts";
import {useDisplay} from "vuetify/framework";

const emit = defineEmits<{
  (e: 'update:filters', value: FilterState): void
}>()

const display = useDisplay()

const colsComputed = computed(() => {
  return display.lgAndUp.value ? 6 : 12
})

const selectedFilters = ref<FilterState>({
  kategorien: [],
  altersstufen: [],
  kurslaengen: [],
  anwendungsfelder: [],
  aiLiteracyAspekte: [],
  sprachen: []
})

const kategorien = [
  {
    title: "Curriculum",
    props: { prependIcon: "mdi-format-list-bulleted" },
    text: "Die Kategorie Curriculum beschreibt Lehrpläne, in denen konkrete Lernziele festgelegt werden und dazu Maßnahmen beschrieben werden, wie diese Lernziele zu erreichen sind. Das übergeordnete Lernziel aller Curricula beinhaltet durch die vorhergehende Auswahl die Förderung von AI Literacy, doch um dieses Ziel zu erreichen gibt es verschiedene Möglichkeiten, die durch verschiedene kleinere Lernziele erreicht werden kann. "
  },
  {
    title: "Greifbar",
    props: { prependIcon: "mdi-hand-coin"},
    text: "Die Kategorie Greifbar beschreibt alle Lernmethoden, die Aktivitäten mit greifbaren Dingen beschreiben. Das können beispielsweise Roboter aus bestimmter Hardware sein, Kartenspiele oder Bastelaufgaben. "
  },
  {
    title: "Kognitives Werkzeug",
    props: { prependIcon: "mdi-head-snowflake"},
    text: "Kognitive Werkzeuge beschreiben abstrakte Gedankenspiele, die Schüler zum Verständnis von KI-Konzepten oder Konsequenzen von KI bewegen können. Das sind beispielsweise Metaphern, Analogien oder Design-Fiction Szenarien."
  },
  {
    title: "Lehrmaterialien",
    props: { prependIcon: "mdi-folder-information"},
    text: "In der Kategorie Lehrmaterialien befinden sich konkrete Folien, Arbeitsblätter oder weitere Materialien, die zur Vermittlung von AI Literacy verwendet werden können. Curricula sind im Gegensatz zu Lehrmaterialien abstrakter und eine Hilfe zur Orientierung bei der Planung von Unterrichtsinhalten, während die Lehrmaterialien konkrete Vorschläge sind, die direkt übernommen werden könnten."
  },
  {
    title: "Ausstellung",
    props: { prependIcon: "mdi-bank"},
    text: "Ausstellungen finden in einem anderen Kontext statt. Sie können in einem Museum, einer Messe oder eine andere Veranstaltung ausgestellt werden, und haben das Prinzip, dass die Ausstellung an einem Ort aufgebaut wird und Personen, die vor Ort sind, sich weiter mit dem Ausstellungsstück befassen können, wenn sie möchten. Hier ist der Kontext also kein Unterricht, sondern eine Veranstaltung, bei der Personen sich frei bewegen können und nach Interesse alles erkunden können. "
  },
  {
    title: "Webanwendung",
    props: { prependIcon: "mdi-laptop"},
    text: "Die Kategorie Webanwendung beschreibt Anwendungen, die Spiele, Quizze, KI Assistenten oder Ähnliches enthalten. Sie sind entweder direkt über eine URL aufzurufen oder es gibt ein GitHub Repository, das den Code für die Anwendung enthält. "
  },
  {
    title: "Sammlung von KI Kursen",
    props: { prependIcon: "mdi-book-multiple"},
    text: "Teilweise wurden keine einzelnen Kurse gefunden, sondern bereits Sammlungen, die verschiedene der anderen Kategorien beinhalten könnten. Eine Zuordnung von allen einzelnen Kursen mit nur einem Eintrag wäre verwirrend, weswegen diese Kategorie zustande gekommen ist."
  },
  {
    title: "Sonstige",
    props: { prependIcon: "mdi-page-next"},
    text: "Die Kategorie Sonstige sammelt alle Einträge, die nicht zu den anderen Kategorien passen, weil sie zu einzigartig sind und darum eine Gruppierung nicht sinnvoll wäre."
  },
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
  {title: 'ChatGPT', value:'ChatGPT'},
  {title: 'Computer Vision', value:'Computer Vision'},
  {title: 'Daten', value:'Daten'},
  {title: 'Empfehlungssysteme', value:'Empfehlungssysteme'},
  {title: 'Generative Künstliche Intelligenz', value:'GenAI'},
  {title: 'Grundlagen', value:'Grundlagen'},
  {title: 'Klassifizierung', value:'Klassifizierung'},
  {title: 'Kritik', value:'Kritik'},
  {title: 'Large Language Models ', value:'LLMs'},
  {title: 'Machine Learning', value:'ML'},
  {title: 'Natural Language Processing', value:'NLP'},
  {title: 'Neuronale Netze', value:'NNs'},
  {title: 'Roboter', value:'Roboter'},
  {title: 'Sozialer Einfluss', value:'Sozialer Einfluss'},
  {title: 'Verschiedene KI und Informatik Themen', value:'Verschiedene KI und Informatik Themen'}
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
    <v-row>
      <v-col>
        <v-expansion-panels
            :rounded="[20, 8]"
            gap="8"
        >
          <v-expansion-panel
              class="border bg-light-blue-lighten-4"
              text="test"
          >
            <template #title class="d-flex">
              <v-icon
                  class="mr-2"
                  icon="mdi-information"
                  color="#1E398F"
              />
              Du kennst die Kategorien noch nicht? Hier kannst du Erklärungen zu ihnen finden!
            </template>
            <template #text>
              <v-row
                  v-for="(kategorie, index) in kategorien"
                  :key="index"
              >
                <v-col>
                  <v-icon
                      :icon="kategorie.props.prependIcon"
                  />
                  {{kategorie.title}}:
                  {{kategorie.text}}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="colsComputed">
        <v-select
            v-model="selectedFilters.kategorien"
            clearable
            chips
            color="primary"
            density="compact"
            label="Kategorie"
            :items="kategorien"
            multiple
            variant="outlined">
        </v-select>
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
            label="Kursdauer"
            :items="kurslaengen"
            multiple
            variant="outlined"
        />
      </v-col>
      <v-col :cols="colsComputed">
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
        <v-select
            v-model="selectedFilters.sprachen"
            clearable
            chips
            color="primary"
            density="compact"
            label="Sprachen"
            :items="SPRACHEN"
            item-title="title"
            item-value="value"
            multiple
            variant="outlined"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>