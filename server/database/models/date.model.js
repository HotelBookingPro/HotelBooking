const mongoose = require("mongoose")
const dateSchema     = new mongoose.Schema({
    date:{
        type: Number
    },
    roomStatus:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room' 
        }
    ]
})

module.exports = mongoose.model("Date", dateSchema)