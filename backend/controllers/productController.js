const Product = require('../backend/model/Product');

// Asli MongoDB Database se saamaan mangwane ka logic
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Yeh line database se saara saamaan nikalegi
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Database se saamaan nahi mila bhai! ❌", error });
    }
};

module.exports = { getProducts };