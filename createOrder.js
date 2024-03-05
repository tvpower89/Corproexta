import mongoose from 'mongoose';
import Order from './models/order.js'; // Make sure this path is correct
import 'dotenv/config' 
const uri = process.env.ATLAS_URI;
async function createOrder(name, orderItems, client) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    
        // Create order items with default quantity of 0
        

        // Create a new order with these items
        const order = new Order({ 
            name: name,
            items: orderItems,
            client: client
         });
        await order.save();

        console.log('Order added successfully');
    } catch (error) {
        console.error('Error creating order:', error);
    } finally {
        await mongoose.disconnect();
    }
}
const orderItems = [
    {
        productName: 'CHAKARO PEQUENO',
        quantity: 10
    },
    {
        productName: 'CHAKARO GRANDE',
        quantity: 5 // This quantity is explicitly set to 0 as per your schema's default
    },
    {
        productName: 'CHAKARO CAJETON',
        quantity: 8
    },
    {
        productName: 'MANDA\'OR CAJETON',
        quantity: 4// This quantity is explicitly set to 0 as per your schema's default
    },
    {
        productName: 'CAFE 100G',
        quantity: 69// This quantity is explicitly set to 0 as per your schema's default
    },
    {
        productName: 'CAFE 200G',
        quantity: 7// This quantity is explicitly set to 0 as per your schema's default
    },
    // Add more dummy products as needed
];

createOrder("Carlos", orderItems, "Company 4");