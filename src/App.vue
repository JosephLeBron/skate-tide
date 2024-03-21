<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="content-wrapper">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
/* header {
  background-color: #333;
  color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
} */

nav {
  background-color: #f4f4f4;
  padding: 10px;
  position: fixed;
  top: 60px; /* Adjust value based on your header height */
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

nav a.router-link-exact-active {
  color: black;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid black;
  color: black;
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  margin-top: 0;
}
body {
  margin: 0;
  padding: 0;
}

.content-wrapper {
  margin-top: 0px; /* Adjust this value based on your header and nav height */
  padding: 0px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    color: black;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .wrapper {
    margin-top: calc(var(--section-gap) + 10px); /* Adjust as needed */
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    color: dimgray;
    padding: 1rem 0;
    margin-top: 1rem;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: lightgray;
    color: white;
    padding: 10px;
    margin-top: 0;
  }
}
</style>
