<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>

<style scoped></style>
