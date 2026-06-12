<script setup lang="ts">

const emit = defineEmits(['toggle-karte'])

function karteAusklappen() {
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
      :text="props.beschreibung"
      :title="props.titel"
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
            icon="mdi-chevron-down"
            @click="karteAusklappen()"
        />
      </template>
  </v-card>
</template>

<style scoped>

</style>