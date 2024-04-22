<template>
  <div class="container">
    <h1>Bounty Tricks</h1>
    <div class="team-container">
      <div class="team">
        <h2>Red Team</h2>
        <p>{{ redScore }}</p>
      </div>
      <div class="team">
        <h2>Blue Team</h2>
        <p>{{ blueScore }}</p>
      </div>
      <div class="team">
        <h2>Yellow Team</h2>
        <p>{{ yellowScore }}</p>
      </div>
    </div>
    <form class="form" @submit.prevent="submitForm">
      <label>
        I performed a:
        <select v-model="selectedTrick">
          <option v-for="trick in tricks" :key="trick">{{ trick }}</option>
        </select>
      </label>
      <span>for</span>
      <label>
        <input type="radio" v-model="selectedTeam" value="red"> Red
      </label>
      <label>
        <input type="radio" v-model="selectedTeam" value="blue"> Blue
      </label>
      <label>
        <input type="radio" v-model="selectedTeam" value="yellow"> Yellow
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      redScore: 0,
      blueScore: 0,
      yellowScore: 0,
      selectedTrick: '',
      selectedTeam: ''
    };
  },
  async created() {
    try {
      // Fetch team scores from the database
      const response = await axios.get('http://localhost:8000/user/api/bounty');
      const { redScore, blueScore, yellowScore } = response.data;

      // Update local data with fetched scores
      this.redScore = redScore;
      this.blueScore = blueScore;
      this.yellowScore = yellowScore;
    } catch (error) {
      console.error('Error fetching team scores: ', error);
    }
  },
  methods: {
    async submitForm() {
      try {
        switch (this.selectedTeam) {
          case 'red':
            this.redScore++;
            break;
          case 'blue':
            this.blueScore++;
            break;
          case 'yellow':
            this.yellowScore++;
            break;
          default:
            break;
        }

        // Call the updateTeamScores function
        await axios.post('http://localhost:8000/updateTeamScores', {
          team: this.selectedTeam,
          score: 1 // Assuming you always increase the score by 1
        });
      } catch (error) {
        console.error('Error updating team score: ', error);
      }
    }
  },
  computed: {
    tricks() {
      return ['Ollie', 'Kickflip', 'Heelflip', 'Pop Shove-it', 'Tre Flip', 'Varial Flip', 'Backside Flip', 'Frontside Flip', 'Nollie', 'Switch Heelflip'];
    }
  }
};
</script>

<style>
.container {
  text-align: center;
}

.team-container {
  display: flex;
  justify-content: space-around;
}

.team {
  margin-bottom: 20px;
}

.form {
  margin-top: 20px;
}
</style>
