<script setup lang="ts">
import type {Course} from "@/types.ts";

const emit = defineEmits(['toggle-karte'])

function karteEinklappen() {
  emit('toggle-karte', props.meinIndex)
}

const props = defineProps<{
  meinIndex: number,
  course: Course
}>();

const kurs = props.course
const paper = props.course.paper || null
const tool = props.course.tool

const kursDisabled = () => {
  return !kurs.tool.link;
}

const paperDisabled = () => {
  return !paper;
}

const kursLink = () => {
  if (tool.link)
    return tool.link;
  else return "#"
}

const paperLink = () => {
  if (paper)
    return paper.link;
  else return "#"
}

</script>

<template>
  <v-card
      :title="tool.name"
      variant="outlined"
  >
    <template v-slot:text>
      {{tool.beschreibung}}
      <ul>
        <li>Zielgruppe: {{kurs.zielgruppe}}</li>
        <li>Kategorie: {{kurs.kategorie[0]}}</li>
        <li>Länge: {{ kurs.laenge?.anzahlSessions }} x {{ kurs.laenge?.zeitInMinutes }} m</li>
      </ul>
      <div v-if="paper != null">
        <v-divider />
        <h4>Infos zum zugehörigen Paper</h4>
        <h3>{{ paper.titel }}</h3>
        <ul>
          <li>Bemerkung: {{ paper.bemerkung }}</li>
          <li>Veröffentlichungsdatum: {{ paper.veroeffentlichungsdatum }}</li>
          <li>Methode zur Datenerhebung: {{ paper.methode }}</li>
          <li>Sample: {{ paper.sample }}</li>
          <li>Ergebnisse: {{ paper.ergebnisse }}</li>
          <li>von {{ paper.datenbank }}</li>

          <li>Länder: {{paper.land[0]}}</li>
          <li>Forschungsfrage(n): {{paper.forschungsfrage[0]}}</li>
        </ul>

      </div>
    </template>
      <template v-slot:actions>
        <v-btn
            color="purple"
            varinat="outlined"
            :href="kursLink()"
            :disabled="kursDisabled()"
        >
          Zum Kurs
        </v-btn>
        <v-btn
            color="orange"
            varinat="elevated"
            :href="paperLink()"
            :disabled="paperDisabled()"
        >
          Zum Paper
        </v-btn>
        <v-spacer />
        <v-btn
            icon="mdi-chevron-up"
            @click="karteEinklappen()"
        />
      </template>
  </v-card>
</template>

<style scoped>

</style>