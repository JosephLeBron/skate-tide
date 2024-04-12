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
const showSubmitMarker = ref(false)
const submitSpotObject = ref({ name: '', pos: {lat: 0, lng: 0}, rating: 0, picture: '', difficulty: 0 })

const sidebarMode = {
  VIEW: 0,
  SUBMIT: 1
}
const mostRecentClick = ref(sidebarMode.SPOT)

const mapWidth = computed(() => {
  // Map is styled at 80% width if sidebar is open, 100% otherwise
  return (showSpotSidebar.value || showSubmitSidebar.value) ? '80%' : '100%'
})

function onSpotCloseBtnClick() {
  // Function to run when pressing the X button in the spot sidebar
  showSpotSidebar.value = false
  showSubmitSidebar.value = false
}
function onSubmitCloseBtnClick() {
  // Function to run when pressing the X button in the submit sidebar
  showSpotSidebar.value = false
  showSubmitSidebar.value = false
}

function onMarkerClick(selected) {
  // Function to run when clicking a marker on the map, selected
  // is the spot object associated with that marker
  showSpotSidebar.value = true
  mostRecentClick.value = sidebarMode.VIEW
  spot.value = selected
}
function onSubmitClick(latLng) {
  showSubmitSidebar.value = true
  showSubmitMarker.value = true
  mostRecentClick.value = sidebarMode.SUBMIT
  submitSpotObject.value['pos']['lat'] = latLng.lat()
  submitSpotObject.value['pos']['lng'] = latLng.lng()
}
function onSubmitCancel() {
  showSubmitSidebar.value = false
  showSubmitMarker.value = false
  mostRecentClick.value = sidebarMode.VIEW
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
      <div v-if="showSpotSidebar && mostRecentClick === sidebarMode.VIEW" class="sidebar" style="width: 20%"> 
        <SpotSideBar :spot="spot" @close-button="onSpotCloseBtnClick" />
      </div>

      <div v-if="showSubmitSidebar && mostRecentClick === sidebarMode.SUBMIT" class="sidebar" style="width: 20%">
        <SubmitSidebar :spotObject="submitSpotObject" @cancel-submit="onSubmitCancel" @close-button="onSubmitCloseBtnClick" />
      </div>

      <div class="map" :style="{ width: mapWidth }">
        <Suspense>
          <!-- Async component rendered once awaits are finished -->
          <HomeMap :showSubmitMarker="showSubmitMarker" @marker-click="onMarkerClick" @submit-click="onSubmitClick" @submit-drag="onSubmitClick"/>

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
