<template>
  <div>
    <h1>Bounty</h1>
    <div>
      <p>Red Team: {{ redScore }}</p>
      <p>Blue Team: {{ blueScore }}</p>
      <p>Yellow Team: {{ yellowScore }}</p>
    </div>
    <form @submit.prevent="submitForm">
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
  methods: {
    async submitForm() {
      try {
        switch (this.selectedTeam) {
          case 'red':
            this.redScore++;
            await axios.put('http://localhost:8000/user/api/bounty', { team: 'red', score: this.redScore });
            break;
          case 'blue':
            this.blueScore++;
            await axios.put('http://localhost:8000/user/api/bounty', { team: 'blue', score: this.blueScore });
            break;
          case 'yellow':
            this.yellowScore++;
            await axios.put('http://localhost:8000/user/api/bounty', { team: 'yellow', score: this.yellowScore });
            break;
          default:
            break;
        }
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

<style scoped>
</style>
