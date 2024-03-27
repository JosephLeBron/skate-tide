<template>
  <div class="container"> 
    <div v-if="!isLoggedIn">
      <h2>
      <form @submit.prevent="login" novalidate>
        <h1>Login</h1>
        <div>
          <label for="username">Email:</label>
          <input
            :class="{ invalid: invalidLogin }"
            v-model="username"
            type="text"
            id="username"
            required
          />
        </div>
          <div class="password-container">
            <label for="password">Password:</label>
            <input
              :class="{ invalid: invalidLogin }"
              v-model="password"
              type="password"
              id="password"
              required
            />
          </div>
          <div class="button-container">
            <button type="submit">Login</button>
            <button type="button" @click="createAccount">Create Account</button>
          </div>
      </form>
      </h2>
      </div>
    <div v-else>
      <h1>Welcome {{ username }}!</h1>
      <button @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { login, isLoggedIn } from './Auth';
// Holdes the data for the blank spaces
export default {
  data() {
    return {
      isLoggedIn: false,
      username: '',
      password: '',
      invalidLogin: false,
      userInfo: {},
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        alert('Please enter both username and password.');
        return;
      }
      try {
        const response = await axios.post('/api/login', {
          email: this.username,
          password: this.password
        });
        console.log('Login successful');
        login(response.data.token);
        this.invalidLogin = false;
        this.$router.push('/');
      } catch (error) {
        console.error('Error logging in: ', error);
        this.invalidLogin = true;
        alert('Invalid  email or password, Please try again.')
        }
      },
      // moves to the create account page
      createAccount() {
        this.$router.push({ name: 'CreateAccount' })
      },
      // clears the password
      clearPassword() {
        this.password = '';
      }
  }
}
</script>

<style scoped>
/* Add styles here in css */
h1 {
  color: black;
  background-color: rgb(13, 226, 180);
  width: 300px;
  border: 15px dotted gold;
  padding: 5px;
  margin: 5px;
  justify-content: center;
}
h2 {
    color: black;
    display: grid;
    height: auto;
    width: auto;
    justify-content: center;
    background-color: rgb(13, 226, 180);
  }
h3 {
  color: black;
  display: grid;
  height: auto;
  width: auto;
  justify-content: center;
  background-color: rgb(13, 226, 180);
}
.invalid {
  border-block: red;
}
.container {
  color: black;
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 3px solid teal;
  height: auto;
  width: auto;
  background-color: rgb(13, 226, 180);
}
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
label {
  color: black;
  align-items: flex-start;
}
button {
  background-color: dimgray;
  border: black;
  color: white;
  padding: 5px 10px;
  position: center;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 13px;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: gray;
  }
  &:active {
    background-color: black;
  }
}
</style>
