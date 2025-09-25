const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, default: 1 },
    description: { type: String, default: 'good product' },
    category: { type: String, required: true },
    isDelete: { type: Boolean, default: false }  
}, { timestamps: true });

module.exports = mongoose.model('product', schema);
