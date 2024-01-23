import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors'
import User from './models/user.js'
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

    // User authenticated
    res.json({ message: 'Login successful.' });
});


app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});