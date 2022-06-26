//global identifiers
require('../database/connect');
const express    = require('express');
const app        = express();
const path       = require('path');
const userRoutes = require('../routes/user.route');
const imageDir   = path.join(__dirname, "../images");

app.use(express.json());
app.use(express.static(imageDir));
app.use(express.urlencoded({extended:true}));
app.use('/user', userRoutes);

module.exports   = app