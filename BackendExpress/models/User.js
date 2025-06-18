const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
