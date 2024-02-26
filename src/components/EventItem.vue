<script lang="ts">
export default {
  data() {
    return {
      name: 'Default Event',
      desc: 'This is the default event description.',
      date: new Date(),
      pins: [],
      users_attending: []
    }
  }
}
</script>

<template>
  <h2 class="name">{{ name }} - {{ date.toDateString() }}</h2>
  <h3>{{ desc }}</h3>
</template>

<style>
.name {
  color: hsla(160, 100%, 37%, 1);
}
.description {
  color:black;
}
body{
  background-color: lightseagreen;
}
</style>