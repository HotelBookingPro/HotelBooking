const order = require("../controllers/order.controller")
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
//const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()
router.post("/add", order.add)
router.get("/orders", order.orders)
router.get("/orderroom", order.roomOrder)
module.exports = router


