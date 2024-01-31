import mongoose from 'mongoose';
import Order from './models/order.js'; // Make sure this path is correct
import 'dotenv/config' 
const uri = process.env.ATLAS_URI;
async function createOrder(name, orderItems) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    
        // Create order items with default quantity of 0
        

        // Create a new order with these items
        const order = new Order({ 
            name: name,
            items: orderItems
         });
        await order.save();

        console.log('Order added successfully');
    } catch (error) {
        console.error('Error creating order:', error);
    } finally {
        await mongoose.disconnect();
    }
}
const dummyOrderItems = [
    {
        productName: 'CHAKARO PEQUENO',
        quantity: 22
    },
    {
        productName: 'CHAKARO GRANDE',
        quantity: 1 // This quantity is explicitly set to 0 as per your schema's default
    },
    {
        productName: 'MANDA\'OR CAJETON',
        quantity: 203// This quantity is explicitly set to 0 as per your schema's default
    },
    // Add more dummy products as needed
];

createOrder("Trevor", dummyOrderItems);