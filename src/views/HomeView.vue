<template>
  <map>
    <HomeMap />
  </map>
  <div class="test" @click="onClick">
    {{ count }}
  </div>
</template>

<script>
import HomeMap from '../components/HomeMap.vue';

export default {
  data() {
    return {
      count: 0
    }
  },
  components: {
    HomeMap
  },
  methods: {
    onClick() {
      this.count = this.count + 1
    }
  },
  mounted() {
    this.$root.$on('marker-click-event', this.onClick)
  }
}
</script>

<style>
.map {
  position: fixed;
  left: 100px;  /* Change back to 0px when finished testing */
  z-index: 1;
}
.test {
  position: fixed;
  left: 10px;
  color:black;
}

@media (min-width: 1024px) {
  .map {
    top: 112px;
    max-height: calc(100vh - 112px);
  }
}
@media (max-width: 1024px) {
  .map {
    top: 44px;
    max-height: calc(100vh - 44px);
  }
}
</style>
