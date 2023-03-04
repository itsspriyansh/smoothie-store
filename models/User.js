const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { default: isEmail } = require("validator/lib/isEmail")

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "please enter an email"],
        unique : true, 
        lowercase : true,
        validate : [isEmail, "please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "please enter a password"],
        minlength : [6, "password should be atleas 6 characters long"],
    },
})


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user", userSchema)
module.exports = User
