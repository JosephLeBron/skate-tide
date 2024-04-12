<script setup>
defineProps(['spotObject'])
</script>

<!-- The submit spot object holds input data so that you can click away from it, look
at other spots, then click on the submit marker again and the information is restored.
It's only destroyed when clicking "cancel" on submission form -->

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" />
        <div class="sidebar-contents">
            <h1>Name input</h1>
            <h2>Pos: {{ spotObject['pos']['lat'] }}, {{ spotObject['pos']['lng'] }}</h2>
            <h2>Difficulty input</h2>
            <h2>Rating input(?)</h2>
            <button @click="$emit('cancel-submit')">Cancel</button>
        </div>
        <button class="close-button" @click="$emit('close-button')">
            < <!-- If this is underlined red, ignore it. It's correct. I'll replace it with an icon some day -->
        </button>
    </div>
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