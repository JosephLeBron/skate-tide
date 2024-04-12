<script setup>
import { ref, computed } from 'vue'
import HomeMap from '../components/HomeMap.vue';
import Pin from '../components/Pin.vue';
import SpotSideBar from '../components/SpotSidebar.vue'
import SubmitSidebar from '../components/SubmitSidebar.vue'

// Need to add more robust logic for which sidebar to show.
// Initial thought: base it on most recent click. The click listeners
// toggle the other. Want to be able to click submit, enter some info,
// click on a spot to look at it, then click back on the submit marker
// and the info is still there. Close button always closes any open sidebar.

const showSpotSidebar = ref(false)
const spot = ref(null)

const showSubmitSidebar = ref(false)
const submitSpotObject = ref(null)

const mapWidth = computed(() => {
  // Map is styled at 80% width if sidebar is open, 100% otherwise
  return (showSpotSidebar.value || showSubmitSidebar.value) ? '80%' : '100%'
})

function onSpotCloseBtnClick() {
  // Function to run when pressing the X button in the spot sidebar
  showSpotSidebar.value = false
}
function onSubmitCloseBtnClick() {
  // Function to run when pressing the X button in the submit sidebar
  showSpotSidebar.value = false
}

function onMarkerClick(selected) {
  // Function to run when clicking a marker on the map, selected
  // is the spot object associated with that marker
  showSpotSidebar.value = true
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
      <div v-if="showSpotSidebar" class="sidebar" style="width: 20%"> 
        <SpotSideBar :spot="spot" @close-button="onSpotCloseBtnClick" />
      </div>

      <div v-if="showSubmitSidebar" class="sidebar" style="width: 20%">
        <SpotSideBar :spotObject="submitSpotObject" @close-button="onSubmitCloseBtnClick" />
      </div>

      <div class="map" :style="{ width: mapWidth }">
        <Suspense>
          <!-- Async component rendered once awaits are finished -->
          <HomeMap @marker-click="onMarkerClick" @handleMapClick = 'onMapClick'/>

          <!-- Fallback component to render while waiting -->
          <template #fallback>
            <div class="homeview-container">
              <div style="margin: auto; font-size: 30px; color: darkgray;">
                Loading...
              </div>
            </div>
          </template>
        </Suspense>
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
  top: 60px;  /* Header height */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #e8eaed;
}
</style>
