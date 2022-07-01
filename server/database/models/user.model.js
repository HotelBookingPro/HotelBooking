const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs=require("bcryptjs")
const userSchema = new mongoose.Schema({
  
    first_name:{
        type:String,
        required: true,
        trim:true
    }, 
    last_name:{
        type:String,
        required: true,
        trim:true
    },
    user_name:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    }, 
    password:{
        type:String,
       // required: true,
        trim:true,
        match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    }, 
    phone:{
        type:String,
       // required: true,
        trim:true
    }, 
    userType:{
        type:String,
        enum:["user", "admin"]
    },
    tokens: [
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
},
{
    timestamps:true
})

userSchema.virtual("myOrder", {
    ref:"Order",
    localField:"_id",
    foreignField:"userId"
})
userSchema.methods.toJSON= function(){
    const user = this.toObject()
    delete user.__v
    delete user.password
    // delete user.tokens
    return user
}
userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})
userSchema.statics.loginUser = async(email, pass)=>{
    const userData = await User.findOne({ email })
    if(!userData) throw new Error("Invalid Email or Password");
    const isValidPassword = await bcryptjs.compare(pass, userData.password)
    if(!isValidPassword) throw new Error("Invalid Email or Password")
    return userData
}
const jwt = require("jsonwebtoken")
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token : token})
    await user.save()
    return token
}

const User     = mongoose.model("User",userSchema)
module.exports = User