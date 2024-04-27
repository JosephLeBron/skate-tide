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
    <div data-testid="events-container" v-if="events.length > 0">
      <ul class="event-list">
        <li v-for="(event, index) in events" :key="index" class="event-item">
          <p><strong>Title:</strong> {{ event.eventID }}</p>
          <p><strong>Pin:</strong> {{ event.pinname }}</p>
          <p><strong>Date:</strong> {{ event.date }}</p>
          <p><strong>Up/Down Votes:</strong> {{ event.vote }}</p>
          <p><strong>Time:</strong> {{ event.time }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
          <input class="admin-password-input" type="password" v-model="event.deletionPassword" placeholder="Admin password">
          <button class="create-event-button" @click="deleteEvent(event)">Delete</button>
          <div>
            <button class="create-event-button" @click="upvoteEvent(event)">Upvote</button>
            <button class="create-event-button" @click="downvoteEvent(event)">Downvote</button>
          </div>
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


async function upvoteEvent(event) {
  event.vote++
  try {
    await axios.post('http://localhost:8000/event/api/upvote', { eventId: event.eventID })
    return { success: true, message: `Event ${event.eventID} upvoted successfully` }
  } catch (error) {
    console.error('Error upvoting event:', error)
    return { success: false, message: `Error upvoting event: ${error.message}` }
  }
}

async function downvoteEvent(event) {
  event.vote--
  try {
    await axios.post('http://localhost:8000/event/api/downvote', { eventId: event.eventID })
    return { success: true, message: `Event ${event.eventID} downvoted successfully` }
  } catch (error) {
    console.error('Error downvoting event:', error)
    return { success: false, message: `Error downvoting event: ${error.message}` }
  }
}

async function getEvents() {
  getError.value = null
  try {
    const response = await axios.post('http://localhost:8000/event/api/get-pins')
    events.value = response.data.map(event => ({
      eventID: event.eventID,
      pinname: event.pinname,
      date: event.date,
      time: event.time,
      description: event.description,
      password: event.password,
      vote: event.vote,
    }))
  } catch (error) {
    getError.value = error
  }
}
getEvents()

async function deleteEvent(event) {
  if (event.deletionPassword.toString() === event.password.toString()) {
    try {
      // Send request to delete event from database
      await axios.post('http://localhost:8000/event/api/delete-event', { eventID: event.eventID })
      events.value = events.value.filter(e => e.eventID !== event.eventID)
    } catch (error) {
      setError.value = error
    }
  } else {
    setError.value = new Error('Incorrect deletion password')
  }
}
</script>


<style scoped>
.admin-password-input {
    color: yellow; 
    background-color: teal; 
    border: 2px solid yellow;
    padding: 8px; 
    border-radius: 4px; 
}
.admin-password-input::placeholder {
    color: yellow;
}

.create-event-button {
    color: yellow;
    background-color: teal; 
    border: 2px solid yellow;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px; 
}
/* Main color teal and secondary color gold */
.main-container {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 20px;
  background-color: teal;
  color: #fff;
  width: 100%;
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

</style>

