<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import KursKarteEingeklappt from "./KursKarteEingeklappt.vue";
import {ref} from "vue";
import KursKarteAusgeklappt from "@/components/KursKarteAusgeklappt.vue";

const karteAusgeklappt = ref(false);
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
    <KursKarteEingeklappt
        v-if="!karteAusgeklappt"
        @click="karteAusgeklappt = true"
    />
    <KursKarteAusgeklappt
      v-else
      @click="karteAusgeklappt = false"
    />
  </v-container>
</template>

<style scoped>

</style>