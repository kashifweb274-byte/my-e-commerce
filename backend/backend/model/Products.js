const mongoose = require('mongoose');

// Database mein saamaan kaisa dikhega, uska rule (Schema)
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);