const orderModel = require("../database/models/order.model")
class Order{
    //add order to user
    static add= async(req,res)=>{
        
        try{
            const orderData = new orderModel({
                ...req.body,
                userId: req.body.userId,
                
            })
            // res.send(roomData)
            await orderData.save()
            res.status(200).send({
                apiStatus:true,
                data:orderData,
                message:"added"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }
    static status= async(req,res)=>{

    }
    //user
    static orders = async(req,res)=>{
      
        
        // try{
            
        //   await orderModel.find().populate({path:"myOrder" , strictPopulate: false}).exec(function(err, data) {
        //     if (err)
        //       res.send(err);
      
        //     res.send(data);
        //   });
           
        // }
        // catch(e){
        //     res.status(500).send({err:e.message})
        // }
        
    }
    //room
    static roomOrder = async(req,res)=>{
        
        try{
          
          await orderModel.find().populate({path:"orderRoom" , strictPopulate: false}).exec(function(err, data) {
            if (err)
              res.send(err);
      
            res.send(data);
          });
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }
}
module.exports = Order