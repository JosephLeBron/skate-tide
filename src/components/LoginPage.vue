<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login" novalidate>
      <h1>
        <h3>
          <label for="username">Username:</label>
          <input
            :class="{ invalid: invalidLogin }"
            v-model="username"
            type="text"
            id="username"
            required
          />

          <label for="password">Password:</label>
          <input
            :class="{ invalid: invalidLogin }"
            v-model="password"
            type="password"
            id="password"
            required
          />
        </h3>
        <button type="submit">Login</button>
        <button type="button" @click="createAccount">Create Account</button>
      </h1>
    </form>
  </div>
</template>

<script>
import User from './User'
// Holdes the data for the blank spaces
export default {
  data() {
    return {
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

      const user = new User(this.username, this.password);
      if (user.isValidCredentials()) {
        this.userInfo = {
          email: 'user@example.com',
          password: this.password,
        }
        // Redirect to home page after login
        console.log('Login successful. Redirecting to the home page.');
        this.$router.push('/')
      } else {
        console.log('Invalid credentials');
        this.invalidLogin = true
        alert('Invalid credentials')
      }
    },
    createAccount() {}
  }
}
</script>

<style scoped>
/* Add styles here in css */
h1 {
  color: black;
  background-color: bisque;
  width: 300px;
  border: 15px solid black;
  padding: 25px;
  margin: 10px;
}
h3 {
  color: black;
  display: grid;
  height: auto;
  width: auto;
  background-color: bisque;
}
h2 {
  color: black;
  display: flex;
}
button {
  background-color: dimgray; /* Green */
  border: black;
  color: white;
  padding: 7px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 13px;
  border-radius: 8px;
  justify-content: space-between;
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