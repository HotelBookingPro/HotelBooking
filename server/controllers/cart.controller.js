// //const cartModel = require("../database/models/cart.model")
// const cartRep   = require("../helpers/cart.repository")
// const roomRep   = require("../helpers/room.repository")

// class Cart{
//     //add items
//     static addItemsToCart = async(req,res)=>{
//         const {
//             roomId
//         } = req.body;
//         console.log(roomId)
//         const quantity = Number.parseInt(req.body.quantity);
//         try{
//             const cart = await cartRep.cart()
//             console.log(cart)
//             const roomDetails = await roomRep.roomById(roomId)
//             if(!roomDetails) {
//                 return res.status(400).send({
//                     apiStatus:false,
//                     data:null,
//                     message: "Not Found "
//                 })
//             }
//             if(cart) {
//                 const index = cart.items.findIndex(item => item.roomId.id == roomId);
//                 if (index !== -1 && quantity <= 0) {
//                     cart.items.splice(index, 1);
//                     if (cart.items.length == 0) {
//                         cart.subTotal = 0;
//                     } else {
//                         cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//                     }
//                 }
//                 else if (index !== -1) {
//                     cart.items[index].quantity = cart.items[index].quantity + quantity;
//                     cart.items[index].total = cart.items[index].quantity * roomDetails.price;
//                     cart.items[index].price = roomDetails.price
//                     cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//                 }
//                 else if (quantity > 0) {
//                     cart.items.push({
//                         roomId: roomId,
//                         quantity: quantity,
//                         price: roomDetails.price,
//                         total: parseInt(roomDetails.price * quantity)
//                     })
//                     cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
//                 }
//                 else {
//                     return res.status(400).send({
//                         apiStatus:false,
//                         data:null,
//                         message:"Error in Request"
//                     })
//                 }
//                 const cartData = await cart.save();
//                 res.status(200).send({
//                     apiStatus: true,
//                     data:cartData,
//                     message:"Items Added Successfully"
//                 })    
//             }
//             else {
//                 const cartData = {
//                     items: [{
//                         roomId: roomId,
//                         quantity: quantity,
//                         total: parseInt(roomDetails.price * quantity),
//                         price: roomDetails.price
//                     }],
//                     subTotal: parseInt(roomDetails.price * quantity)
//                 }
//                 cart = await cartRep.addItem(cartData)
//                 res.send(cart);
//             }
//         }
//         catch(e){   
//             return res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"Error Adding Items to cart"
//             })
//         }
//     }
//     static getCart = async(req, res) => {
//         try {
//             const cartData = await cartRep.cart()
//             console.log(cartData)
//             if(!cartData) {
//                 return res.status(404).send({
//                     apiStatus:false,
//                     data:null,
//                     message: "Cart Not Found "
//                 })
//             }
//              res.status(200).send({
//                 apiStatus: true,
//                 data:cartData,
//                 message:"Cart Fetched Successfully"
//             }) 
//         } catch (e) {
//             return res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"Error Fetching Data"
//             })
//         }
//     }
//     static emptyCart = async (req, res) => {
//         try {
//             const cart = await cartRep.cart()
//             cart.items = []
//             cart.subTotal = 0
//             const cartData = await cart.save()
//             res.status(200).send({
//                 apiStatus: true,
//                 data:cartData,
//                 message:"Cart Empited Successfully"
//             }) 
//         } catch (e) {
//             res.status(500).send({
//                 apiStatus:false,
//                 data:e.message,
//                 message:"Error Empting Cart"
//             })
//         }
//     }
// }
// module.exports = Cart
const cartRepository = require('../helpers/cart.repository')
const roomRepository = require('../helpers/room.repository');
class Cart {
    static addItemsToCart = async (req, res) => {
        const {
            roomId
        } = req.body;
        const quantity = Number.parseInt(req.body.quantity);
        try {
            let cart = await cartRepository.cart();
            console.log(cart);
            let roomDetails = await roomRepository.productById(roomId);
                 if (!roomDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //--If Cart Exists ----
            if (cart) {
                //---- check if index exists ----
                const indexFound = cart.items.findIndex(item => item.roomId.id == roomId);
                //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * roomDetails.price;
                    cart.items[indexFound].price = roomDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                    cart.items.push({
                        roomId: roomId,
                        quantity: quantity,
                        price: roomDetails.price,
                        total: parseInt(roomDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----if quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                })
            }
            //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
            else {
                const cartData = {
                    items: [{
                        roomId: roomId,
                        quantity: quantity,
                        total: parseInt(roomDetails.price * quantity),
                        price: roomDetails.price
                    }],
                    subTotal: parseInt(roomDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
    static getCart = async (req, res) => {
        try {
            let cart = await cartRepository.cart()
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart Not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
            
static emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart Has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}
}

module.exports = Cart