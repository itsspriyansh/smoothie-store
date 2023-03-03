const express = require('express');
const connectDb = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static('public'));
app.set('view engine', 'ejs');

if (connectDb()) app.listen(PORT, () => console.log(`server listening on port number : ${PORT}`))

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));