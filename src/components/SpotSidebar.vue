<script setup>
// import { ref } from 'vue'
defineProps(['spot'])
</script>


<template>
    <div class="sidebar-img-container">
        <div class="box">
            test
        </div>
        <h1>Spot: {{ spot['name'] }}</h1>
        <h2>Pos: {{ spot['pos']['lat'] }}, {{ spot['pos']['lng'] }}</h2>
    </div>
</template>

<style>
.sidebar-img-container {
    width: 100%;
    height: 15%;
    border: 1px;
}
.sidebar-container {
    display: grid;
    width: 100%;
    height: 100%;
    color: black;
    background-color: plum;
}
</style>