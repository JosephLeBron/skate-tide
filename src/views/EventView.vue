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

    <!-- Button for Create Event Form -->
    <button @click="toggleForm" class="toggle-button">Create New Event</button>
    
    <!-- Create Event Form -->
    <div v-if="showForm" class="create-event-form">
      <h2>Create New Event</h2>
      <form @submit.prevent="onCreateEvent">
        <label for="eventID">Title:</label>
        <input type="text" id="eventID" v-model="newEvent.eventID" required>
        <br>

        <label for="date">Date:</label>
        <input type="text" id="date" v-model="newEvent.date" required>
        <br>

        <label for="time">Time:</label>
        <input type="text" id="time" v-model="newEvent.time" required>
        <br>

        <label for="description">Description:</label>
        <textarea id="description" v-model="newEvent.description" required></textarea>
        <br>

        <button type="submit">Create Event</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showForm = ref(false);
const newEvent = ref({
  eventID: '',
  date: '',
  time: '',
  description: ''
});

function toggleForm() {
  showForm.value = !showForm.value;
}

//hard coded events
const events = ref([
  {
    eventID: 'Skating Party Downtown',
    date: '2024-04-10',
    time: '18:00',
    description: 'Join us for a fun evening of skating in the city'
  },
  {
    eventID: 'Skate park competition',
    date: '2024-04-15',
    time: '14:00',
    description: 'Compete in our annual skate park competition'
  },
  {
    eventID: 'Skate park cleanup',
    date: '2024-04-20',
    time: '16:00',
    description: 'Help us clean up the skate park and make it better for everyone'
  }
]);

function onCreateEvent() {
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

