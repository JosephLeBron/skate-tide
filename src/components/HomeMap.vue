<script setup>
import { ref, computed } from 'vue'
import { GoogleMap, Marker, MarkerCluster, CustomControl } from 'vue3-google-map'
import axios from 'axios'

const emit = defineEmits(['marker-click', 'handleMapClick'])
console.log('hello script setup')

// Using vue3-google-map package to implement the Google Maps API
// Repo + documentation: https://github.com/inocan-group/vue3-google-map

const debug = ref(false) // Displays error messages on screen when true (set manually)
const spots = ref([]) // Stores an array of spot objects created from database query

// Store axios post response errors from service API calls
const getError = ref(null)
const setError = ref(null)
const popError = ref(null)

async function getSpots() {
  // Queries the database for stored pins and converts them to spot objects in the
  // format { name, pos: {lat, lng}, img}. This will be extended in the future
  getError.value = null
  await axios
    .post('http://localhost:8000/map/api/get-pins') // API call
    .then((response) => {
      // Executed on successful response
      spots.value = []
      // Convert each row from pins table to simpler objects in the format we were already using for spots.
      response.data.forEach(element => {
        spots.value.push({
          name: element.name,
          pos: { lat: element.lat, lng: element.lon },
          img: element.picture,
          difficulty: element.difficulty,
          rating: element.rating,
          show: true
        })
      })
    })
    .catch(error => getError.value = error) // Store message on error
}

async function createPin(name, lat, lon, rating, picture, difficulty) {
  setError.value = null
  try {
    const response = await axios.post('http://localhost:8000/pin/api/create-pin', {
      name, lat, lon, rating, picture, difficulty
    });
    return response.data;
  } catch (error) {
    setError.value = error;
    throw error;
  }
}

async function handleMapClick(event) {
  console.log("Map clicked at:", event.latLng.lat(), event.latLng.lng(),"!")
  const confirmAdd = confirm("Do you want to add a pin here?")
  if (confirmAdd) {
    const name = prompt("Enter the name for the pin:")
    const rating = prompt("Enter the rating for the pin (1-5):")
    const picture = prompt("Enter the picture URL for the pin:")
    const difficulty = prompt("Enter the difficulty for the pin:")
    createPin(name, event.latLng.lat(), event.latLng.lng(), rating, picture, difficulty)
      .then(() => {
        // Add the newly created pin to the map
        spots.value.push({
          name: name,
          pos: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          rating: rating,
          img: picture,
          difficulty: difficulty
        })
      })
      .catch(error => setError.value = error)
  }
}

async function populateSpots() {
  // Inserts hard-coded spots into database if they don't already exist.
  // Mostly for debugging, this will change or be removed before deployment.
  popError.value = null
  await axios
    .post('http://localhost:8000/map/api/hardcode-pins')
    .catch(error => popError.value = error)
}
populateSpots()
getSpots()

const showFilter = ref(false)
function toggleFilter() {
  showFilter.value = !showFilter.value
}
const FilterOptions = {
  DIFF_BEGINNER: "Beginner",
  DIFF_EASY: "Easy",
  DIFF_MEDIUM: "Medium",
  DIFF_HARD: "Hard",
  DIFF_EXPERT: "Expert",
  DIFF_OPTION_COUNT: 5  // Keeps count of difficulty options. Update if adding/removing any
}
const filter = ref({
  name: "",
  showDifficulty: [FilterOptions.DIFF_BEGINNER, FilterOptions.DIFF_EASY, FilterOptions.DIFF_MEDIUM, FilterOptions.DIFF_HARD, FilterOptions.DIFF_EXPERT],
  ratingMin: 1
})

function filterDifficulty(difficulty) {
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
function filterSpots() {
  for (let i = 0; i < FilterOptions.DIFF_OPTION_COUNT; i++) {
    const spot = spots.value[i];
    if (
      filter.value.showDifficulty.includes(spot.difficulty) 
      && spot.name.toLowerCase().includes(filter.value.name.toLowerCase())
      && spot.rating >= filter.value.ratingMin
      )
    {
      spot.show = true
    } else {
      spot.show = false
    }
  }
}

// Map reference + setting styles
const mapRef = ref(null)
const center = { lat: 34.210249, lng: -77.887004 } // Map centered on wilmington
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
    :zoom="13"
    :styles="mapStyles"
    @click="handleMapClick"
  >
    <!-- MarkerCluster -->
    <MarkerCluster>
      <Marker
        v-for="(spot, i) in spots"
        :key="i"
        :options="{
          position: spot['pos'],
          // map: map,
          icon: markerIcon,
          shape: shape,
          title: spot['name'],
          visible: spot.show
        }"
        @click="emit('marker-click', spots[i])"
      />
    </MarkerCluster>
    <CustomControl position="RIGHT_TOP">
      <button class="filter-btn" @click="toggleFilter">▼</button>
    </CustomControl>
    <CustomControl v-if="showFilter" position="RIGHT_TOP">
      <div class="filter-menu">
        <div class="filter-wrapper">
          <div class="filter-header">Name</div>
          <input type="text" v-model="filter.name" @input="filterSpots" placeholder="Name" style="width: 100%; margin: auto">

          <div class="filter-header">Min Rating</div>
          <span class="filter-item">
            <input type="number" v-model="filter.ratingMin" min="1" max="5" @input="filterSpots" style="width: 100%; margin: auto">
          </span>

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
  <div v-if="debug" style="display: grid; position: fixed; left: 700px; top: 200px; color:black; background-color: magenta;">
    <div>setError: {{ setError }}</div>
    <div>getError: {{ getError }}</div>
    <div>popError: {{ popError }}</div>
    <div>filter: {{ filter }}</div>
  </div>
</template>

<style>
/* This line removes the annoying blue focus border around the map element */
.gm-style iframe + div { border:none!important; }

.filter-header {
  margin-bottom: -5px;
  text-decoration: underline;
  font-size: 20px;
}

.filter-item {
  font-size: 16px;
  height: 100%;
}

.filter-wrapper {
  display: grid;
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
