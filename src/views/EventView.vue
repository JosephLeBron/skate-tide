<template>
  <div class="event">
    <h1>This is an EVENT page</h1>
  </div>
</template>

<script setup lang="ts">
import EventItem from '../components/EventItem.vue'
const components = {EventItem};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
