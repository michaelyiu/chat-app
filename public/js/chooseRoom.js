let socket = io();

socket.on('connect', function () {

    console.log('chooseRoomerino');
    
    socket.on('loadRooms', function(rooms) {
        console.log(rooms);
        let select = document.getElementById('room_select');
        rooms.forEach(function(room) {
            let option = document.createElement('option');
            option.setAttribute('value', `${room.room}`)
            option.innerHTML = room.room
            select.append(option);
        })
    })
});

console.log("hello?");
