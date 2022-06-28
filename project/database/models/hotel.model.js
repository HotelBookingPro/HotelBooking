const mongoose = require("mongoose")
const hotelSchema = mongoose.Schema({
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    name:{
        type:String,
        required: true,
        trim:true
    },
    image:{
        type:String,
        trim:true
    },
    price:{
        type:Number
    },
    address:{
        type:String,
       // required:true,
        trim:true
    }
},
{timeStamps:true})
hotelSchema.virtual("rooms", {
    ref:"room",
    localField:"_id",
    foreignField:"hotelId"
})
hotelSchema.methods.toJSON= function(){
    const hotel = this.toObject()
  
    return hotel
}
const hotel= mongoose.model("hotel", hotelSchema)
module.exports = hotel