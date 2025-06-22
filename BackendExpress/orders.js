const express = require("express");
require('./db/db');
const order = require('./order');

const app = express();
const port = 3002;
app.use(express.json());

// GET orders API
app.get('/orders', (req, res) => {
    order.find().then((orders) => {
        if (orders.length !== 0) {
            res.json(orders);
        } else {
            res.status(400).send('Orders was not found');
        }
    })
})

// Find orders By Id
app.get('/orders/:customerId', (req, res) => {
    order.find({"customerID": req.params.customerId}).then((orders) => {
        if (orders) {
            res.json(orders);
        } else {
            res.status(400).send('Order was not found');
        }
    })
});

// Create new order
app.post('/order', (req, res) => {
    const newOrder = new order({ ...req.body });
    newOrder.save().then(() => {
        res.send('New order was created Successfully');
    }).catch((err) => {
        res.send(err);
        res.status(500).send('Internal Server Error with order post');
    })
});

// Delete order
app.delete('/order/:id', (req, res) => {
    order.findOneAndDelete(req.params.id).then((customer) => {
        if (order) {
            res.json('Order deleted Successfully');
        } else {
            res.status(400).send('Order not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error with order delete');
    })
});

app.listen(port, () => {
    console.log(`Order Application is listening on port ${port}`)
})