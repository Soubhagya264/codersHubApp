const roomModel = require("../models/roomModel");

class RoomService{
    async create(payload){
       const {topic,roomType,ownerId}=payload;
       const room=await  roomModel.create({
        topic,
        roomType,
        ownerId,
        speakers: [ownerId],
       }
       )
       return room;
    }

    async getAllRooms(types){
        const rooms = await roomModel.find({ roomType: { $in: types } })
            .populate('speakers')
            
            .exec();
        return rooms;
    }

    async getRoom(roomId){
    
        const room=await  roomModel.findOne({_id:roomId});
        return room;
    }
}
module.exports = new RoomService();