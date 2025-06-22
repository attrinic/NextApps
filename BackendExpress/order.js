const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID: {
        type: String,
        require: true
    },
    bookID: {
        type: String,
        require: true
    },
    initialDate: {
        type: String,
        require: true
    },
    deliveryDate: {
        type: String,
        require: true
    }
})

const order = mongoose.model('order', orderSchema);
module.exports = order;