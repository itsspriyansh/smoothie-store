const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

const handleError = (error) => {
    let errors = { email : "", password : "" }
    if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    if (error.code) {
        errors["email"] = "email already in use"
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, "NoOneCanHoldTheirBreathForever", {
        expiresIn : maxAge
    })
}


module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.signup_get = (req, res) => {
    res.render("signup")
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        res.status(200).json({ user : user._id})
    } catch (error) {
        res.status(400).json({ errors : error})
    }
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await User.create({ email, password })
        const token = createToken(result._id)
        res.cookie("jwt", token, { httpOnly : true, maxAge : maxAge * 1000 })
        res.status(201).json({ result : result._id})
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ errors })
    }
}
