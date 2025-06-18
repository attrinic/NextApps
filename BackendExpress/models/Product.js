const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    starRating: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
