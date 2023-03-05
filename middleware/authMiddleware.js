const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, "NoOneCanHoldTheirBreathForever", (err, decodedToken) => {
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

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports = requireAuth
module.exports = isLoggedIn