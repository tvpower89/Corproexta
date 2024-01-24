import mongoose from 'mongoose';
import Order from './models/order.js'; // Make sure this path is correct

async function createOrder() {
    try {
        await mongoose.connect('mongodb://localhost:27017/orderDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    
        // Create order items with default quantity of 0
        const dummyOrderItems = [
            {
                productName: 'Coffee Large',
                quantity: 2
            },
            {
                productName: 'Coffee Small',
                quantity: 0 // This quantity is explicitly set to 0 as per your schema's default
            },
            {
                productName: 'Large Tea',
                quantity: 1
            },
            {
                productName: 'Small Tea',
                quantity: 0 // This quantity is explicitly set to 0 as per your schema's default
            },
            // Add more dummy products as needed
        ];

        // Create a new order with these items
        const order = new Order({ items: dummyOrderItems });
        await order.save();

        console.log('Order added successfully');
    } catch (error) {
        console.error('Error creating order:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createOrder();