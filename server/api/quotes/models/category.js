const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
              return v !== undefined && v !== ""
            }
        }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category