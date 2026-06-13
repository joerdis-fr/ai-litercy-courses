<script setup lang="ts">
import type {Course} from "@/types.ts";
import acmLogo from "../assets/acm-logo.webp";
import scienceDirectLogo from "../assets/elsevier-logo.svg";
import springerLogo from "../assets/logo-springer-nature-link.svg";
import aaaiLogo from "../assets/aaai-logo.png";
import mitLogo from "../assets/mit-logo.png";
import {useDisplay} from "vuetify/framework";

const emit = defineEmits(['toggle-karte'])

function karteEinklappen() {
  emit('toggle-karte')
}

const props = defineProps<{
  course: Course
}>();

const display = useDisplay();

const kurs = props.course
const paper = kurs.paper || null
const tool = kurs.tool

// Falls der Kurslink fehlt
const kursDisabled = () => {
  return !kurs.tool.link;
}
const kursLink = () => {
  if (tool.link)
    return tool.link;
  else return "#"
}

// Falls das Paper fehlt
const paperDisabled = () => {
  return !paper;
}
const paperLink = () => {
  if (paper)
    return paper.link;
  else return "#"
}
const laender = () => {
  if (paper)
    return paper.land;
  else return [];
}
const forschungsfragen = () => {
  if (paper)
    return paper.forschungsfrage;
  else return [];
}

// Logo Auswahl
const richtigesLogo = () => {
  if (paper) {
    switch (paper.datenbank) {
      case "ACM":
        return acmLogo;
      case "Science Direct":
        return scienceDirectLogo;
      case "Springer":
        return springerLogo;
      case "AAAI":
        return aaaiLogo;
      case "MIT Media Lab":
        return mitLogo;
      default:
        return undefined;
    }
  }
  else return undefined;
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
        <li>Länge: {{ kurs.laenge?.anzahlSessions }}x {{ kurs.laenge?.zeitInMinutes }} m</li>
      </ul>
      <div v-if="paper != null">
        <v-divider />
        <v-row>
          <v-col cols="auto">
            <h4>Infos zum zugehörigen Paper</h4>
          </v-col>
          <v-spacer />
          <v-col cols="3">
            <v-img
                :class="display.smAndUp? 'mt-4' : ''"
                :src="richtigesLogo()"
                min-width="100"
            />
          </v-col>
        </v-row>
        <h3>{{ paper.titel }}</h3>
        <p class="text-body-medium text-grey-darken-1 mt-n4"> {{ paper.veroeffentlichungsdatum }} </p>
        <ul>
          <li>Bemerkung: {{ paper.bemerkung }}</li>
          <li>Methode zur Datenerhebung: {{ paper.methode }}</li>
          <li>Sample: {{ paper.sample }}</li>
          <li>Ergebnisse: {{ paper.ergebnisse }}</li>
          <li
              v-if="laender().length == 1"
          >
            Land: {{paper.land[0]}}
          </li>
          <li
              v-if="forschungsfragen().length == 1"
          >
            Forschungsfrage: {{forschungsfragen()[0]}}</li>
        </ul>
        <div v-if="laender().length > 1" class="ml-6">
        Länder:
        <ul>
          <li v-for="(land, index) in laender()" :key="index">
            {{ land }}
          </li>
        </ul>
        </div>
        <div v-if="forschungsfragen().length > 1" class="ml-6">
          Forschungsfragen:
          <ul>
            <li v-for="(forschungsfrage, index) in forschungsfragen()" :key="index">
              {{ forschungsfrage }}
            </li>
          </ul>
        </div>
        <v-divider />
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