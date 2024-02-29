<template>
  <div class="welcome">
    <h1>This is the welcome page</h1>
  </div>
</template>

<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
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
</style>
