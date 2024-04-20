<script setup>
defineProps(['spot'])
import axios from 'axios'
import { ref } from 'vue'

const setError = ref(null);

async function createEvent(eventID, pinname, date, time, description, password) {
  setError.value = null;
  try {
    const response = await axios.post('http://localhost:8000/map/api/create-event', {
      eventID, pinname, date, time, description, password
    });
    return response.data;
  } catch (error) {
    setError.value = error;
    throw error;
  }
}

async function CreatingEvent(event) {
  const eventID = prompt("Enter the event's title:", "e.g.Joe's Skate Meetup");
  const pinname = prompt("Enter the Pin's Name:", "Use slected pins name here");
  const date = prompt("Enter the event's date:", "format:DD-MM-YYYY");
  const time = prompt("Enter the event's time:", "format: 630");
  const description = prompt("Enter the event's description:", "e.g. Skate meetup at the park");
  const password = prompt("Enter an admin password to delete later:", "e.g. password123");
  try {
    await createEvent(eventID, pinname, date, time, description, password);
  } catch (error) {
    console.error('Error creating event:', error);
  }
}
</script>

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" :src="spot['img']" />
        <div class="sidebar-contents">
            <h1>{{ spot['name'] }}</h1>
            <h2>Pos: {{ spot['pos']['lat'] }}, {{ spot['pos']['lng'] }}</h2>
            <button @click="CreatingEvent">Create Event For This Pin</button>
        </div>
    </div>
    <button class="close-button" @click="$emit('close-button')">
            < <!-- If this is underlined red, ignore it. It's correct. I'll replace it with an icon some day -->
    </button>
</template>

<style>
.close-button {
    grid-column: 2;
    grid-row: 1 / 3;
    border: 0;
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: #f0f0f0;
}
.close-button:hover {
    background-color: #e5e5e5;
}
.sidebar-img {
    grid-column: 1;
    grid-row: 1;
    object-fit: cover;
    width: 100%;
    min-height: 100%;
    background-color: white;
}
.sidebar-contents {
    grid-column: 1;
    grid-row: 2;
    color: white;
    background-color: darkcyan;
}
.sidebar-container {
    display: grid;
    grid-template-columns: calc(100% - 20px) 20px; 
    grid-template-rows: 40% 60%;
    text-align: center;
    height: 100%;
}
</style>