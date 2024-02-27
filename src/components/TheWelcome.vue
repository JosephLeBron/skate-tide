<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
  </WelcomeItem>
</template>

<style>
body {
  background-color: lightseagreen;
}
</style>
