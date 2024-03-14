<!-- Nav.vue -->
<template>
  <nav class="navbar" :class="{ 'full-screen': isFullScreen }">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/events">Events</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isFullScreen = ref(window.innerWidth >= 1026)

const handleResize = () => {
  isFullScreen.value = window.innerWidth >= 1026
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Nav component styles go here */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: lightgray;
  color: black;
  padding: 10px;
  margin-top: 0;
  display: flex;
  justify-content: space-around;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.navbar a {
  text-decoration: none;
  color: inherit;
}

.navbar a:hover,
.navbar a.router-link-exact-active {
  background-color: #ddd;
  color: black;
}

.full-screen {
  position: fixed;
  z-index: 1;
}

@media (max-width: 1025px) {
  .navbar {
    justify-content: center;
  }
}
</style>
