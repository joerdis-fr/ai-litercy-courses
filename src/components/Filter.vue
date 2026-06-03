<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-select
      clearable
      chips
      color="primary"
      density="compact"
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
        label="Kategorie"
        :items="['Alle', 'Webanwendung', 'Greifbar', 'Curriculum', 'Roboter']"
        multiple
        variant="outlined"
    />
    <v-select
        clearable
        chips
        color="primary"
        density="compact"
        label="Alter"
        :items="['Alle', 'Grundschüler (6-11)', 'Mittelschüler(12-16)', 'Generell']"
        multiple
        variant="outlined"
    />
  </v-container>
</template>

<style scoped>

</style>