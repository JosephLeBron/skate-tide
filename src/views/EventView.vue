<template>
  <div>
    <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/event" class="active">Events</router-link>
    </div>

    <header>
      <h1>Skate the Wave Meetups</h1>
      <p>Find upcoming skate meetups at various spots around Wilmington!</p>
    </header>

    <main>
      <!-- Events -->
      <section id="schedule">
        <h2>Upcoming Events</h2>
        <table v-if="events.length || databaseEvents.length">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Skate Spot location</th>
            <th>Details</th>
          </tr>
          <!-- Hardcoded  -->
          <tr v-for="(event, index) in events" :key="index" :class="{ 'even': index % 2 === 0, 'hover': hoverIndex === index }" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = null">
            <td>{{ event.date }}</td>
            <td>{{ event.time }}</td>
            <td>{{ event.location }}</td>
            <td>{{ event.details }}</td>
          </tr>
          <!-- Populate -->
          <tr v-for="(event, index) in databaseEvents" :key="'db_' + index" :class="{ 'even': (index + events.length) % 2 === 0, 'hover': hoverIndex === (index + events.length) }" @mouseover="hoverIndex = (index + events.length)" @mouseleave="hoverIndex = null">
            <td>{{ event.date }}</td>
            <td>{{ event.time }}</td>
            <td>{{ event.location }}</td>
            <td>{{ event.details }}</td>
          </tr>
        </table>
        <p v-else>No upcoming events found.</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, computed } from 'vue'

const debug = ref(false) // Displays error messages on screen when true (set manually)
// Store axios post response errors from service API calls
const getError = ref(null)
const setError = ref(null)
const popError = ref(null)
const event = ref([])

async function getEvents() {
  // Queries the database for stored pins and converts them to spot objects in the
  // format { name, pos: {lat, lng}, img}. This will be extended in the future
  getError.value = null
  await axios
    .post('http://localhost:8000/event/api/get-events') // API call
    .then((response) => {
      // Executed on successful response
      event.value = []
      // Convert each row from pins table to simpler objects in the format we were already using for spots.
      response.data.forEach(element => {
        event.value.push({
          date: element.name,
          time:  element.time ,
          description: element.description
        })
      })
    })
    .catch(error => getError.value = error) // Store message on error
}

async function createEvent(date, time, discription) {
  setError.value = null
  await axios
    .post('http://localhost:8000/event/api/create-event', {
      date, time, discription
    })
    .catch(error => setError.value = error)
}
async function populateEvents() {
  // Inserts hard-coded spots into database if they don't already exist.
  // Mostly for debugging, this will change or be removed before deployment.
  popError.value = null
  await axios
    .post('http://localhost:8000/event/api/hardcode-events')
    .catch(error => popError.value = error)
}

</script>

<style scoped>

.error-message {
  color: red;
  font-weight: bold;
}

body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  background-color: teal;
  color: #fff;
}

header {
  background-color: gold;
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 36px;
}

p {
  margin: 10px 0;
  font-size: 18px;
}

main {
  padding: 20px;
}

section#schedule {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

h2 {
  color: gold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border-bottom: 1px solid #fff;
  padding: 10px;
  text-align: left;
}

th {
  background-color: teal;
  color: gold;
}

tr.even {
  background-color: #333;
}

tr.hover {
  background-color: #555;
}

.navbar {
  overflow: hidden;
  background-color: #333;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: #ddd;
  color: black;
}
</style>
