const mongoose = require("mongoose")
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

const User = mongoose.model("user", userSchema)
module.exports = User
