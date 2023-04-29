const mongoose = require('mongoose')

const category = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }
})

category.virtual('id').get(function () {
    return this._id.toHexString()
})

category.set('toJSON', {
    virtuals: true
})

exports.Category = mongoose.model('Category', category)
