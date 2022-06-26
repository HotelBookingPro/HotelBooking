const userModel   = require("../database/models/user.model");
const fs          = require("fs");
const path        = require("path");
const sendEmailMe = require("../helpers/sendEmail.helper");

class User {

    static addAdmin = async (req, res) => {
        try {
            const user    = new userModel(req.body);
            user.userType = "admin";
            await user.save();
            res.status(200).send({
                apiStatus: true,
                data:user,
                message:"Admin added successfuly"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error in register"
            })
        }
    }

    static register = async (req, res) => {
        try {
            const user = new userModel(req.body);
            user.userType="user";
            await user.save();
            sendEmailMe(user.email, "hello");
            res.status(200).send({
                apiStatus: true,
                data:user,
                message:"User added successfuly"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Error in register"
            })
        }

    }
    static login = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password);
            const token = await user.generateToken();
            res.status(200).send({
                apiStatus:true,
                data:{user, token},
                message:"Logged in successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Cannot log in"
            })

        }
    }
    static getAllUsers = async (req, res) => {
        try{
            const allUsers = await userModel.find();
            res.status(200).send({
                apiStatus:true,
                data:allUsers,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message
            })
        }
    }
    static getSingleUser = async (req, res) => {
        try{
            const userData = await userModel.findById(req.params.id)
            if(!userData){
                res.status(404).send({
                    apiStatus:false,
                    data:null,
                    message:"invalid user Id"
                })
            }
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"data fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message})
        }
    }
    static updateUser = async (req, res) => {
        try{
            const userData = await userModel.findByIdAndUpdate(
                req.user._id,
                req.body,
                {runValidators:true}
                )
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"data updated"
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, error: e, message:e.message})
        }
    }
    static changePassword = async(req,res) =>{
        try{
            const userData= req.user;
            userData.password = req.body.password;
            await userData.save()
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"Password updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message
            })
        }
    }
    static deleteUser = async (req, res) => {
        try{
            const userData = await userModel.findByIdAndDelete(req.user._id)
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"data deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message})
        }
    }
    static logout = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=> t.token != req.token);
            await req.user.save();
            res.status(200).send({
                apiStatus:true,
                message:"Logged out"
            })

        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message
            })
        }
    }
    static logoutAll = async(req,res)=>{
        try{
            req.user.tokens = [];
            await req.user.save();
            res.status(200).send({
                apiStatus:true,
                message:"Logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false, 
                error: e, 
                message:e.message})
        }        
    }
}
module.exports    = User;