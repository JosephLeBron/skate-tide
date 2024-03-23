<template>
    <div>
      <form @submit.prevent="createAccount" novalidate>
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
            <label for="repeatPassword">Repeat Password:</label>
            <input type="password" v-model="repeatPassword" required>
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
//import User from './User';
import axios from 'axios';
  
export default {
    data() {
        return {
          email: '', 
          password: '',
          repeatPassword: '',
          invalidInput: false,
          };
        },
methods: {
    async createAccount() {
      console.log('Button Clicked');
      if (!this.email || !this.password || !this.repeatPassword) {
          alert('Please enter your email and create a password.');
          return;
          }
      
      if (this.password !== this.repeatPassword){
        alert('Passwords do not match. Please try again.');
        return;
      }
      
      try {
        const response = await axios.post('api/create-account',{
          email: this.email,
          password: this.password
        });
        console.log('Account created successfully.');
        this.$rounter.push('/');
      }catch (error) {
        console.error('Error creating account: ', error);
        this.invalidInput = true;
        alert('Error creating account. Please try again.');
        this.clearPasswords();
      }
      // const user = new User(this.email, this.password);
      // if (user.isValidCredentials()) {
      //     //api call goes here
      //     console.log('Account created successfully.');
      //     this.$router.push('/login');
      // } else {
      //     console.log('Invalid input');
      //     this.invalidInput = true;
      //     alert('Invalid email or password. Please try again.');
      //     this.clearPasswords();
      //     }
      },
      cancel() {
        this.$router.push('/login');
      },
      clearPasswords(){
        this.password = '';
        this.repeatPassword = '';
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
  