const express = require('express');
const router = express.Router();
const User = require('../model/User'); // User model ko connect kiya
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Register karne ke liye
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check karna ki email pehle se toh nahi hai
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email pehle se registered hai!" });

        // Password ko secure (hash) karna
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya user database mein save karna
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Registration Successful! 🎉" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 2. User Login karne ke liye
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Galat Email ya Password!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Galat Email ya Password!" });

        // Ek secure token banana session ke liye
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });
        res.json({ message: "Login Ho Gaya! 🎉", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;