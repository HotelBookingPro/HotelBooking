const roomModel = require("../database/models/room.model")
const fs = require("fs")
const path=require("path")
class room{
    //add room to hotel
    static add= async(req,res)=>{
        
        try{
            const roomData = new roomModel({
                ...req.body,
                hotelId: req.body.hotelId,
                // userId: req.user.userId
            })
            // res.send(roomData)
            await roomData.save()
            res.status(200).send({
                apiStatus:true,
                data:roomData,
                message:"added"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }
    // user & Room
    // static myrooms = async(req,res)=>{
    
    //     try{
    //        // await roomModel.find({userId:req.user._id})
    //         await req.user.populate("myrooms")
    //         res.status(200).send({data:req.user.myrooms})
    //     }
    //     catch(e){
    //         res.status(500).send({err:e.message})
    //     }
    // }
    //hotel & Room
    static rooms = async(req,res)=>{
        
        try{
            // roomModel.find({hotelId:req.hotel._id})
           // await req.hotel.populate("rooms")
          await roomModel.find().populate({path:"myRooms" , strictPopulate: false}).exec(function(err, data) {
            if (err)
              res.send(err);
      
            res.send(data);
          });
            
            // res.status(200).send({data:req.hotel.myRooms})
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }
    static uploadImage=  async(req, res)=>{
        try{
            const ext = path.extname(req.file.originalname)
            const newName = "images/"+req.file.fieldname + Date.now()+ext
            fs.rename(req.file.path, newName, ()=>{})
            req.room.image = newName
            await req.room.save()
            res.send({data:req.room})
        }
        catch(e){
            res.send(e.message)
        }
      }
}
module.exports = room