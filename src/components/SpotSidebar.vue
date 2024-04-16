<script setup>
import axios from 'axios'
defineProps(['spot'])



async function deletePin(name, lat, lon, rating, picture, difficulty) {
    // setError.value = null;
    try {
        // Implement deletion logic here
        const response = await axios.post('http://localhost:8000/pin/api/delete-pin', {
        name, lat, lon, rating, picture, difficulty
    });
    return response.data;
    } catch (error) {
        // setError.value = error;
        throw error;
    }
}

function handleButtonClick(spot) {
    const confirmDelete = confirm(`Are you sure you want to delete the pin " ${spot.name} "?`);
    if (confirmDelete) {
        deletePin(spot.name, spot.pos.lat, spot.pos.lng, spot.rating, spot.picture, spot.difficulty )
            .then(() => {
                // Handle deletion success
                try {
                    console.log(`Pin " ${spot.name} "deleted Successfully`)
                    // Remove the deleted pin from the spots array or any other necessary action
                    // spot.value.push ({
                    //     name: null,
                    //     pos: { lat: null, lng: null },
                    //     rating: null,
                    //     img: null,
                    //     difficulty: null
                    // });
                } catch (error) {
                    console.error("An error occurred during pin deletion:", error);
                    // Handle error here, if needed
                }
            })
            .catch(error => console.error("An error occurred during pin deletion:", error));
    }
}
</script>

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" :src="spot['img']" />
        <div class="sidebar-contents">
            <h1>{{ spot['name'] }}</h1>
            <h2>Pos: {{ spot['pos']['lat'] }}, {{ spot['pos']['lng'] }}</h2>
            <button class="delete-button" @click="handleButtonClick(spot)">Delete Pin</button>
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