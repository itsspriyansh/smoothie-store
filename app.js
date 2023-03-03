const express = require('express');
const connectDb = require('./config/connection');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

connectDb()

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

module.exports = app