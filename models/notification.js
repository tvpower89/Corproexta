import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Additional fields as needed, e.g., to track if it's been read
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification