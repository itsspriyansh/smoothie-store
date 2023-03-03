const User = require("../models/User")

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

module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.signup_get = (req, res) => {
    res.render("signup")
}

module.exports.login_post = (req, res) => {
    res.send("user login")
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await User.create({ email, password })
        res.status(201).json(result)
    } catch (error) {
        const err = handleError(error)
        res.status(400).json(err)
    }
}
