<template>
    <div class="create-account">
    <CreateAccountPage />
    </div>
</template>
  
<script setup lang="ts">
/**
 * @author Sinclair DeYoung 
 * @purpose Create account page view path
 * @date Apr 1, 2024
 */
import CreateAccountPage from '../components/CreateAccountPage.vue'
</script>
  
<style>
@media (min-width: 1024px) {
    .create-account {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
}
</style>