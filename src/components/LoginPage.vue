<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <h1>
      <h3>
      <label for="username">Username:</label>
      <input :class="{'invalid': invalidLogin }" v-model="username" type="text" id="username" required />

      <label for="password">Password:</label>
      <input :class="{'invalid': invalidLogin }" v-model="password" type="password" id="password" required />
      </h3>
      <button type="submit">Login</button>
      <button type="button" @click="createAccount">Create Account</button>
      </h1>
    </form>
  </div>
</template>

<script>
// Holdes the data for the blank spaces
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Implemented hardcoded login
      if (this.username === 'user' && this.password === 'password') {
        // Redirect to home page after login
        this.$router.push('/')
      } else {
        alert('Invalid credentials')
      }
    },
    createAccount(){

    }
  }
}
</script>

<style scoped>
/* Add styles here in css */
body{background-color: lightseagreen;}
h1{
  color: black;
  background-color: bisque;
  width: 300px;
  border: 15px solid black;
  padding: 25px;
  margin: 10px;
}
h3{
  color: black;
  display: grid;
  height: auto;
  width:auto;
  background-color: bisque;
  
}
h2{
  color: black;
  display: flex;
}
button{
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
}

</style>
