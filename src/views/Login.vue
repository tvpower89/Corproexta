<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await fetch('http://localhost:3000/login', { // Adjust the port if different
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });
  
          if (!response.ok) {
            throw new Error('Login failed');
          }
  
          const data = await response.json();
          console.log('Login successful', data);
          // Here, handle the successful login, e.g., redirecting the user or storing the login state
        } catch (error) {
          console.error('Error during login:', error);
          // Handle login errors here, e.g., showing an error message to the user
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  /* Add your styles for the login page here */
  </style>