<template>
  <div class="filter-container">
    <select v-model="selectedName" @change="fetchOrdersForName" class="filter-select">
      <option disabled value="">Please select a name</option>
      <option v-for="name in names" :key="name" :value="name">{{ name }}</option>
      <option value="all">All</option>
    </select>
    <div class="filter-item">
      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="startDate" />
    </div>
    <div class="filter-item">
      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="endDate" />
    </div>
    <div class="filter-item">
      <label for="specificDate">Specific Date:</label>
      <input type="date" id="specificDate" v-model="specificDate" />
    </div>
    <div class="filter-item">
      <label for="clientName">Client Name:</label>
      <input type="text" id="clientName" v-model="clientName" />
    </div>
    <button @click="fetchOrdersForName" class="filter-button">Filter</button>
  </div>

    <div class="orders-container" v-if="selectedOrders.length > 0">
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Name</th>
            <th>CHAKARO PEQUENO</th>
            <th>CHAKARO GRANDE</th>
            <th>CHAKARO CAJETON</th>
            <th>MANDA'OR CAJETON</th>
            <th>CAFE 100G</th>
            <th>CAFE 200G</th>
            <th>Client</th>
            <th>Actions</th>
            <!-- New column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in formattedOrders" :key="order._id">
            <td>{{ formatDate(order.createdDate) }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order['CHAKARO PEQUENO'] || 0 }}</td>
            <td>{{ order['CHAKARO GRANDE'] || 0 }}</td>
            <td>{{ order['CHAKARO CAJETON'] || 0 }}</td>
            <td>{{ order["MANDA'OR CAJETON"] || 0 }}</td>
            <td>{{ order['CAFE 100G'] || 0 }}</td>
            <td>{{ order['CAFE 200G'] || 0 }}</td>
            <td>{{ order.client }}</td>

            <td>
              <!-- New cells for actions -->
              <button @click="editOrder(order._id)">Edit</button>
              <button @click="deleteOrder(order._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  <div v-if="isEditing" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Order</h2>
      <form @submit.prevent="updateOrder">
        <div class="form-group">
          <label for="chakaroPequeno">CHAKARO PEQUENO</label>
          <input type="number" id="chakaroPequeno" v-model="editingOrder['CHAKARO PEQUENO']" />
        </div>
        <div class="form-group">
          <label for="chakaroGrande">CHAKARO GRANDE</label>
          <input type="number" id="chakaroGrande" v-model="editingOrder['CHAKARO GRANDE']" />
        </div>
        <div class="form-group">
          <label for="chakaroCajeton">CHAKARO CAJETON</label>
          <input type="number" id="chakaroCajeton" v-model="editingOrder['CHAKARO CAJETON']" />
        </div>
        <div class="form-group">
          <label for="mandaorCajeton">MANDA'OR CAJETON</label>
          <input type="number" id="mandaorCajeton" v-model="editingOrder['MANDA\'OR CAJETON']" />
        </div>
        <div class="form-group">
          <label for="cafe100g">CAFE 100G</label>
          <input type="number" id="cafe100g" v-model="editingOrder['CAFE 100G']" />
        </div>
        <div class="form-group">
          <label for="cafe200g">CAFE 200G</label>
          <input type="number" id="cafe200g" v-model="editingOrder['CAFE 200G']" />
        </div>

        <!-- Add more fields as necessary -->
        <button type="submit">Update Order</button>
      </form>
      
    </div>
  </div>
  
  <div class="pagination-container">
    <nav aria-label="Page navigation">
          <ul class="pagination">
            <li
              v-for="pageNum in pageNumbers"
              :key="pageNum"
              class="page-item"
              @click="fetchOrdersForName(pageNum)"
            >
              <a class="page-link">{{ pageNum }}</a>
            </li>
          </ul>
        </nav>
      </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      names: [],
      selectedName: '',
      clientName: '',
      specificDate: '',
      selectedOrders: [],
      startDate: '',
      endDate: '',
      isEditing: false,
      editingOrder: null
    }
  },
  created() {
    this.fetchNames()
    this.fetchOrdersForName() // Fetch all orders when component is created
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
              .filter(
                (key) => key.includes('CHAKARO') || key.includes("MANDA'OR") || key.includes('CAFE')
              )
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

    async fetchOrdersForName(page = this.currentPage) {
      // Default to current page if no page is provided
      this.currentPage = page
      let params = new URLSearchParams({
        // Add other parameters here
        page: this.currentPage,
        limit: 50
      })
      if (this.clientName) params.append('clientName', this.clientName)
      if (this.selectedName && this.selectedName !== 'all') params.append('name', this.selectedName)
      if (this.specificDate) params.append('specificDate', this.specificDate)
      else {
        if (this.startDate) params.append('startDate', this.startDate)
        if (this.endDate) params.append('endDate', this.endDate)
      }

      let url = `http://localhost:3000/api/orders/?${params.toString()}`

      try {
        const response = await fetch(url)
        const data = await response.json() // Ensure await is used correctly here
        this.selectedOrders = data.orders
        this.totalPages = data.totalPages
        console.log(this.totalPages + ' test')
      } catch (error) {
        console.error('There was an error fetching the orders:', error)
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US')
    }
  },

  computed: {
    pageNumbers() {
      console.log('Total pages:', this.totalPages)
      const numbers = Array.from({ length: this.totalPages }, (_, i) => i + 1)
      console.log('Page numbers:', numbers)
      return numbers
    },
    formattedOrders() {
      return this.selectedOrders.map((order) => {
        const formattedOrder = {
          createdDate: order.createdDate,
          name: order.name,
          _id: order._id,
          'CHAKARO PEQUENO': 0,
          'CHAKARO GRANDE': 0,
          'CHAKARO CAJETON': 0,
          "MANDA'OR CAJETON": 0,
          'CAFE 100G': 0,
          'CAFE 200G': 0,
          client: order.client
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
.filter-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px; /* Adjust space between filters as needed */
  padding: 20px; /* Add padding around the filter area */
}

.filter-select, .filter-item input, .filter-button {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.filter-select {
  cursor: pointer;
}

.filter-button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #0056b3;
}
.orders-container {
  padding: 0 20px; /* Adjust the 20px as needed */
}

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
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}
.pagination .page-item {
  margin: 0 5px;
  cursor: pointer;
}
.pagination .page-link {
  display: block;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #007bff;
  text-decoration: none;

}
.pagination-container {
  margin-bottom: 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
