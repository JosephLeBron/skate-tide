<template>
  <div class="login">
    <LoginPage />
  </div>
</template>

<script setup lang="ts">
/**
 * @author Sinclair DeYoung 
 * @purpose Login page view path
 * @date Apr 1, 2024
 */
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
