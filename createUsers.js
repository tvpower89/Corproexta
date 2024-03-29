import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user.js'
import 'dotenv/config' 
const uri = process.env.ATLAS_URI;
const saltRounds = 10;

async function createAdminUser(email, password) {
    try {
        await mongoose.connect(uri , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            email,
            password: hashedPassword,
            role: 'admin' // Assuming you have a role field to distinguish user types
        });

        await user.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// Replace with the admin's email and desired password
createAdminUser('mario@gmail.com', 'mario');
