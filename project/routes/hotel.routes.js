const hotel = require("../controllers/hotel.controller")
//const {auth, adminAuth} = require("../middleware/auth.middleware")
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
const router = require("express").Router()
//router.post("/add",auth, post.add)
//router.get("/myPosts", auth, post.myPosts)
router.post("/add", hotel.addHotel)

router.get("/all", hotel.getAllHotels)

router.get("/all/:id",  hotel.getSingleHotel)
router.patch("/update/:id",  hotel.updateHotel)
router.delete("/delete/:id", hotel.deleteHotel)
router.patch('/profile', upload.single('profile'),hotel.uploadImage)


module.exports = router