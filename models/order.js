import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productName: String,
    quantity: {
        type: Number,
        default: 0
    }
});

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 
    items: [orderItemSchema],
    createdDate: {
        type: Date,
        default: Date.now // Automatically set to current date and time
    }
    // Add any other fields you might need
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
