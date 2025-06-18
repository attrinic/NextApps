const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
require('./db/db');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your front-end domain
    credentials: true,
}));

app.use(express.static('public'));
const port = process.env.PORT || 4300;
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`Communication Application is listening on port ${port}`)
})