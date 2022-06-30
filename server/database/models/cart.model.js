// const mongoose = require("mongoose")
// const validator = require("validator")
// const itemSchema = new mongoose.Schema({
//     roomId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "room",
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Quantity can not be less then 1.']
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     total: {
//         type: Number,
//         required: true,
//     }
// },
// {
//     timestamps:true
// })
// const cartSchema = new mongoose.Schema({
//     items: [itemSchema],
//     subTotal: {
//         default: 0,
//         type: Number
//     }
// }, {
//     timestamps: true
// })
// // cartSchema.virtual("myCart", {
// //     ref:"Item",
// //     localField:"_id",
// //     foreignField:"cartId"
// // })
// // cartSchema.methods.toJSON= function(){
// //     const cart = this.toObject()
// //     delete user.__v
// //     return cart
// // }

// const Cart = mongoose.model("cart",cartSchema)
// module.exports=Cart
const mongoose = require("mongoose")
const validator = require("validator")
const itemSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
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
// cartSchema.virtual("myCart", {
//     ref:"Item",
//     localField:"_id",
//     foreignField:"cartId"
// })
// cartSchema.methods.toJSON= function(){
//     const cart = this.toObject()
//     delete user.__v
//     return cart
// }

const Cart = mongoose.model("cart",cartSchema)
module.exports=Cart
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// let ItemSchema = new Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Quantity can not be less then 1.']
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     total: {
//         type: Number,
//         required: true,
//     }
// }, {
//     timestamps: true
// })
// const CartSchema = new Schema({
//     items: [ItemSchema],
//     subTotal: {
//         default: 0,
//         type: Number
//     }
// }, {
//     timestamps: true
// })
// module.exports = mongoose.model('cart', CartSchema);