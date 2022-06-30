const hotelModel = require("../database/models/hotel.model")
const fs = require("fs")
const path=require("path")
class hotel{
    static addHotel = async(req,res)=>{
        try{
            console.log("hello")
            const hotel = new hotelModel(req.body)
     
            await hotel.save()
        
            res.status(200).send({
                apiStatus: true,
                data:hotel,
                message:"hotel added successfuly"
            })
            
        }
        catch(e){   
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error in register"
            })
        }
    }
    static getAllHotels = async(req, res) => {
        try{
            const allHotels = await hotelModel.find()
            res.status(200).send({
                apiStatus:true,
                data:allHotels,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    //get single hotel
    static getSingleHotel = async(req, res) => {
        try{
            const hotelData = await hotelModel.findById(req.params.id)
            if(!hotelData){
                res.status(404).send({
                    apiStatus:false,
                    data:null,
                    message:"invalid hotel id"
                })
            }
            res.status(200).send({
                apiStatus:true,
                data:hotelData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static updateHotel= async(req,res)=>{
        try{
            const hotelData = await hotelModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {runValidators:true}
                )
            // req.body.for in=> req.user.key=req.body.key
            res.status(200).send({
                apiStatus:true,
                data:hotelData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static deleteHotel= async(req,res)=>{
        try{
            const hotelData = await hotelModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus:true,
                data:hotelData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static uploadImage=  async(req, res)=>{
        try{
            const ext = path.extname(req.file.originalname)
            const newName = "images/"+req.file.fieldname + Date.now()+ext
            fs.rename(req.file.path, newName, ()=>{})
            req.hotel.image = newName
            await req.user.save()
            res.send({data:req.hotel})
        }
        catch(e){
            res.send(e.message)
        }
      }
}
module.exports = hotel