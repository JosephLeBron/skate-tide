<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
  
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
   
  <script>
  // Holdes the data for the blank spaces
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Implemented hardcoded login 
        if (this.username === 'user' && this.password === 'password') {
          // Redirect to home page after login
          this.$router.push('/home');
        } else {
          alert('Invalid credentials');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles here in css */
  </style>
  