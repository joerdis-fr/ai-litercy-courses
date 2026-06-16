<script setup lang="ts">

const emit = defineEmits(['toggle-karte'])

function karteAusklappen() {
  emit('toggle-karte')
}

const props = defineProps<{
  titel: string,
  beschreibung: string,
}>();
</script>

<template>
  <v-card
      :text="props.beschreibung"
      :title="props.titel"
      variant="outlined"
  >
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