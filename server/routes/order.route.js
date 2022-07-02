const order = require("../controllers/order.controller")
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
//const {auth, adminAuth} = require("../middleware/auth.middleware")
const router = require("express").Router()
router.post("/add/:hotelId/:userId/:fromDate/:toDate", order.addOrder)
router.get("/singleOrders/:orderId", order.getOrderById)
router.get("/all", order.getOrder)
router.delete("/cancelOrder/:orderId", order.cancelOrder)
module.exports = router
