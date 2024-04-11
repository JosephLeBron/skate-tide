<template>
  <div class="main-container">
    <h1>Upcoming Events</h1>
    
    <!-- Display Errors -->
    <div v-if="debug">
      <p v-if="getError">Error fetching events: {{ getError.message }}</p>
      <p v-if="setError">Error creating event: {{ setError.message }}</p>
      <p v-if="popError">Error populating events: {{ popError.message }}</p>
    </div>

    <!-- Events -->
    <div v-if="events.length > 0">
      <ul class="event-list">
        <li v-for="(event, index) in events" :key="index" class="event-item">
          <p><strong>Title:</strong> {{ event.eventID }}</p>
          <p><strong>Date:</strong> {{ event.date }}</p>
          <p><strong>Time:</strong> {{ event.time }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const debug = ref(false) // Displays error messages on screen when true (set manually)
const events = ref([]) // Stores an array of event objects created from database query

const getError = ref(null)
const setError = ref(null)
const popError = ref(null)

async function getEvents() {
  getError.value = null
  try {
    const response = await axios.post('http://localhost:8000/event/api/get-pins')
    events.value = response.data.map(event => ({
      eventID: event.eventID,
      date: event.date,
      time: event.time,
      description: event.description
    }))
  } catch (error) {
    getError.value = error
  }
}
getEvents()

async function createPin(eventID, date, time, description) {
  setError.value = null
  try {
    const response = await axios.post('http://localhost:8000/event/api/create-pin', {
      eventID, date, time, description
    });
    return response.data;
  } catch (error) {
    setError.value = error;
    throw error;
  }
}

</script>




<style scoped>
/* Main color teal and secondary color gold */
.main-container {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 20px;
  background-color: teal;
  color: #fff;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  border: 1px solid gold;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.toggle-button {
  background-color: gold;
  color: teal;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #ffd700; 
}

.create-event-form {
  display: none;
  margin-top: 20px;
}

.create-event-form.show {
  display: block;
}

.create-event-form h2 {
  color: gold;
}

.create-event-form label {
  display: block;
  margin-bottom: 5px;
}

.create-event-form input[type="text"],
.create-event-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.create-event-form button {
  background-color: gold;
  color: teal;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.create-event-form button:hover {
  background-color: #ffd700;
}
</style>

