<script setup>
// import { ref } from 'vue'
defineProps(['spot'])
</script>

<template>
    <div class="sidebar-container">
        <button class="close-button" @click="$emit('close-button')">X</button>
        <img :src="spot['img']" class="sidebar-img" />
        <h1>{{ spot['name'] }}</h1>
        <h2>Pos: {{ spot['pos']['lat'] }}, {{ spot['pos']['lng'] }}</h2>
    </div>
</template>

<style>
.close-button {
    position: absolute;
    right: 80%;
}
.sidebar-img {
    align-items: center;
    width: 100%;
    height: 30%;
    background-color: white;
}
.sidebar-container {
    display: flexbox;
    text-align: center;
    width: 100%;
    height: 100%;
    color: white;
    background-color: darkcyan;
}
</style>