<!-- Andrew Teague -->
<template>
  <div ref="map" style="height: 400px;"></div>
  <!--  v-if is used to conditionally render a block and only continues if true -->
  <div v-if="showConfirmation" class="confirmation-modal">
    <div class="confirmation-content">
      <p>Do you want to add a spot here?</p>
      <button @click="confirmAddSpot">Yes</button>
      <button @click="cancelAddSpot">No</button>
    </div>
  </div>
</template>


<script>
import HomeMap from '../HomeMap.vue';
import db from '../assets/database.js';

export default {
  name: 'HomeMap',
  data() {
    return {
      map: null,
      showConfirmation: false,
      clickCoordinates: null
    };
  },
  // markers should appear when/where a user clicks on the map
  mounted() {
    // this event listener calls addMarker() when the map is clicked
    google.maps.event.addListener(HomeMap, "click", (event)); {
      addMarker(event.latLng, HomeMap);
      // Store click coordinates
      this.clickCoordinates = event.latLng;
      // Show confirmation modal
      this.showConfirmation = true;
    }
  },

  methods() {
    confirmAddSpot(); {
      // Hide confirmation modal
      this.showConfirmation = false;
      // Add marker at the clicked location
      this.addMarker(this.clickCoordinates, this.HomeMap);
      // insert pin info into database
      const createPin = db.prepare('INSERT INTO pins (lat, lon) VALUES (?, ?)');
      createPin.run(this.lat, this.lon);
    };
    cancelAddSpot(); {
      // Hide confirmation modal
      this.showConfirmation = false;
      // Reset click coordinates
      this.clickCoordinates = null;
    };
    // adds marker to the map
    addMarker(coordinates, HomeMap); {
      // add marker at the clicked location
      new google.maps.Marker({
        position: coordinates,
        map: HomeMap,
      });
    }
  }
};
</script>

<style scoped>
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirmation-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.confirmation-content p {
  margin-bottom: 10px;
}
</style>