const room = require("../controllers/room.controller")
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
//const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()
router.post("/add", room.add)
router.get("/rooms", room.rooms)
// router.get("/myrooms", room.myrooms)

router.patch('/profile', upload.single('profile'),room.uploadImage)

module.exports = router