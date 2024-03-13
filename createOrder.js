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
    } 
}



export default createOrder