<script setup>
import { ref, computed } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'

// Using vue3-google-map package to implement the Google Maps API
// Repo + documentation: https://github.com/inocan-group/vue3-google-map

const mapRef = ref(null)
const center = { lat: 34.210249, lng: -77.887004 } /// centered on wilmington
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

/// List of Pins
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const spots = [
  {
    name: 'College & Oleander',
    pos: { lat: 34.210249, lng: -77.887004 },
    img: "https://www.starnewsonline.com/gcdn/authoring/2016/07/30/NSTN/ghows_image-NC-5726a99b-f46d-4e65-bd37-4d9c7d7930b5.jpeg?width=660&height=526&fit=crop&format=pjpg&auto=webp",
    zIndex: 0
  },
  {
    name: 'UNCW',
    pos: { lat: 34.224362, lng: -77.869558 },
    img: "https://uncw.edu/news/media/images/universal/uncw-northeast-entrance-20170818-d703767-news.jpg",
    zIndex: 1
  },
  {
    name: 'Wrightsville',
    pos: { lat: 34.206377, lng: -77.795885 },
    img: "https://u.realgeeks.media/networkwilmington1/2022blogimages/WrightsvilleBeach.jpeg",
    zIndex: 2
  },
  {
    name: 'Wade Park',
    pos: { lat: 34.179610, lng: -77.879753 },
    img: "https://www.wilmington-nc.com/images/uploads/place/3634/wilmington17-343.jpg",
    zIndex: 3
  },
  {
    name: 'Greenfield',
    pos: { lat: 34.215819, lng: -77.942528 },
    img: "https://www.outerbanks.com/images/uploads/place/2372/wilmington17-201.jpg",
    zIndex: 4
  }
]

// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
const shape = {
  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  type: 'poly'
}

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
          title: spot['name'],
          zIndex: spot['zIndex']
        }"
        @click="$emit('marker-click', spots[i])"
      />
    </MarkerCluster>
  </GoogleMap>
</template>
