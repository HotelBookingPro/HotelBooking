const cartRep   = require('../helpers/cart.repository')
const roomRep   = require('../helpers/room.repository');

class Cart{
    //add items
    static addItemsToCart = async(req,res)=>{
        const {
            roomId
        } = req.body;
        console.log(roomId)
        const quantity = Number.parseInt(req.body.quantity);
        try{
            const cart = await cartRep.cart()
            console.log(cart)
            const roomDetails = await roomRep.roomById(roomId)
            if(!roomDetails) {
                return res.status(400).send({
                    apiStatus:false,
                    data:null,
                    message: "Not Found "
                })
            }
            if(cart) {
                const index = cart.items.findIndex(item => item.roomId.id == roomId);
                if (index !== -1 && quantity <= 0) {
                    cart.items.splice(index, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                else if (index !== -1) {
                    cart.items[index].quantity = cart.items[index].quantity + quantity;
                    cart.items[index].total = cart.items[index].quantity * roomDetails.price;
                    cart.items[index].price = roomDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                else if (quantity > 0) {
                    cart.items.push({
                        roomId: roomId,
                        quantity: quantity,
                        price: roomDetails.price,
                        total: parseInt(roomDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                else {
                    return res.status(400).send({
                        apiStatus:false,
                        data:null,
                        message:"Error in Request"
                    })
                }
                const cartData = await cart.save();
                res.status(200).send({
                    apiStatus: true,
                    data:cartData,
                    message:"Items Added Successfully"
                })    
            }
            //add cart if not exist
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
                cart = await cartRep.addItem(cartData)
                res.send(cart);
            }
        }
        catch(e){   
            return res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error Adding Items to cart"
            })
        }
    }
    static getCart = async(req, res) => {
        try {
            const cartData = await cartRep.cart()
            console.log(cartData)
            if(!cartData) {
                return res.status(404).send({
                    apiStatus:false,
                    data:null,
                    message: "Cart Not Found "
                })
            }
             res.status(200).send({
                apiStatus: true,
                data:cartData,
                message:"Cart Fetched Successfully"
            }) 
        } catch (e) {
            return res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error Fetching Data"
            })
        }
    }
    static emptyCart = async (req, res) => {
        try {
            const cart = await cartRep.cart()
            cart.items = []
            cart.subTotal = 0
            const cartData = await cart.save()
            res.status(200).send({
                apiStatus: true,
                data:cartData,
                message:"Cart Empited Successfully"
            }) 
        } catch (e) {
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error Empting Cart"
            })
        }
    }
}
module.exports = Cart