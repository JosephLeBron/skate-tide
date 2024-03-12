<template>
  <div class="login">
    <LoginPage />
  </div>
</template>

<script setup lang="ts">
import LoginPage from '../components/LoginPage.vue'
const components = { LoginPage }
</script>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
