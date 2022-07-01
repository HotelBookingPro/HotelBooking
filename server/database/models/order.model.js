const mongoose = require("mongoose")
const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"room",
        required:true
    },
  
    date:{
        type:Date,
       // required:true
       
    }
},
{timeStamps:true})

orderSchema.methods.toJSON= function(){
    const order = this.toObject()
    return order
}
const order= mongoose.model("order", orderSchema)
module.exports = order