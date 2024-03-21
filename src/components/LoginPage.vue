<template>
  <div> 
    <div v-if="!isLoggedIn">
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
        <div>
          <label for="password">Password:</label>
          <input
            :class="{ invalid: invalidLogin }"
            v-model="password"
            type="password"
            id="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" @click="createAccount">Create Account</button>
      </form>
    </div>
    <div v-else>
      <h1>Welcome {{ username }}!</h1>
      <button @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import User from './User'
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
    login() {
      if (!this.username || !this.password) {
        alert('Please enter both username and password.');
        return;
      }
      // logging auth logic
      login('auth-token');
      this.isLoggedIn = true;
      this.$router.push('/')
    },
    // logging out auth logic
    logout() {
      logout()
      this.isLoggedIn = false;
      this.$router.push('/login');
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
  border: 15px solid black;
  padding: 25px;
  margin: 10px;
  justify-content: center;
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
label {
  color: black;
}
button {
  background-color: dimgray;
  border: black;
  color: white;
  padding: 5px 13px;
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
