const Cart = require("./model");
const roomModel = require("../../../../project/database/models/room.model");

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.roomId",
        select: "name price total"
    });
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}
exports.roomById = async id => {
    const room = await roomModel.findById(id);
    return room;
}