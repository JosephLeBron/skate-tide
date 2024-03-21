<template>
  <div class="map">
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
/* body {
  background-color: lightseagreen;
} */
.map {
  width: 500px;
  align-items: center;
}
</style>
