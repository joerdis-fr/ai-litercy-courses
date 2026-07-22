<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Uebersicht from '@/components/Uebersicht.vue'
</script>

<template>
  <v-app>
    <v-main>
      <Header />
      <Uebersicht />
    </v-main>
<!--    <v-btn-->
<!--      class="ma-2"-->
<!--      icon="mdi-theme-light-dark"-->
<!--      location="top right"-->
<!--      position="absolute"-->
<!--      @click="$vuetify.theme.cycle()"-->
<!--    />-->
  </v-app>
</template>

<style>
.ueberschrift {
  color: #1E398F;
  font-weight: bold;
}
</style>
