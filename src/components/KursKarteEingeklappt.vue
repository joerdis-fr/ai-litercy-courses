<script setup lang="ts">

const emit = defineEmits(['toggle-karte'])

function karteAusklappen() {
  emit('toggle-karte')
}

const props = defineProps<{
  titel: string,
  beschreibung: string,
  kategorie: string[]
}>();

// Mapping vür Icons von Kategorien
const kategorien = [
  {title: "Curriculum", icon:"mdi-format-list-bulleted"},
  {title: "Greifbar", icon:"mdi-hand-coin"},
  {title: "Kognitives Werkzeug", icon:"mdi-head-snowflake"},
  {title: "Lehrmaterialien", icon:"mdi-folder-information"},
  {title: "Ausstellung", icon:"mdi-bank"},
  {title: "Webanwendung", icon:"mdi-laptop"},
  {title: "Sammlung von KI Kursen", icon:"mdi-book-multiple"},
  {title: "Sonstige", icon:"mdi-page-next"},
]

const getKategorieIcon = (kategorieTitle: string): string => {
  const kat = kategorien.find(item => item.title === kategorieTitle);
  return kat ? kat.icon : 'mdi-help-circle';
};
</script>

<template>
  <v-card
      :text="props.beschreibung"
      variant="outlined"
  >
    <template v-slot:title>
      <v-icon
          class="mr-2"
          v-for="(k, i) in props.kategorie"
          :key="i"
          :icon="getKategorieIcon(k)"
      />
      {{props.titel}}
    </template>
      <template v-slot:actions>
        <v-spacer />
        <v-btn
            icon="mdi-chevron-down"
            @click="karteAusklappen()"
        />
      </template>
  </v-card>
</template>

<style scoped>

</style>