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
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in formattedOrders" :key="order._id">
            <td>{{ formatDate(order.createdDate) }}</td>
            <td>{{ order['CHAKARO PEQUENO'] || 0 }}</td>
            <td>{{ order['CHAKARO GRANDE'] || 0 }}</td>
            <td>{{ order['CHAKARO CAJETON'] || 0 }}</td>
            <td>{{ order["MANDA'OR CAJETON"] || 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: [],
      selectedName: '',
      selectedOrders: []
    }
  },
  created() {
    this.fetchNames()
  },
  methods: {
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
