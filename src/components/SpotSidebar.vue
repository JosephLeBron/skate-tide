<script setup>
defineProps(['spot'])

</script>

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" :src="spot['img']" />
        <div class="sidebar-contents">
            <h1>{{ spot['name'] }}</h1>
            <h2>Pos: {{ spot['pos']['lat'] }}, {{ spot['pos']['lng'] }}</h2>
            <button>Create Event For This Pin</button>
            <h4>Create New Event</h4>
        </div>
    </div>
    <button class="close-button" @click="$emit('close-button')">
            < <!-- If this is underlined red, ignore it. It's correct. I'll replace it with an icon some day -->
    </button>
</template>

<style>
.close-button {
    grid-column: 2;
    grid-row: 1 / 3;
    border: 0;
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: #f0f0f0;
}
.close-button:hover {
    background-color: #e5e5e5;
}
.sidebar-img {
    grid-column: 1;
    grid-row: 1;
    object-fit: cover;
    width: 100%;
    min-height: 100%;
    background-color: white;
}
.sidebar-contents {
    grid-column: 1;
    grid-row: 2;
    color: white;
    background-color: darkcyan;
}
.sidebar-container {
    display: grid;
    grid-template-columns: calc(100% - 20px) 20px; 
    grid-template-rows: 40% 60%;
    text-align: center;
    height: 100%;
}
</style>