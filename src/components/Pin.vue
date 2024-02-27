<template>
  <!doctype html>
  <html lang="en">
    <!--Andrew Teague-->
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, inital scale=1.0" />
      <title>Skate the Tide</title>
      <style>
        .pin {
          cursor: pointer;
        }
      </style>
    </head>

    <body>
      <div id="map"></div>
      <div id="pinInfo"></div>
      <script>
        class Pin {
            constructor(name, coordinates, picture, rating, description, difficulty) {
                this.name = name;
                this.coordinates = coordinates;
                this.picture = picture;
                this.rating = rating;
                this.description = description;
                this.difficulty = difficulty;
            }
        }
        const pins = [
            new Pin("5 Stair", { lat: 123.456, lng: 789.012 }, "stairs.jpg", 4.5, "5 Stair near downtown", "Intermediate"),
            new Pin("low curb", { lat: 456.789, lng: 012.345 }, "curb.jpg", 3.8, "small curb good for beginners", "Easy"),
        ];


        function displayPinInfo(pin) {
            const pinInfoElement = document.getElementById("pinInfo");
            // Construct HTML content for pin information
            const htmlContent = `
                <h2>${pin.name}</h2>
                <p>Coordinates: ${pin.coordinates.lat}, ${pin.coordinates.lng}</p>
                <p>Rating: ${pin.rating}</p>
                <p>Description: ${pin.description}</p>
                <p>Difficulty: ${pin.difficulty}</p>
            `;
            // Update pin information container
            pinInfoElement.innerHTML = htmlContent;
        }

        // Function to initialize the map

        // add pins
        pins.forEach((pin, index) => {
            // Create marker for each pin
            const marker = new google.maps.Marker({
                position: pin.coordinates,
                map: map,
                title: pin.name,
                icon: "pin-icon.png", // Replace with actual pin icon
            });

            // Add click event listener to marker
            marker.addListener("click", () => {
                // Display pin information when marker is clicked
                displayPinInfo(pin);
            });
        });
      </script>
    </body>
  </html>
</template>
