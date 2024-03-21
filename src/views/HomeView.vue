<template>
  <map>
    <HomeMap />
  </map>
</template>

<script setup lang="ts">
import HomeMap from '../components/HomeMap.vue'
// const components = { HomeMap }
</script>

<style>
.map {
  position: fixed;
  left: 0px;
  z-index: 1;
}

@media (min-width: 1024px) {
  .map {
    top: 112px;
  }
}
@media (max-width: 1024px) {
  .map {
    top: 44px;
  }
}
</style>
