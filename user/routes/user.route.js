//Global identifiers
const multer    = require('multer');
const imgUpload = multer({dest: 'images/'});
const user      = require('../controllers/user.controller');
const router    = require('express').Router();
const { auth, adminAuth } = require("../middleware/auth.middleware")

//admin register
router.post('/addAdmin',user.addAdmin);
//user register
router.post('/register', user.register);
//user login
router.post("/login", user.login);
//Display all users
router.get("/all", user.getAllUsers);
//Display single user
router.get("/all/:id", user.getSingleUser)
//update user
router.patch("/update", user.updateUser)
//update password
router.patch("/updatePassword", user.changePassword)
//remove account
router.delete("/delete", user.deleteUser)
//add Address to user
module.exports=router