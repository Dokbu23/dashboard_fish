<template>
  <div class="header">
      <h2>AUTOMATED WATER QUALITY MONITORING WITH AUTO FISH FEEDER</h2>
    </div>
   
  <div class="login-container">
      <button class="login-button" v-if="!user" @click="login">Login with Gmail</button>
   
   
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

export default {
  name: 'Login',
  data() {
    return {
      user: null
    };
  },
  methods: {
    async login() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        if (this.user) {
          window.location.href = "/Dashboard";  
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  created() {
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
    });
  }
};
</script>

<style scoped>
.header{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
  color: #333; /* Darker text color for better readability */
  font-size: 24px; /* Larger font size for the header */
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full-screen height */
  text-align: center;
  background-color: #f5f5f5; /* Light background for a clean look */
  font-family: Arial, sans-serif;
}

h2 {
  color: #4caf50; /* Green color for welcome text */
  margin-bottom: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button {

  background-color: #007bff; /* Blue background */
  color: white;
}

.login-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.logout-button {
  background-color: #f44336; /* Red background */
  color: white;
}

.logout-button:hover {
  background-color: #d32f2f; /* Darker red on hover */
}
</style>
