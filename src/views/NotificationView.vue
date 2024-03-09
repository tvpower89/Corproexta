<template>
  <div class="notification-container">
    <h1>Notifications</h1>
    <button @click="clearNotifications" v-if="notifications.length">Clear All</button>
    <!-- Clear button -->
    <div v-if="notifications.length">
      <table>
        <thead>
          <tr>
            <th>Notification Message</th>
            <th>Actions</th>
            <!-- Added column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in notifications" :key="notification._id">
            <td>{{ notification.message }}</td>
            <td>
              <!-- Button to delete individual notification -->
              <button @click="deleteNotification(notification._id)">Delete</button>
            </td>
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
      notifications: []
    }
  },
  created() {
    this.fetchNotifications()
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await fetch('http://localhost:3000/api/notifications') // Adjust this URL to your API endpoint
        if (!response.ok) throw new Error('Failed to fetch notifications')
        this.notifications = await response.json()
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    },
    async deleteNotification(notificationId) {
      try {
        await fetch(`http://localhost:3000/api/notifications/${notificationId}`, {
          method: 'DELETE'
        })
        this.notifications = this.notifications.filter((n) => n._id !== notificationId)
      } catch (error) {
        console.error('Error deleting notification:', error)
      }
    },
    async clearNotifications() {
      try {
        // Assuming /api/notifications/clear deletes all notifications
        await fetch('http://localhost:3000/api/notifications', { method: 'DELETE' })
        this.notifications = []
      } catch (error) {
        console.error('Error clearing notifications:', error)
      }
    }
  }
}
</script>

<style></style>
