const express = require('express');
const connectDb = require('./config/connection');
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware")
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(express.static('public'));
app.use(cookieParser())

app.set('view engine', 'ejs');

connectDb()

app.get("*", authMiddleware.checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', authMiddleware.requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)

module.exports = app
