<script setup>
import { ref, computed } from 'vue'
import HomeMap from '../components/HomeMap.vue';
import Pin from '../components/Pin.vue';
import SpotSideBar from '../components/SpotSidebar.vue'

const showSidebar = ref(false)
const spot = ref(null)

const mapWidth = computed(() => {
  // Map is styled at 80% width if sidebar is open, 100% otherwise
  return showSidebar.value ? '80%' : '100%'
})

function onCloseBtnClick() {
  // Function to run when pressing the X button in the sidebar
  showSidebar.value = false
}

function onMarkerClick(selected) {
  // Function to run when clicking a marker on the map, selected
  // is the spot object associated with that marker
  showSidebar.value = true
  spot.value = selected
}

function onMapClick(spot){
  //Function to run when clicking on the map
  spot.value = {
    lat: lat,
    lng: lng,
    name: '', //  based on user input
    rating: '', 
    picture: '', 
    difficulty: '' 
  };
}
</script>

<template>
  <div class="homeview-container">
    <div v-if="showSidebar" class="sidebar" style="width: 20%"> 
      <SpotSideBar :spot="spot" @close-button="onCloseBtnClick" />
    </div>
    <div class="map" :style="{ width: mapWidth }">
      <HomeMap @marker-click="onMarkerClick" @handleMapClick = 'onMapClick'/>
    </div>
  </div>
</template>

<style>
.sidebar {
  min-width: 400px;
}
.map {
  height: 100%;
}
.homeview-container {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

@media (min-width: 1024px) {
  .homeview-container {
    /* Accounts for current header size change */
    top: 112px;
  }
}
@media (max-width: 1024px) {
  .homeview-container {
    /* Accounts for current header size change */
    top: 44px;
  }
}
</style>
