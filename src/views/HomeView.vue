<template>
  <div class="welcome">
    <h1>This is the welcome page</h1>
    <HomeMap />
  </div>
</template>

<script setup lang="ts">
import HomeMap from '../components/HomeMap.vue'
const components = { HomeMap }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
body {
  background-color: lightseagreen;
}
map {
  align-items: center;
}
</style>
