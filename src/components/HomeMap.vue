<script setup>
import { ref, computed } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
import axios from 'axios'

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
          img: element.picture
        })
      })
    })
    .catch(error => getError.value = error) // Store message on error
}
async function createPin(name, lat, lon, rating, picture, difficulty) {
  // Creates a pin in the database with passed params as column values.
  // Not set up to store images yet, just storing URLs to pictures for now.
  // Calling looks like this:
  // createPin(
  //   'Breenfield', // Name
  //   '44.215819',  // Lat
  //   '-77.942528', // Lng
  //   '1',   // Rating
  //   'https://www.outerbanks.com/images/uploads/place/2372/wilmington17-201.jpg', // Pic (URL for now)
  //   'Easy' // Difficulty
  // )
  setError.value = null
  await axios
    .post('http://localhost:8000/map/api/create-pin', {
      name, lat, lon, rating, picture, difficulty
    })
    .catch(error => setError.value = error)
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
    class="map"
    :center="center"
    :zoom="13"
    :styles="mapStyles"
  >
    <!-- MarkerCluster -->
    <MarkerCluster>
      <Marker
        v-for="(spot, i) in spots"
        :key="i"
        :options="{
          position: spot['pos'],
          map: map,
          icon: markerIcon,
          shape: shape,
          title: spot['name']
        }"
        @click="$emit('marker-click', spots[i])"
      />
    </MarkerCluster>
  </GoogleMap>
  <div v-if="debug" style="display: grid; position: fixed; left: 700px; top: 200px; color:black; background-color: magenta;">
    <div>setError: {{ setError }}</div>
    <div>getError: {{ getError }}</div>
    <div>popError: {{ popError }}</div>
  </div>
</template>

<style>
/* This line removes the annoying blue focus border around the map element */
.gm-style iframe + div { border:none!important; }
</style>
