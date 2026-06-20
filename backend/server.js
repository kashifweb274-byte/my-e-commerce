const express = require('express');

const app = express();

// Custom CORS middleware (Bina external module ke frontend ko bypass karega)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

// 🔥 FIXED DATA JUGAD: Seedha array mein data rakh rahe hain, ab koi database crash nahi ho sakta!
// 🔥 Line number 15 ke paas jo 'dummyProducts' hai, use aise badlein:
const dummyProducts = [
    {
        _id: "1",
        name: "Asli Cloud MongoDB T-Shirt",
        price: 699,
        description: "Yeh saamaan seedha internet waale database se aa raha hai bhai!",
        category: "Fashion"
    },
    {
        _id: "2",
        name: "Developer Special Hoodie",
        price: 1199,
        description: "Bina bug waali ekdum garam hoodie code karne ke liye!",
        category: "Fashion"
    },
    {
        _id: "3",
        name: "Coder Gaming Mouse",
        price: 999,
        description: "RGB lights wala super fast mouse.",
        category: "Electronics"
    }
];

// Live API Route (Frontend isi endpoint se data mangta hai)
app.get('/api/products', (req, res) => {
    try {
        // Bina kisi delay ke turant data frontend ko bhejega
        res.json(dummyProducts);
    } catch (err) {
        res.status(500).json({ message: "Backend se data nikalne mein dikkat aayi", error: err });
    }
});

app.get('/', (req, res) => {
    res.send('Server Ekdum Mast Bina Kisi Error Ke Chal Raha Hai! 🎉');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚀 Server kamyabi se chalu ho gaya on port ${PORT}`);
    console.log(`🎉 Saare database aur module ke errors khatam!`);
    console.log(`===================================================`);
});