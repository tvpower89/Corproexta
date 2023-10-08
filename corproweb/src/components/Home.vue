<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <router-link to="/reports/daily">Daily Reports</router-link>
    <router-link to="/reports/weekly">Weekly Reports</router-link>
    <router-link to="/reports/monthly">Monthly Reports</router-link>
    <!-- Add more report tabs as needed -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home-page',
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
