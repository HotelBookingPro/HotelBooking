//global identifiers
require('../database/connect');
const express    = require('express');
const app        = express();
const path       = require('path');
const cors       = require("cors")
const imageDir   = path.join(__dirname, "../images");

app.use(express.json());
app.use(express.static(imageDir));
app.use(express.urlencoded({extended:true}));
app.use(cors());
//user
const userRoutes = require('../routes/user.route');
app.use('/user', userRoutes);
//room
const roomRoutes=require("../routes/room.route")
app.use("/room",roomRoutes)
//hotel
const hotelRoutes=require("../routes/hotel.route")
app.use("/hotel",hotelRoutes)
//cart
const cartRoutes=require("../routes/cart.route")
app.use("/cart",cartRoutes)
module.exports   = app