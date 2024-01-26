import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors'
import User from './models/user.js'
import Order from './models/order.js'
import jwt from 'jsonwebtoken'


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/userDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Could not connect to MongoDB", error));




app.get('/', (req, res) => {
    res.json({message: "hello"})
});
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('email already exists');
    }

    const user = new User({
        email,
        password  // In real applications, hash and salt the password.
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'User not found.' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password.' });
    }

    // User authenticated, create a token
    const token = jwt.sign(
        { userId: user._id }, // Payload: typically user ID or other identifier
        'yourSecretKey',      // Secret key: Replace with a strong, environment-specific key
        { expiresIn: '1h' }   // Token expiration time
    );

    // Send the token to the client
    res.json({ message: 'Login successful.', token: token });
});
// Assuming Express.js setup
app.get('/api/orders/names', async (req, res) => {
    try {
        const names = await Order.distinct('name');
        res.json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/api/orders/by-name', async (req, res) => {
    const { name } = req.query;
    try {
        const orders = await Order.find({ name: name }).lean();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});