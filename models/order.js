import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productName: String,
    quantity: {
        type: Number,
        default: 0
    }
});

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema]
    // Add any other fields you might need
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
