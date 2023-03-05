const authController = require("../controllers/authController")
const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/login", authMiddleware.isLoggedIn, authController.login_get)
router.get("/signup", authMiddleware.isLoggedIn, authController.signup_get)
router.get("/logout", authController.logout_get)

router.post("/login", authController.login_post)
router.post("/signup", authController.signup_post)

module.exports = router
