const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }, 
    role: {
        type: String,
        default: "Basic",
        required: true
    }
});

export const User = mongoose.model('user', userSchema)