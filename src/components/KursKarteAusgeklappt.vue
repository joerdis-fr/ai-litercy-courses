<script setup lang="ts">

const emit = defineEmits(['toggle-karte'])

function karteEinklappen() {
  emit('toggle-karte', props.meinIndex)
}

const props = defineProps({
  titel: String,
  beschreibung: String,
  meinIndex: Number,
})

</script>

<template>
  <v-card
      text="AI Quests vermittelt Schülern im Alter von 11 bis 14 Jahren durch fesselnde Abenteuer Kenntnisse im Bereich der künstlichen Intelligenz. Hier gibt es mehr Infos, weil die Karte jetzt ausgeklappt ist!"
      title="AI Quest"
      variant="outlined"
  >
      <template v-slot:actions>
        <v-btn
            color="purple"
            href="https://research.google/ai-quests/intl/en_gb"
            varinat="elevated"
        >
          Zum Kurs
        </v-btn>
        <v-btn
            icon="mdi-chevron-up"
            @click="karteEinklappen()"
        />
      </template>
  </v-card>
</template>

<style scoped>

</style>