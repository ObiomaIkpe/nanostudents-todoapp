const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const User = new mongoose.model('User', userSchema)

module.exports = User