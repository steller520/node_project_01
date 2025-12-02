require('dotenv').config();
const express = require('express');
const app = express();

const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cartRoutes = require('./routes/cart.routes');
// Define routes

// Middleware to parse JSON bodies
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// root route   
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

userRoutes(app);
productRoutes(app);
cartRoutes(app);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});