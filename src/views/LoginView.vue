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

<style scoped>
.login-page {
  /* Your styles for the login page */
}

.error {
  color: red;
  /* Additional styling for error message if needed */
}
</style>
