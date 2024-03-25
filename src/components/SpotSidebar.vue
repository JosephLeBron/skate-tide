<script setup>
// import { ref } from 'vue'
defineProps(['name', 'pos'])
</script>


<template>
    <h1>Spot: {{ name }}</h1>
    <h2>Pos: {{ pos['lat'] }}, {{ pos['lng'] }}</h2>
</template>