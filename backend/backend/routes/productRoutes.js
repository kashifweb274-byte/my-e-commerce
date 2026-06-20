const express = require('express');
const router = express.Router();
const Product = require('../model/Product'); // Hamara Product model

// 1. Saare products ko get karne ka rasta (Fetch all products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server mein kuch gadd-badd hai' });
  }
});

// 2. Kisi ek product ko id se dhoodhne ka rasta (Get single product by ID)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Samaan nahi mila!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Galat ID ya server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../model/Product'); // Hamara model connect hua

// 1. Saare products ko database se laane ke liye (GET API)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server mein gadbad hai", error });
    }
});

// 2. Ek naya product database mein daalne ke liye (POST API - Testing ke liye)
router.post('/add', async (req, res) => {
    try {
        const { name, price, description, image, category, countInStock } = req.body;
        const newProduct = new Product({ name, price, description, image, category, countInStock });
        await newProduct.save();
        res.status(201).json({ message: "Product add ho gaya! 🎉", newProduct });
    } catch (error) {
        res.status(500).json({ message: "Product add nahi hua", error });
    }
});

module.exports = router;