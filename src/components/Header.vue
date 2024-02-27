<!-- Header.vue -->
<template>
  <header>
    <div class="wrapper">
      <HelloWorld v-if="showTitle" :msg="pageTitle" />
      <nav class="navbar" :class="{ 'full-screen': !showTitle }">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'; // Assuming you have a HelloWorld component

const showTitle = window.innerWidth >= 1024; // Adjust the breakpoint as needed
const pageTitle = "Home"; // Set your desired page title dynamically
</script>

<style scoped>
/* Header component styles go here */
header {
  background-color: #333;
  color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

.wrapper {
  max-width: 1024px; /* Set a max-width for the wrapper */
  margin: 0 auto; /* Center the wrapper */
}

@media (max-width: 1024px) {
  .wrapper {
    width: 100%; /* Take full width on smaller screens */
  }
}

.full-screen {
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    color: black;
  }

  .wrapper {
    margin-top: calc(var(--section-gap) + 10px); /* Adjust as needed */
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .navbar {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    color: dimgray;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
