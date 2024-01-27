<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: ''
    }
  },
  methods: {
    async submitForm() {
      this.loginError = ''
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Login failed')
        }

        const data = await response.json()
        localStorage.setItem('authToken', data.token)
        console.log('Login successful', data)
        this.$router.push('/dashboard') // Adjust this line as per your routing setup
      } catch (error) {
        console.error('Error during login:', error)
        this.loginError = error.message
      }
    }
  }
}
</script>

<<style scoped>
.login-page {
  max-width: 400px; /* Sets the maximum width of the login form */
  margin: 50px auto; /* Centers the form on the page with margin */
  padding: 20px; /* Adds some padding inside the box */
  border: 1px solid #ddd; /* Adds a light border */
  border-radius: 10px; /* Rounds the corners of the box */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow */
  background-color: white; /* Sets a white background color */
  text-align: center; /* Centers the text inside the login box */
}

input[type="email"], input[type="password"] {
  width: 100%; /* Makes the input fields take up 100% of the form's width */
  padding: 10px; /* Adds some padding inside the input fields */
  margin: 10px 0; /* Adds margin around the input fields */
  border: 1px solid #ddd; /* Adds a border to the input fields */
  border-radius: 5px; /* Rounds the corners of the input fields */
}

button {
  width: 100%; /* Makes the button take up 100% of the form's width */
  padding: 10px; /* Adds some padding inside the button */
  border: none; /* Removes the default border */
  border-radius: 5px; /* Rounds the corners of the button */
  background-color: #333; /* Sets the background color of the button */
  color: white; /* Sets the text color of the button */
  cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
}

button:hover {
  background-color: #555; /* Changes the background color when hovering over the button */
}
h1, label{
  color:#333
}
.error {
  color: red;
  /* Additional styling for error message if needed */
}
</style>