import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'

import 'dotenv/config';

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

app.post('/api/orders', async (req, res) => {
    const { name, orderItems } = req.body;
    try {
        await createOrder(name, orderItems);
        res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});



app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});