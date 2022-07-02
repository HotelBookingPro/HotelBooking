const orderModel  = require("../database/models/order.model")
const hotelModel  = require("../database/models/hotel.model")
const roomModel   = require("../database/models/room.model")
const dateModel   = require("../database/models/date.model")
const orderHelper = require("../helpers/order.helper")
const userModel   = require("../database/models/user.model")
const {sendBookingEmail, sendCancelBookingEmail} = require("../helpers/sendEmail.helper")
class Order{

    static addOrder = async (req, res) => {
        const {hotelId, userId} = req.params
        let fromDate  = req.params.fromDate.toString()
        fromDate = fromDate.replace(/%2F/g, "/")
        fromDate = new Date(fromDate)
        let toDate = req.params.toDate.toString()
        toDate = toDate.replace(/$2F/g, "/")
        toDate   = new Date(toDate)
        const hotel = await hotelModel.findOne({hotelId: hotelId})
        const user = await userModel.findOne({userId: userId})
        console.log(hotel)
        const fromIndex =  await orderHelper.convertDayToIndex(fromDate)
        const toIndex   =  await orderHelper.convertDayToIndex(toDate)
        console.log(fromIndex, toIndex);
        try {
            const newOrder = new orderModel({
                userId,
                fromDate,
                toDate,
                hotelId
            })
            const reservedRooms = await  orderHelper.getReservedRoom(fromIndex, toIndex)
            const room = await roomModel.findOne({_id: {$nin: reservedRooms}, belongsTo: hotel._id})
            console.log(room._id)
            newOrder.roomName = room.name
            newOrder.cost     = (toIndex - fromIndex + 1) * room.price
            await newOrder.save()
            console.log(newOrder);
            await user.bookings.push(newOrder._id)
            await user.save()
            await hotel.bookings.push(newOrder._id)
            await hotel.save()
            const index = await dateModel.find({date: {"$gte": fromIndex, "$lte": toIndex}})
            await index.forEach((index) => {
                index.roomsOccupied.push(room._id)
                index.save()
            })
            sendBookingEmail(user.email, `You room has been booked in ${hotel.name} from ${newOrder.fromDate} to ${newOrder.toDate}.\n Room: ${newOrder.roomName}\nTotal cost: ₹${newOrder.cost}\n Thank you for choosing us!\n Regards,`)
            return res.status(200).send({
                apiStatus:true,
                data:newOrder,
                message:"Room is available"
            })       
        } catch (e) {
            return res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error Completing Your Order"
            }) 
        }
    }
    static getOrder = async(req, res) => {
        let bookings = await orderModel.find()
        if(bookings.length == 0) {
            return res.status(404).send({
                apiStatus:false,
                data:null,
                message:"No Orders Founds"
            }) 
        }else {
            return res.status(200).send({
                apiStatus:true,
                data:bookings,
                message:"Data Fetched Successfully"
            })  
        }
    }
    static cancelOrder = async(req, res) => {
        const {orderId} = req.params;
        const order = await orderModel.finfOne({orderId: orderId})
        if(order == null) {
            return res.status(404).send({
                apiStatus:false,
                data:null,
                message:"No Orders Found for this order ID"
            })

        }
        else {
            const user = await userModel.findOne({userId: order.userId})
            const hotel = await hotelModel.findOne({hotelId: order.hotelId})
            const room = await roomModel.findOne({hotelId: hotel._id, name: order.roomName})
            // remove order ID from hotel & user booking array
            await hotel.bookings.pull(order._id)
            await req.user.bookings.pull(order._id)
            await hotel.save();
            await req.user.save();
            //remove room id from date schema
            const index = await dateModel.find({date: {"$gte": orderHelper.convertDayToIndex(order.fromDate), "$lte": orderHelper.convertDayToIndex(order.toDate)}})
            await index.forEach((index) => {
                index.roomsOccupied.pull(room._id)
                index.save()
            })
            await sendCancelBookingEmail(user.email, `An order by ${user.name} has been cancelled. \n Order ID: ${order._id}\n Regards,`)
            await order.deleteOne({_id: order._id})
            return res.status(200).send({
                apiStatus:true,
                data:bookings,
                message:"Data Fetched Successfully"
            })  
        }
    }
    static getOrderById = async (req, res) => {
        const {orderId} = req.params
        const order = await orderModel.findOne({orderId: req.params.order_id})
        if(order == null) {
            return res.status(404).send({
                apiStatus:false,
                data:null,
                message:"No Orders Found for this order ID"
            }) 
        }
        else {
            return res.status(200).send({
                apiStatus:true,
                data:order,
                message:"Data Fetched Successfully"
            })    
        }
    }

}
module.exports = Order