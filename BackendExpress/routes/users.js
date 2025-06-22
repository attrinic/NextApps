const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// get url and secret 
const JWT_SECRET = process.env.JWT_TOKEN;
const salt = 10;

/**
 * Get user profile details
 */
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    res.json({ user: data });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// user login
router.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;
    
    const response = await verifyUserLogin(email, password, userType);
    //return res.json(response);
    if (response.status === 'ok') {
        // Store JWT token as a cookie in browser
        const token = response.data; 
        res.cookie('token', token, {
            maxAge: 1 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 Hour)
            httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
            sameSite: 'Lax'
        });  
    }

    return res.json(response);
});

/**
 * Verify User Login
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const verifyUserLogin = async (email, password, userType) => {
    try {
        // 1=> Admin Token, 0=> User Token
        let tokeType = 'customer'; 
        if (userType == '1') {
            tokeType = 'admin'
        }
        const user = await User.findOne({ email, userType: tokeType });
        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            
            token = jwt.sign({ id: user._id, username: user.email, type: tokeType }, JWT_SECRET); // jwt token
            return { status: 'ok', data: token, type: tokeType };
        }

        return { status: 'error', error: 'Invalid password, Please try again.'}
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'Connection timed out' }
    }
}

/**
 * Validate token and type
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
    const { token } = req.cookies; // getting token from cookies
    // console.log("Token received from cookies:", token);
    // if (verifyToken(token)) { // if token is there
    //     console.log("Token verified");
    // } else {
    //     console.log("Token not verified");
    // }
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
    } catch (error) {
        res.status(500).json({ message: 'Error Updating User', error: error.message });
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'You have logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error in User logout ', error: error.message });
    }
});

module.exports = router;