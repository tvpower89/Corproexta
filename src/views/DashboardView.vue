<template>
  <div>
    <select v-model="selectedName" @change="fetchOrdersForName">
      <option disabled value="">Please select a name</option>
      <option v-for="name in names" :key="name" :value="name">{{ name }}</option>
    </select>

    <div v-if="selectedOrders.length > 0">
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>CHAKARO PEQUENO</th>
            <th>CHAKARO GRANDE</th>
            <th>CHAKARO CAJETON</th>
            <th>MANDA'OR CAJETON</th>
            <th>Actions</th>
            <!-- New column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in formattedOrders" :key="order._id">
            <td>{{ formatDate(order.createdDate) }}</td>
            <td>{{ order['CHAKARO PEQUENO'] || 0 }}</td>
            <td>{{ order['CHAKARO GRANDE'] || 0 }}</td>
            <td>{{ order['CHAKARO CAJETON'] || 0 }}</td>
            <td>{{ order["MANDA'OR CAJETON"] || 0 }}</td>
            <td>
              <!-- New cells for actions -->
              <button @click="editOrder(order._id)">Edit</button>
              <button @click="deleteOrder(order._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="isEditing" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Order</h2>
      <form @submit.prevent="updateOrder">
        <div class="form-group">
          <label for="chakaroPequeno">CHAKARO PEQUENO</label>
          <input type="number" id="chakaroPequeno" v-model="editingOrder['CHAKARO PEQUENO']">
        </div>
        <div class="form-group">
          <label for="chakaroGrande">CHAKARO GRANDE</label>
          <input type="number" id="chakaroGrande" v-model="editingOrder['CHAKARO GRANDE']">
        </div>
        <div class="form-group">
          <label for="chakaroCajeton">CHAKARO CAJETON</label>
          <input type="number" id="chakaroCajeton" v-model="editingOrder['CHAKARO CAJETON']">
        </div>
        <div class="form-group">
          <label for="mandaorCajeton">MANDA'OR CAJETON</label>
          <input type="number" id="mandaorCajeton" v-model="editingOrder['MANDA\'OR CAJETON']">
        </div>
        <!-- Add more fields as necessary -->
        <button type="submit">Update Order</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: [],
      selectedName: '',
      selectedOrders: [],
      isEditing: false,
      editingOrder: null
    }
  },
  created() {
    this.fetchNames()
  },
  methods: {
    editOrder(orderId) {
      const order = this.selectedOrders.find((o) => o._id === orderId)
      if (order) {
        this.editingOrder = { ...order }
        this.isEditing = true
      }
    },

    async updateOrder() {
      if (!this.editingOrder) return

      try {
        const response = await fetch(`http://localhost:3000/api/orders/${this.editingOrder._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
            // Include the Authorization header if your API requires authentication
          },
          body: JSON.stringify({
            items: Object.keys(this.editingOrder)
              .filter((key) => key.includes('CHAKARO') || key.includes("MANDA'OR"))
              .map((key) => ({
                productName: key,
                quantity: this.editingOrder[key]
              }))
          })
        })

        if (!response.ok) {
          throw new Error('Failed to update the order')
        }

        // Update the order in selectedOrders
        const index = this.selectedOrders.findIndex((o) => o._id === this.editingOrder._id)
        if (index !== -1) {
          this.selectedOrders[index] = await response.json()
        }

        this.isEditing = false // Close the modal
        alert('Order updated successfully.')
      } catch (error) {
        console.error('There was an error updating the order:', error)
        alert('Failed to update the order.')
      }
    },

    async deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?')) {
        try {
          const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
              // Include the Authorization header if your API requires authentication
            }
          })

          if (!response.ok) {
            throw new Error('Failed to delete the order')
          }

          // Remove the deleted order from selectedOrders
          this.selectedOrders = this.selectedOrders.filter((order) => order._id !== orderId)
          alert('Order deleted successfully.')
        } catch (error) {
          console.error('There was an error deleting the order:', error)
          alert('Failed to delete the order.')
        }
      }
    },

    async fetchNames() {
      try {
        const response = await fetch('http://localhost:3000/api/orders/names')
        this.names = await response.json()
      } catch (error) {
        console.error('There was an error fetching the names:', error)
      }
    },

    async fetchOrdersForName() {
      if (!this.selectedName) return
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/by-name?name=${encodeURIComponent(this.selectedName)}`
        )
        this.selectedOrders = await response.json()
      } catch (error) {
        console.error('There was an error fetching the orders for this name:', error)
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US')
    }
  },

  computed: {
    formattedOrders() {
      return this.selectedOrders.map((order) => {
        const formattedOrder = {
          createdDate: order.createdDate,
          _id: order._id,
          'CHAKARO PEQUENO': 0,
          'CHAKARO GRANDE': 0,
          'CHAKARO CAJETON': 0,
          "MANDA'OR CAJETON": 0
        }

        order.items.forEach((item) => {
          if (formattedOrder.hasOwnProperty(item.productName)) {
            formattedOrder[item.productName] = item.quantity
          }
        })

        return formattedOrder
      })
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse; /* Ensures that the border is collapsed into a single border */
  width: 100%; /* Optional: Makes the table take full width of its container */
  margin-top: 1em; /* Optional: Adds some space above the table */
}

table,
th,
td {
  border: 1px solid black; /* Adds a border to the table, th, and td elements */
}

th,
td {
  padding: 8px; /* Adds some padding inside each cell for better readability */
  text-align: left; /* Aligns text to the left; can be adjusted as needed */
}

thead {
  color: black;
  background-color: #f2f2f2; /* Optional: Adds a background color to the table header */
}
</style>
