const mongoose = require('mongoose')

const order = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1: {
        type: String,
        require: true
    },
    shippingAddress2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})

order.set('toJSON', {
    virtuals: true
})

exports.Order = mongoose.model('Order', order)