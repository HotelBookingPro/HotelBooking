const hotelModel = require("../database/models/hotel.model")
const dateRepository = require("../helpers/date.repository")
const roomModel  = require("../database/models/room.model")
const dateModel  = require("../database/models/date.model")
class ReservedRoom {
    static convertDayToIndex = (date) => {
        let date1, date2;
        date1 = new Date("01/01/2022")
        date2 = new Date(date)
        const calTime = date2.getTime() - date1.getTime()
        console.log(calTime);
        const calDays = calTime/(1000 * 60 * 60 * 24)
        console.log(calDays);
        return calDays;
    }
    
    static getReservedRoom = async (fromIndex, toIndex) => {
        let reservedRooms = []
        //get all reservation not greater nor less than the given date
        const index = await dateModel.find({date: {"$gte": fromIndex, "$lte": toIndex}})
        await index.forEach((room) => {
            element.roomsOccupied.forEach((room) => {
                let flag = 0
                for(let i = 0; i < reservedRooms.length; i++) {
                    if(reservedRooms[i].equals(room)){
                        flag = 1;
                        break;
                    }
                }
                if(!flag){
                    return reservedRooms.push(room)
                }
            })
        })
    }
    static checkAvailableRoom = async(req, res) => {
       const {hotelId} = req.params
       let fromDate = req.params.fromDate.toString()
       fromDate = fromDate.replace(/%2F/g, "/")
       fromDate = new Date(fromDate)
       let toDate = req.params.toDate.toString()
       toDate = toDate.replace(/%2F/g, "/")
       toDate = new Date(toDate)
       const  hotel = await hotelModel.findOne({hotelId: hotelId})
       const fromIndex = dateRepository(fromDate)
       const toIndex   = dateRepository(toDate)
       console.log(fromIndex, toIndex);
       try {
        let reservedRooms = await getReservedRoom(fromIndex, toIndex)
        //filter the array to find if the room not in reserved room array
        const room = await roomModel.findOne({_id: {$nin: reservedRooms}, belongsTo: hotel._id})
        console.log(room);
        if(room == null) {
            return res.status(404).send({
                apiStatus: false,
                data:null,
                message:"No available rooms!"
            })  
        }
        else {
            return res.status(200).send({
                apiStatus:true,
                data:e.message,
                message:"Room is available"
            })
        }
       } catch (e) {
        return res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Error Reserving Room"
        })
       }
    }
}
module.exports = ReservedRoom