// const cartModel = require("../database/models/cart.model");
// class Data  {
//     static cart = async () => {
//         const carts = await cartModel.find().populate({
//             path: "items.roomId",
//             select: "name price total"
//         });
//         return carts[0];
//         console.log(carts)
//     }
//     static addItem = async(item) => {
//         const newItem = await cartModel.create(item)
//         return newItem;
//     }
// }
// module.exports = Data
// const cartModel = require("../database/models/cart.model");
const Cart = require("../database/models/cart.model");
class Data {
    static cart = async () => {
        const carts = await Cart.find().populate({
            path: "items.roomId",
            select: "name price total"
        });
        return carts[0];
    };
    static addItem = async item => {
        const newItem = await Cart.create(item);
        return newItem
    }
    
}
module.exports = Data