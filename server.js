// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController);

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Express is running on:", PORT);
});