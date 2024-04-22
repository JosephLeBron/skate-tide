<script setup>
import { ref, computed, onMounted } from 'vue'
import { GoogleMap, Marker, MarkerCluster, CustomControl } from 'vue3-google-map'
import { activeSubmitSpot } from '@/stores/activeSubmitSpot';
import { MapSpot } from './Spot';
import axios from 'axios'

const props = defineProps(['showSubmitMarker'])
const emit = defineEmits(['map-click', 'marker-click', 'submit-click', 'submit-drag'])

// Using vue3-google-map package to implement the Google Maps API
// Repo + documentation: https://github.com/inocan-group/vue3-google-map

function createPin(name, desc, lat, lon, rating, picture, difficulty) {
  axios.post('http://localhost:8000/pin/api/create-pin',
      { name, desc, lat, lon, rating, picture, difficulty }
    )
    .then(
      spots.value.push(
        new MapSpot(name, desc, lat, lon, picture, difficulty, rating)
      )
    )
    .catch(error => console.log(error))
}
defineExpose({createPin})

// Hardcode spots (for now), then convert database spots
function hardcodeSpots() {
  // Inserts hard-coded spots into database if they don't already exist.
  // Mostly for debugging, this will change or be removed before deployment.
  axios.post('http://localhost:8000/map/api/hardcode-pins')
    .catch(error => console.log(error))
}
hardcodeSpots()

// Gets an array of spot objects created from database query
const dbSpots = await axios
    .post('http://localhost:8000/map/api/get-pins')
    .then(response => {
      return convertSpots(response.data)
    })
    .catch(error => console.log("Error getting spots: " + error))
;

function convertSpots(spotArr) {
  // Convert each spot from database to a Spot object.
  const newSpots = []
  for (let i=0; i < spotArr.length; i++) {
    const spot = spotArr[i]
    newSpots.push(
      new MapSpot(spot.name, spot.desc, spot.lat, spot.lon, spot.picture, spot.difficulty, spot.rating)
    )
  }
  return newSpots
}

// Reactive array to store spots pulled from database
const spots = ref([])
onMounted(() => {
  // Assign database spots array to reactive spots array on mount
  spots.value = dbSpots
})

function handleMapClick(event) {
  // console.log("mapRef: " + mapRef.value)
  emit('map-click', event.latLng)
  updateSubmitPos(event)
}
function handleSubmitClick(event) {
  emit('submit-click', event.latLng)
  updateSubmitPos(event)
}
function handleSubmitDrag(event) {
  emit('submit-drag', event.latLng)
  updateSubmitPos(event)
}
function updateSubmitPos(event) {
  activeSubmitSpot.setPosFromLatLng(event.latLng)
}

const showFilterMenu = ref(false)
const useFilter = ref(false)
const FilterOptions = {
  DIFF_BEGINNER: "Beginner",
  DIFF_EASY: "Easy",
  DIFF_MEDIUM: "Medium",
  DIFF_HARD: "Hard",
  DIFF_EXPERT: "Expert"
}
const filter = ref({
  name: "",
  showDifficulty: [FilterOptions.DIFF_BEGINNER, FilterOptions.DIFF_EASY, FilterOptions.DIFF_MEDIUM, FilterOptions.DIFF_HARD, FilterOptions.DIFF_EXPERT],
  ratingMin: -1
})

function toggleFilter() {
  useFilter.value = !useFilter.value
  filterSpots()
}
function toggleFilterMenu() {
  showFilterMenu.value = !showFilterMenu.value
}
function filterDifficulty(difficulty) {
  useFilter.value = true
  if (difficulty) {
    if (filter.value.showDifficulty.includes(difficulty)) {
      // Removing difficulty filter array
      const index = filter.value.showDifficulty.indexOf(difficulty)
      filter.value.showDifficulty.splice(index, 1)
    } else {
      // Adding difficulty to filter array
      filter.value.showDifficulty.push(difficulty)
    }
  }
  filterSpots()
}
function filterSpots(withEnable = false) {
  if (withEnable) {
    useFilter.value = true
  }
  if (useFilter.value) {
    // Hide or show spots based on filter criteria
    for (let i = 0; i < spots.value.length; i++) {
      const spot = spots.value[i];
      if (
        filter.value.showDifficulty.includes(spot.difficulty) 
        && spot.name.toString().toLowerCase().includes(filter.value.name.toLowerCase())
        && spot.rating >= filter.value.ratingMin
        )
      {
        spot.show()
      } else {
        spot.hide()
      }
    }
  } else {
    // No filter: show all spots
    for (let i = 0; i < spots.value.length; i++) {
      const spot = spots.value[i];
      spot.show()
    }
  }
}

// Map reference + setting styles
const mapRef = ref(null)
const center = { lat: 34.210249, lng: -77.887004 } // Map centered on wilmington
// Region to restrict map panning
const restrictionBounds = {
  north: center['lat'] + 0.3,
  south: center['lat'] - 0.3,
  east: center['lng'] + 0.3,
  west: center['lng'] - 0.3
}
const mapStyles = [
  {
    // Disable points of interest, assign this to a custom toggle in the future?
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility:'off' }
    ]
  }
]

// Marker sizes are expressed as a Size of X,Y where the origin of the image
// (0,0) is located in the top left of the image.
// Origins, anchor positions and coordinates of the marker increase in the X
// direction to the right and in the Y direction down.
const markerIcon = computed(() => mapRef.value?.ready
  ? {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  }
  : null
)

// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
const shape = {
  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  type: 'poly'
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    api-key="AIzaSyCwzZFoGNcxoRMmQOlwrB81ShKfQNW1U6o"
    style="width: 100%; height: 100%"
    :center="center"
    :restriction="{latLngBounds: restrictionBounds}"
    :zoom="13"
    :minZoom="11"
    :styles="mapStyles"
    @click="handleMapClick"
  >
    <!-- Submission marker -->
    <Marker
      v-if="props.showSubmitMarker"
      :options="{
        position: activeSubmitSpot.pos(),
        draggable: true,
        zIndex: 1
      }"
      @click="handleSubmitClick"
      @drag="handleSubmitDrag"
      @dragend="handleSubmitClick"
    />

    <!-- MarkerCluster: Viewable spots -->
    <MarkerCluster>
      <Marker
        v-for="(spot, i) in spots"
        :key="i"
        :options="{
          position: spot.pos(),
          icon: markerIcon,
          shape: shape,
          title: spot.name.toString(),
          visible: spot.visible,
          zIndex: 0
        }"
        @click="emit('marker-click', spots[i])"
      />
    </MarkerCluster>

    <!-- Button to expand filter menu -->
    <CustomControl position="RIGHT_TOP">
      <button class="filter-btn" @click="toggleFilterMenu">▼</button>
    </CustomControl>

    <!-- Filter menu -->
    <CustomControl v-if="showFilterMenu" position="RIGHT_TOP">
      <div class="filter-menu">
        <div class="filter-wrapper">
          <div style="display: flex;">
            <!-- Header: enable/disable filter -->
            <div class="filter-header" style="flex: 1">Filter:</div>
            <input type="checkbox" id="toggleFilterBox" v-model="useFilter" @click="toggleFilter" style="height: 70%; flex: auto; align-self: center;">
            <span class="filter-item" style="flex: 1; align-self: center; color: #333;">
              <p v-if="useFilter">On</p>
              <p v-else>Off</p>
            </span>
          </div>
          <hr>

          <!-- Filter by name input -->
          <div class="filter-header">Name</div>
          <input type="text" v-model="filter.name" @input="filterSpots(true)" placeholder="Name" style="width: 100%; margin: auto">

          <!-- Filter by rating input -->
          <div class="filter-header">Rating</div>
          <div style="display: flex;">
            <div class="filter-item" style="flex: initial; align-self: center;">≥&nbsp;</div>
            <span class="filter-item" style="flex: auto; align-self: center;">
              <input type="number" v-model="filter.ratingMin" min="-1" max="5" @input="filterSpots(true)" style="width: 100%; margin: auto">
            </span>
          </div>

          <!-- Filter by difficulty input -->
          <div class="filter-header">Difficulty</div>
          <span class="filter-item">
            <input type="checkbox" id="beginnerBox" checked @click="filterDifficulty(FilterOptions.DIFF_BEGINNER)">
            <label for="beginnerBox" class="filter-item"> Beginner</label>
          </span>
          <span class="filter-item">
            <input type="checkbox" id="easyBox" checked @click="filterDifficulty(FilterOptions.DIFF_EASY)">
            <label for="easyBox" class="filter-item"> Easy</label>
          </span>
          <span class="filter-item">
            <input type="checkbox" id="mediumBox" checked @click="filterDifficulty(FilterOptions.DIFF_MEDIUM)">
            <label for="mediumBox" class="filter-item"> Medium</label>
          </span>
          <span class="filter-item">
            <input type="checkbox" id="hardBox" checked @click="filterDifficulty(FilterOptions.DIFF_HARD)">
            <label for="hardBox" class="filter-item"> Hard</label>
          </span>
          <span class="filter-item">
            <input type="checkbox" id="expertBox" checked @click="filterDifficulty(FilterOptions.DIFF_EXPERT)">
            <label for="expertBox"> Expert</label>
          </span>
        </div>
      </div>
    </CustomControl>
  </GoogleMap>
</template>

<style>
/* This line removes the annoying blue focus border around the map element */
.gm-style iframe + div { border:none!important; }

.filter-header {
  flex: 1;
  text-decoration: underline;
  font-size: 20px;
}

.filter-item {
  flex: 1;
  font-size: 16px;
}

.filter-wrapper {
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
  margin: 10px;
  height: calc(100% - 20px);
}

.filter-menu {
  box-sizing: border-box;
  background: white;
  color: black;
  height: 300px;
  width: 130px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

.filter-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

</style>
