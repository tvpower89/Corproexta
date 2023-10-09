const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/userDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Could not connect to MongoDB", error));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = new mongoose.model("User", userSchema);

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

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not found.');
    }

    // Check password (in plaintext)
    if (user.password !== password) {
        return res.status(400).send('Invalid password.');
    }

    res.send('Login successful.');
});


app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});

