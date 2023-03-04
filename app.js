const express = require('express');
const connectDb = require('./config/connection');
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json())
app.use(express.static('public'));
app.use(cookieParser())

app.set('view engine', 'ejs');

connectDb()

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.get("/set-cookies", (req, res) => {
    res.cookie("newUser", false)
    res.cookie("isEmployee", true, {maxAge : 1000 * 10, httpOnly : true})
    res.send("cookies set!")
})

module.exports = app