<template>
  <div class="eventPage">
    <header>
      <h1>Skate the Wave Meetups</h1>
      <p>Find upcoming skate meetups at various spots around Wilmington!</p>
    </header>

    <main>
      <!--Events Section -->
      <section id="schedule">
        <h2>Upcoming Events</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Skate Spot location</th>
            <th>Details</th>
          </tr>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
//import EventItem from '../components/EventItem.vue'
//const components = { EventItem }
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