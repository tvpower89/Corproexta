<template>
    <div class="notification-container">
      <h1>Notifications</h1>
      <div v-if="notifications.length">
        <table>
          <thead>
            <tr>
              <th>Notification Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notification in notifications" :key="notification._id">
              <td>{{ notification.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No notifications found.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    created() {
      this.fetchNotifications();
    },
    methods: {
      async fetchNotifications() {
        try {
          const response = await fetch('http://localhost:3000/api/notifications'); // Adjust this URL to your API endpoint
          if (!response.ok) throw new Error('Failed to fetch notifications');
          this.notifications = await response.json();
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  .notification-container {
    color: white; /* Makes text color white */
  }
  
  table {
    width: 100%; /* Makes table width 100% of its container */
    border-collapse: collapse; /* Collapses border to avoid double borders */
  }
  
  th, td {
    border: 1px solid white; /* Adds white border to table header and cell */
    padding: 8px; /* Adds padding inside table cells */
    text-align: left; /* Aligns text to the left */
  }
  
  thead {
    background-color: #555; /* Darker background for the table header */
  }
  
  tbody tr:nth-child(odd) {
    background-color: #333; /* Adds a darker background to every other row */
  }
  
  tbody tr:hover {
    background-color: #777; /* Changes background color of row on hover */
  }
  </style>
  