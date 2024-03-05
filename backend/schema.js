const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    productID : {
        type: Number,
        required : true
    },
    productName : {
        type: String,
        required : true
    },
    prodSrc : {
        type: String,
        required : true
    },
    category : {
        type: String,
        required: true
    },
    catId : {
        type: Number,
        required: true
    }
})

const product = mongoose.model('product', productsSchema)
module.exports = product