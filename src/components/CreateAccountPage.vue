<template>
    <div>
      <form @submit.prevent="create-account" novalidate>
        <h1>Create Account</h1>
        <div>
        <h2>
            <div>
            <label for="username">Email:</label>
            <input type="email" v-model="email" required>
            </div>
            <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required>
            </div>
            <div>
            <label for="password">Repeat Password:</label>
            <input type="password" v-model="password" required>
            </div>
            <div>
            <button type="submit">Create Account</button>
            <button type="button" @click="cancel">Cancel</button>
            </div>
            <div v-if="invalidInput" class="error-message">
            Invalid email or password. Please try again.
            </div>
        </h2>
        </div>
      </form>
    </div>
</template>
  
<script>
import User from './User';
  
export default {
    data() {
        return {
            email: '', 
            password: '',
            invalidInput: false,
            };
        },
methods: {
    createAccount() {
    if (!this.email || !this.password) {
        alert('Please enter both email and password.');
        return;
        }
  
    const user = new User(this.email, this.password);
    if (user.isValidCredentials()) {
        //api call goes here
        console.log('Account created successfully.');
        this.$router.push('/login');
    } else {
        console.log('Invalid input');
        this.invalidInput = true;
        alert('Invalid email or password. Please try again.');
        }
    },
    cancel() {
        this.$router.push('/login');
        }
    }
};
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
  h2 {
    color: black;
    display: grid;
    height: auto;
    width: auto;
    justify-content: center;
    background-color: rgb(13, 226, 180);
  }
  .error-message {
    color: red;
    margin-top: 5px;
  }
  button {
    background-color: dimgray; /* Green */
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
  