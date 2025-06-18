const express = require("express");
const router = express.Router();
const Product = require('../models/Product');

// To add new product in Mongodb
router.post('/', (req, res) => {
    const newProduct = new Product({ ...req.body });
    newProduct.save().then(() => {
        res.status(201).json({ message: 'Product Created Successfully', data: newProduct });
    }).catch((error) => {
        res.status(500).json({ message: 'Error Creating Product', error: error.message });
    })
});

// To get all Products
router.get('/', (req, res) => {
    Product.find().then((products) => {
        if (products.length !== 0) {
            res.json(products);
        } else {
            res.status(400).send('Product not found');
        }
    })
})

// Delete Product
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            res.json({ message: 'Product deleted Successfully' });
        } else {
            res.status(400).send('Product not found');
        }
    })
});

// Get Product by id
router.get('/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(400).send('Product not found');
        }
    })
});

// Update product by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document instead of original
            runValidators: true // schema validations are applied during update
        })

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ message: 'Product updated Successfully', data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Product', error: error.message });
    }
});

module.exports = router;
