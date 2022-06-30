const mongoose = require("mongoose")
const validator = require("validator")
const itemSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
        required: true
    }, 
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
},
{
    timestamps:true
})
const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("cart",cartSchema)
module.exports=Cart