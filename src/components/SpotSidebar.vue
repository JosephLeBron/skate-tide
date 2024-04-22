<script setup>
import axios from 'axios'
const props = defineProps(['spot'])
const emit = defineEmits(['close', 'delete'])

// function deletePin(name, lat, lon) {
//     // setError.value = null;
//     // Implement deletion logic here
//     axios.post('http://localhost:8000/pin/api/delete-pin',
//             { name, lat, lon }
//         )
//         .then(() => {
//             // Handle deletion success
//             console.log(`Pin " ${name} "deleted Successfully`)
//             // Remove the deleted pin from the spots array or any other necessary action
//             // spot.value.push ({
//             //     name: null,
//             //     pos: { lat: null, lng: null },
//             //     rating: null,
//             //     img: null,
//             //     difficulty: null
//             // });
//         })
//         .catch((error) => {
//             // Handle error here, if needed
//             console.error("An error occurred during pin deletion:", error)
//         })
// }

// function handleButtonClick(spot) {
//     const confirmDelete = confirm(`Are you sure you want to delete the pin " ${spot.name} "?`);
//     if (confirmDelete) {
//         // deletePin(spot.name, spot.lat, spot.lng);
//         emit('delete', spot)
//     }
// }
</script>

<template>
    <div class="sidebar-container">
        <img class="sidebar-img" :src="props.spot['img']" />
        <div class="sidebar-contents">
            <!-- Name -->
            <h1>{{ props.spot.name || "Null" }}</h1>

            <!-- Description -->
            <h2 v-if="props.spot.description"> {{ props.spot.description }}</h2>
            <h2 v-else><i>No description</i></h2>

            <!-- Position -->
            <h2>Pos: {{ props.spot.getDisplayPos() || "Null" }}</h2>

            <!-- Difficulty -->
            <h2>Difficulty: {{ props.spot.difficulty || "Null" }}</h2>

            <!-- Rating -->
            <h2>Rating: {{ props.spot.rating === -1 ? "Unrated" : props.spot.rating }}</h2>

            <button class="delete-button" @click="emit('delete', spot)">Delete Pin</button>
        </div>
        <button class="close-button" @click="emit('close')">
            &lt;
        </button>
    </div>
</template>

<style scoped>
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
    overflow-wrap: break-word;
    overflow-y: scroll;
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