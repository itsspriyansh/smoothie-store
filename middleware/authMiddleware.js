const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect("/login")
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect("/login")
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}
