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
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Implement login 
        if (this.username === 'user' && this.password === 'password') {
          // Redirect to home page
          this.$router.push('/home');
        } else {
          alert('Invalid credentials');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles here */
  </style>
  