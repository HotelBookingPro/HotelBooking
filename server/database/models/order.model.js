const mongoose = require("mongoose")
const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    roomName:{
        type: String
    },
    hotelId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
        // required:true 
    },
  
    fromDate:{
        type:Date,
       // required:true
    },
    toDate:{
        type:Date,
       // required:true
    },
    cost:{
        type: Number,
        default: 0
    }
},
{timeStamps:true})

orderSchema.methods.toJSON= function(){
    const order = this.toObject()
    return order
}
const order= mongoose.model("order", orderSchema)
module.exports = order