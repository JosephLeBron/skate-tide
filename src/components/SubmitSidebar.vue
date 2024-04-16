<script setup>
const props = defineProps(['submitSpot'])
const emit = defineEmits(['close', 'submit', 'cancel'])
// TODO:
// - When navigating away from the homepage while submit is in progress, ask for confirmation
// - Image upload
// - Input validation
</script>

<template>
    <div class="sidebar-container">
        <!-- Img to display before upload -->
        <img class="sidebar-img" src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=">

        <div class="sidebar-contents">
            <h1>Submit a Spot</h1>
            <div class="submission-form-container">
                <div class="submission-form">
                    <!-- Position header -->
                    <div>
                        <h3>Pos: {{ props.submitSpot.displayPos }}</h3>
                    </div>
                    
                    <!-- Image upload -->
                    <!-- <div>
                        <label for="file">Upload an image:</label>
                        <input type="file" accept="image/*" id="file" name="file" />
                    </div> -->

                    <!-- Temp: image url input -->
                    <div>
                        <label for="img">Image URL:</label>
                        <input type="text" id="img" v-model="props.submitSpot.img" />
                    </div>

                    <!-- Drop down menu for the difficulty: beginner, intermediate, or advanced -->
                    <div>
                        <label for="difficulty">Difficulty:</label>
                        <select id="difficulty" v-model="props.submitSpot.difficulty">
                            <option value="Beginner">Beginner</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
            
                    <!-- Title -->
                    <div>
                        <label for="title">Title:</label>
                        <input type="text" id="title" v-model="props.submitSpot.name" />
                    </div>
            
                    <!-- Description -->
                    <div>
                        <label for="description">Description:</label>
                        <textarea id="description" v-model="props.submitSpot.description" style="resize:vertical"></textarea>
                    </div>
            
                    <!-- Cancel and Submit buttons -->
                    <div class="button-container">
                        <button @click="emit('cancel')">Cancel</button>
                        <button @click="emit('submit')">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
        <button class="close-button" @click="emit('close')">
            < <!-- If this is underlined red, ignore it. It's correct. I'll replace it with an icon some day -->
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
    display: flex;
    align-items: center;
    justify-content: center;
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
.submission-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
}
.submission-form {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    /* border: 2px solid black; */
    border-radius: 10px;
    box-shadow: 0 0 5px black;
}
.label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
textarea,
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
button:active {
    background-color: #0056b3;
    transform: translateY(1px);
}
</style>