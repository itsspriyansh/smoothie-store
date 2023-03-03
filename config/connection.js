const mongoose = require("mongoose")

const dbURI = 'mongodb://localhost:27017';

const connectDb = async () => {
    try {
        const result = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb
