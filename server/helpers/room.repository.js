// const roomModel = require("../database/models/room.model")
// class roomData {
//     static roomById = async (id) => {
//         const room = await roomModel.findById(id)
//         return room
//     }
// }
// module.exports = roomData 
const Product = require("../database/models/room.model");
exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
}