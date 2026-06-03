<script setup lang="ts">
import logo from '../assets/logo-hs-fl.png'
</script>

<template>
  <v-container class="d-flex orange-border sticky-header" max-width="1920">
    <a
        href="https://hs-flensburg.de/"
    >
      <v-img
          :src="logo"
          width="104"
      />
    </a>
    <v-spacer />
    <div>
      <a class="link-styling"
          href="https://hs-flensburg.de/">
        Home
      </a>
      /
      <a class="link-styling" href="https://hs-flensburg.de/faq">
      FAQ
      </a>
      /
      <a class="link-styling" href="https://hs-flensburg.de/kontakt">
      Kontakt
      </a>
    </div>
  </v-container>
</template>

<style scoped>
.orange-border {
  border-bottom: 1px solid #d44500;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
}

.link-styling {
  color: #1E398F;
  text-decoration-color: #1E398F;
}
</style>