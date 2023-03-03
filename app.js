const express = require('express');
const connectDb = require('./config/connection');
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

connectDb()

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

module.exports = app