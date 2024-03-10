<template>
  <div class="profile">
    <h1>Skate the Tide</h1>
    <div class="profile-picture">
      <img
        class="profile-image"
        src="https://imgs.search.brave.com/OiqWN_bIGBqzyotUs_ptiiMKB7da91oyijKmSUV6IM0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk0L2Y1/L2IxLzk0ZjViMWZh/ZmU2MGRkNDdjM2Ez/Y2FmNGY2N2ZmZjAz/LmpwZw"
        alt="Profile Picture"
      />
    </div>
    <div class="about-me">
      <h2>About Me</h2>
      <p>
        Single handeledly taken down countless groups of GRU spetznaz operatives and helped allied
        forces in the accusition of nuclear war heads and metal gear walkers.
      </p>
    </div>
    <div class="recommended-spots">
      <h2>Recommended Spots</h2>
      <ul>
        <li>Spot 1</li>
        <li>Spot 2</li>
        <li>Spot 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
  // Add your component logic here
}
</script>

<style scoped>
/* Add your component styles here */
.profile {
  /* Styles for the profile container */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  /* Styles for the profile picture */
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust the margin-top value as needed */
}

.about-me {
  /* Styles for the about me section */
}

.recommended-spots {
  /* Styles for the recommended spots section */
}
</style>
