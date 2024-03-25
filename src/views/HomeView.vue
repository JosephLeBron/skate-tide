<script setup>
import { ref } from 'vue'
import HomeMap from '../components/HomeMap.vue';
import SpotSideBar from '../components/SpotSidebar.vue'

const spotSelected = ref(false)
const spotName = ref('')
const spotPos = ref(null)

function onMarkerClick(spot) {
  spotSelected.value = true
  spotName.value = spot['name']
  spotPos.value = spot['pos']
}
</script>

<template>
  <div v-if="spotSelected" class="container">
    <div class="sidebar" style="width: 20%"> 
      <h1>Spot: {{ spotName }}</h1>
      <h2>Pos: {{ spotPos['lat'] }}, {{ spotPos['lng'] }}</h2>
      <!-- <SpotSideBar name={{ spotName.value }}></SpotSideBar> -->
    </div>
    <div class="map" style="width: 80%"> 
      <HomeMap @marker-click="onMarkerClick"/>
    </div>
  </div>

  <div v-else class="container">
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
.container {
  display: flex;
  min-width: 100vw;
  position: fixed;
  left: 0;  /* Change back to 0px when finished testing */
  bottom: 0;
  z-index: 1;
}
.test {
  position: fixed;
  left: 10px;
  color:black;
}

@media (min-width: 1024px) {
  .container {
    top: 112px;
    max-height: calc(100vh - 112px);
  }
}
@media (max-width: 1024px) {
  .container {
    top: 44px;
    max-height: calc(100vh - 44px);
  }
}
</style>
