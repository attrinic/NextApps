const express = require("express");
const cors = require('cors')
require('../db/db');

const Category = require('./Category');

const app = express();
app.use(cors());
const port = 4200;
app.use(express.json());

// To add new category in Mongodb
app.post('/category', (req, res) => {
    const newCategory = new Category({ ...req.body });
    newCategory.save().then(() => {
        res.status(201).json({ message: 'Category Created Successfully', data: newCategory });
    }).catch((error) => {
        res.status(500).json({ message: 'Error Creating Category', error: error.message });
    })
});

// To get all categories
app.get('/categories', (req, res) => {
    Category.find().then((categories) => {
        if (categories.length !== 0) {
            res.json(categories);
        } else {
            res.status(400).send('Category not found');
        }
    })
})

// Delete Category
app.delete('/category/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then((category) => {
        if (category) {
            res.json({ message: 'Category deleted Successfully' });
        } else {
            res.status(400).send('Category not found');
        }
    })
});

// Get Category by id
app.get('/category/:id', (req, res) => {
    Category.findById(req.params.id).then((category) => {
        if (category) {
            res.json(category);
        } else {
            res.status(400).send('Category not found');
        }
    })
});

// Update category by id
app.put('/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document instead of original
            runValidators: true // schema validations are applied during update
        })

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.json({ message: 'Category updated Successfully', data: updatedCategory });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Category', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})
