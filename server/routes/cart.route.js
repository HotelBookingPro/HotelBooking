// const cart = require("../controllers/cart.controller")
// const router = require("express").Router()

// router.post("/add", cart.addItemsToCart)
// router.get("/all", cart.getCart)
// router.delete("/emptyCart", cart.emptyCart);

// module.exports=router
const cart = require("../controllers/cart.controller")
const router = require("express").Router()

router.post("/add", cart.addItemsToCart)
router.get("/all", cart.getCart)
router.delete("/emptyCart", cart.emptyCart);

module.exports=router