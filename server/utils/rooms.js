class Rooms {
    //addRoom conditions
    // - room gets add if user.length>0
    //removeRoom conditions
    // - room gets removed if users.length === 0
    //getRoom maybe
    // just get it

    //getRoomList
    constructor() {
        this.rooms = [];
    }

    addRoom(userList, room) {
        let newRoom = {userList, room}
        this.rooms.push(newRoom);
        return newRoom;
    }

    removeRoom(room) {
        let selectedRoom = this.getRoom(room);
        
        if (selectedRoom) {
            this.rooms = this.rooms.filter((currentRoom) => currentRoom.room !== room);
        }
        
        return selectedRoom;
    }

    getRoom(room) {
        return this.rooms.filter((currentRoom) => currentRoom.room === room);
    }

    getRoomList() {
        return this.rooms;
    }

}


module.exports = { Rooms }
