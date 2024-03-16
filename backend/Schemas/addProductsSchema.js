const mongoose = require('mongoose')

const userProductsSchema = new mongoose.Schema({
    productID : {
        type: Number,
        default: Date.now()
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
        default: Date.now()
    },
    userName : {
        type : String,
        required : true
    }
})

const userProduct = mongoose.model('userProduct', userProductsSchema)
module.exports = userProduct