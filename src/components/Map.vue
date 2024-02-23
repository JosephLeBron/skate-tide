<script setup lang="ts">
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'

// Using vue3-google-map package to implement the Google Maps API
// Repo + documentation: https://github.com/inocan-group/vue3-google-map

const center = { lat: 34.225727, lng: -77.94471 } /// centered on wilmington

/// List of Pins
// Data for the markers consisting of a name and LatLng objects
// In actual implementation, this will be 
const spots = [
  {
    name: 'College', 
    pos: { lat: 34.21024948286535, lng: -77.88700419732456 }
  },
  {
    name: 'UNCW',
    pos: { lat: 34.22436205407568, lng: -77.86955828356946 }
  },
  { 
    name: 'Wrightsville',
    pos: { lat: 34.206377648975206, lng: -77.79588596113699 }
  },
  { 
    name: 'Park',
    pos: { lat: 34.179610791808145, lng: -77.87975362825102 }
  },
  { 
    name: 'Greenfield',
    pos: { lat: 34.21581910891144, lng: -77.94252873358592 }
  }
]

</script>

<template>
  <GoogleMap
    api-key="AIzaSyCwzZFoGNcxoRMmQOlwrB81ShKfQNW1U6o"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="13"
  >
    <!-- MarkerCluster -->
    <MarkerCluster>
      <Marker
        v-for="(spot, i) in spots"
        :key="i"
        :options="{
          position: spot['pos'],
          label: spot['name'][0]
        }"
      />
    </MarkerCluster>
  </GoogleMap>
</template>