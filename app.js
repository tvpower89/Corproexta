import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors'
import User from './models/user.js'
import Order from './models/order.js'
import Notification from './models/notification.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import createOrder from './createOrder.js'
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.ATLAS_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log("Connected to MongoDB"))
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



app.get('/api/orders/', async (req, res) => {
    const { name, startDate, endDate, specificDate, clientName } = req.query;
    let query = {};

    if (name) {
        query.name = name;
    }
    if (clientName) {
        query.client = { $regex: clientName, $options: 'i' }; // This uses a regex for case-insensitive matching
    }

    if (specificDate) {
        const startOfDay = new Date(specificDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(specificDate);
        endOfDay.setDate(endOfDay.getDate() + 1);

        endOfDay.setHours(23, 59, 59, 999);

        query.createdDate = { $gte: startOfDay, $lte: endOfDay };
    } else {
        if (startDate) {
            query.createdDate = { ...query.createdDate, $gte: new Date(startDate) };
        }
        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setDate(endOfDay.getDate() + 1);
            query.createdDate = { ...query.createdDate, $lt: endOfDay };
        }
    }

    try {
        const orders = await Order.find(query).lean();
        res.json(orders);
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


app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id).lean();
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }
        res.json({ message: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.patch('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // If updating nested documents (e.g., items array), you might need a more complex update logic
        // For simplicity, this example assumes direct updates to fields at the root level of the document
        const updatedOrder = await Order.findById(id); // First, find the document

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Apply the updates from req.body to the found order document
        Object.keys(updates).forEach(updateKey => {
            // For nested arrays like 'items', you need to handle them differently
            // This example directly sets the value, but you might need to iterate over an array, for example
            updatedOrder[updateKey] = updates[updateKey];
        });

        await updatedOrder.save(); // Save the updated document

        res.json(updatedOrder); // Send back the updated document
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/orders', async (req, res) => {
    const { name, items, client } = req.body;

    try {
        // Save the new order
        const newOrder = new Order({ name, items, client });
        await newOrder.save();

        // Calculate date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Count existing orders for this client from this name in the last 30 days
        const count = await Order.countDocuments({
            name,
            client,
            createdDate: { $gte: thirtyDaysAgo }
        });

        // If more than 3 orders (including the current one), create a notification
        if (count > 3) {
            const message = `${name} has sent more than 3 orders to ${client} in the last 30 days.`;
            const notification = new Notification({ message });
            await notification.save();
            // Optionally, you can also send back a notification in the response or handle it as needed
        }

        res.status(201).json({ message: 'Order added successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

app.get('/api/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ date: -1 }); // Get the latest notifications
        res.json(notifications);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});