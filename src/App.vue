<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <v-app>
    <v-main>
      <Header />
      <HelloWorld />
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
