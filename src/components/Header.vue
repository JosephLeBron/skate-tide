<!-- Header.vue -->
<template>
  <header>
    <div class="wrapper">
      <HelloWorld v-if="showTitle" />
      <nav class="navbar" :class="{ 'full-screen': !showTitle }">
        <h2>
        <RouterLink to="/" class="button">Home</RouterLink>
        <RouterLink to="/login" class="button">Login</RouterLink>
        <RouterLink to="/profile" class="button">Profile</RouterLink>
        <RouterLink to="/events" class="button">Events</RouterLink>
        </h2>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const showTitle = window.innerWidth >= 1024 // Adjust the breakpoint as needed
</script>

<style scoped>
/* Header component styles go here */
header {
  background-color: #333;
  color: white;
  padding: 0px;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: content-box;
}
.button {
  color: white;
}
.button:hover {
  color: dimgray;
}

.button:active {
  color: black;
}
.button:focus {
  color: dimgray;
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

@media (min-width: 30000px) {
  header {
    display: inline-block;
    place-items: left;
    padding-right: calc(var(--section-gap) / 2);
    color: black;
  }

  .wrapper {
  float: left;
  display: block;
  color: white;
  text-align: left;
  padding: 14px 20px;
  text-decoration: none;
  }

  .navbar {
  float: left;
  display: block;
  color: white;
  text-align: left;
  padding: 14px 20px;
  text-decoration: none;
  }
}
</style>
