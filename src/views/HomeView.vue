<script setup>
import { ref } from 'vue'
import HomeMap from '../components/HomeMap.vue';
import SpotSideBar from '../components/SpotSidebar.vue'

const showSidebar = ref(false)
const spot = ref(null)

function onMarkerClick(selected) {
  showSidebar.value = true
  spot.value = selected
}
</script>

<template>
  <div v-if="showSidebar" class="homeview-container">
    <div class="sidebar" style="width: 20%"> 
      <SpotSideBar :spot="spot" />
    </div>
    <div class="map" style="width: 80%"> 
      <HomeMap @marker-click="onMarkerClick"/>
    </div>
  </div>

  <div v-else class="homeview-container">
    <div class="map" style="width: 100%"> 
      <HomeMap @marker-click="onMarkerClick"/>
    </div>
  </div>
</template>

<style>
.sidebar {
  height: 100%;
  /* background: white; */
}
.map {
  width: 80%;
  height: 100%;
}
.homeview-container {
  display: flex;
  position: fixed;
  left: 0;  /* Change back to 0px when finished testing */
  right: 0;
  bottom: 0;
  z-index: 1;
}

@media (min-width: 1024px) {
  .homeview-container {
    top: 112px;
  }
}
@media (max-width: 1024px) {
  .homeview-container {
    top: 44px;
  }
}
</style>
