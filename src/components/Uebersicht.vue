<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarte from "@/components/KursKarte.vue";
</script>

<template>
  <v-container>
    <h1 class="ueberschrift">
      AI Literacy Kurse
    </h1>
    <h2>Filter </h2>
    <Filter />
    <v-divider />
    <h2>Ergebnisse </h2>
    <KursKarte />
  </v-container>
</template>

<style scoped>

</style>