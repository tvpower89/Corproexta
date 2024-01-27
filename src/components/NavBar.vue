import { RouterLink, RouterView } from 'vue-router'

<template>
  <nav class="navbar">
    <img src="../assets/corp.png" alt="Girl in a jacket" />
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" href="#home" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" href="#about" class="nav-link">About</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" href="#log-in" class="nav-link">Log in</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard" href="#dashboard" class="nav-link">Dashboard</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Navbar styling */
.navbar {
  background-color: #333; /* Dark background */
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* Logo image */
.navbar img {
  height: 60px; /* Adjust size as needed */
  margin-right: 20px;
}

/* Navigation list */
.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

/* Navigation items */
.nav-item {
  margin-left: 20px;
}

/* Navigation links */
.nav-link {
  color: white;
  text-decoration: none;
  padding: 14px 16px;
  display: block;
}

.nav-link:hover {
  background-color: #ddd;
  color: black;
}

/* Active link - you can dynamically add a class for the active link */
.nav-link.active {
  background-color: #04aa6d;
  color: white;
}
</style>
