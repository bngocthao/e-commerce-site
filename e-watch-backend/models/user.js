const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
})

user.virtual('id').get(function () {
    return this._id.toHexString()
})

user.set('toJSON', {
    virtuals: true
})

exports.User = mongoose.model('User', user)
exports.UserSchema = user
