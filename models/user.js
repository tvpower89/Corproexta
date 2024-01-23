import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace from both ends of a string
        lowercase: true // Converts the email to lowercase
    },
    password: {
        type: String,
        required: true
    }
    // You can add additional fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
