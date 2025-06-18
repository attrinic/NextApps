// const mongoose = require('mongoose'); // ES5 
import mongoose from 'mongoose'; // ES6

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

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
// module.exports = Product;  // ES5 

