const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// get url and secret 
const JWT_SECRET = process.env.JWT_TOKEN;
const salt = 10;

// To add new user in Mongodb
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    
    const response = await verifyUserLogin(email, password);
    //return res.json(response);
    if (response.status === 'ok') {
        // Store JWT token as a cookie in browser
        const token = response.data; 
        //res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true }) // store in cookie for 1 hour
        //res.redirect('/'); // redirecting to main page
        res.cookie('token', 'testtok', {
            maxAge: 900000, // Cookie expiration time in milliseconds (15 minutes)
            httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
            sameSite: 'strict'
        });
        
        return res.json(response);
    } else {
        return res.json(response);
    }
});

/**
 * Verify User Login
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const verifyUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({ id: user._id, username: user.email, type: 'user' }, JWT_SECRET); // jwt token
            return { status: 'ok', data: token };
        }

        return { status: 'error', error: 'invalid password, Please try again.'}
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'Connection timed out' }
    }
}

/**
 * Validate token
 * @param {*} token 
 * @returns 
 */
const verifyToken = (token) => {
    if (!token) {
        console.log("No token provided");
        return false;
    }

    try {
        const verify = jwt.verify(token, JWT_SECRET);
        return verify.type === 'user';
    } catch (error) {
        console.log("Token verification error:", error.message);
        return false;
    }
};

// To add new user in Mongodb
router.post('/register', async (req, res) => {
    const newUser = new User({ ...req.body });
    // getting data from frontend 
    const { password : passwordString } = req.body;
    // encrypt out password to store in database
    password = await bcrypt.hash(passwordString, salt);
    newUser.password = password;
    newUser.save().then(() => {
        res.status(201).json({ 'status': '1', message: 'User Created Successfully', data: newUser });
    }).catch((error) => {
        res.status(500).json({ 'status': '0', message: 'Error Creating newUser', error: error.message });
    })
});

// To get all Users
router.get('/', (req, res) => {

    User.find().then((users) => {
        if (users.length !== 0) {
            res.json(users);
        } else {
            res.status(400).send('User not found');
        }
    })
})

// Delete User
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if (user) {
            res.json({ message: 'User deleted Successfully' });
        } else {
            res.status(400).send('User not found');
        }
    })
});

// Get User by id
router.get('/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(400).send('User not found');
        }
    })
});

// Update user by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true, // return updated document instead of original
            runValidators: true // schema validations are applied during update
        })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json({ message: 'User updated Successfully', data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating User', error: error.message });
    }
});

module.exports = router;