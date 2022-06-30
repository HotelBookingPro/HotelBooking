const roomModel = require("../database/models/room.model")
class roomData {
    static roomById = async (id) => {
        const room = await roomModel.findById(id)
        return room
    }
}
module.exports = roomData 