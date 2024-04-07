<template>
  <div>
    <h1>Events</h1>
    
    <!-- Display Errors -->
    <div v-if="debug">
      <p v-if="getError">Error fetching events: {{ getError.message }}</p>
      <p v-if="setError">Error creating event: {{ setError.message }}</p>
      <p v-if="popError">Error populating events: {{ popError.message }}</p>
    </div>

    <!-- Display Events -->
    <div v-if="event.length > 0">
      <ul>
        <li v-for="(event, index) in event" :key="index">
          <p><strong>Event ID:</strong> {{ event.eventID }}</p>
          <p><strong>Date:</strong> {{ event.date }}</p>
          <p><strong>Time:</strong> {{ event.time }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
        </li>
      </ul>
    </div>

    <!-- Form to Create Event -->
    <h2>Create New Event</h2>
    <form @submit.prevent="onCreateEvent">
      <label for="eventID">EventID:</label>
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
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'EventComponent',
  setup() {
    const debug = ref(false); 
    const getError = ref(null);
    const setError = ref(null);
    const popError = ref(null);
    const event = ref([]);
    const newEvent = ref({
      eventID: '',
      date: '',
      time: '',
      description: ''
    });

    async function getEvents() {
      // Queries the database
      getError.value = null;
      await axios
        .post('http://localhost:8000/event/api/get-events') 
        .then((response) => {
          // Executed on successful response
          event.value = [];
          
          response.data.forEach(element => {
            event.value.push({
              eventID: element.eventID,
              date: element.date,
              time:  element.time ,
              description: element.description
            });
          });
        })
        .catch(error => getError.value = error); 
    }

  async function createEvent(eventID, date, time, description) {
    setError.value = null;
    try {
      await axios.post('http://localhost:8000/event/api/create-event', {
        eventID,
        date,
        time,
        description
      });
      getEvents(); // Refresh the events 
      newEvent.value = {
        eventID: '',
        date: '',
        time: '',
        description: ''
      };
    } catch (error) {
      setError.value = error;
    }
  }

    async function populateEvents() {
      // Inserts hard-coded events into database if they don't already exist.
      popError.value = null;
      await axios
        .post('http://localhost:8000/event/api/hardcode-events')
        .catch(error => popError.value = error);
    }

    // Fetch Events
    getEvents();

    const onCreateEvent = async () => {
  await createEvent(newEvent.value.eventID, newEvent.value.date, newEvent.value.time, newEvent.value.description);
};

    return {
      debug,
      getError,
      setError,
      popError,
      event,
      newEvent,
      onCreateEvent
    };
  },
};
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
