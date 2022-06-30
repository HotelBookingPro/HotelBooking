const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
        required:true
    },
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    roomNo:{
        type:Number,
       // required:true,
        
    },
    bedNo:{
        type:Number,
       // required:true,
        
    },
    name:{
        type:String,
        required:true,
        
    },
    
    price:{
        type: Number,
        required: true
        
    },
    floorNo:{
        type:Number,
       // required:true,
        
    },  status:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        trim:true
    }
},
{timeStamps:true})
// roomSchema.virtual("cartRoom", {
//     ref:"cart",
//     localField:"_id",
//     foreignField:"roomId"
// })
// roomSchema.methods.toJSON= function(){
//     const room = this.toObject()
//     return room
// }
const room= mongoose.model("room", roomSchema)
module.exports = room