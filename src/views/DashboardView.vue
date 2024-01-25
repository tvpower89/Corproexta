<template>
  <div>
    <select v-model="selectedName" @change="fetchOrdersForName">
      <option disabled value="">Please select a name</option>
      <option v-for="name in names" :key="name" :value="name">{{ name }}</option>
    </select>

    <div v-if="selectedOrders.length > 0">
      <div v-for="order in selectedOrders" :key="order._id">
        <h3>Order for {{ order.name }}:</h3>
        <ul>
          <li v-for="item in order.items" :key="item._id">
            {{ item.productName }} - Quantity: {{ item.quantity }}
          </li>
        </ul>
      </div>
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
    };
  },
  created() {
    this.fetchNames();
  },
  methods: {
    async fetchNames() {
      try {
        const response = await fetch('http://localhost:3000/api/orders/names');
        this.names = await response.json();
      } catch (error) {
        console.error('There was an error fetching the names:', error);
      }
    },
    async fetchOrdersForName() {
      if (!this.selectedName) return;
      try {
        const response = await fetch(`http://localhost:3000/api/orders/by-name?name=${encodeURIComponent(this.selectedName)}`);
        this.selectedOrders = await response.json();
      } catch (error) {
        console.error('There was an error fetching the orders for this name:', error);
      }
    }
  }
};
</script>
