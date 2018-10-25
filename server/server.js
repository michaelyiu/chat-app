const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
let rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('loadRooms', rooms.getRoomList());
    
    socket.on('join', (params, callback) => {
        console.log('list of params: ', params);
        
        let roomSelect = params.room_select;
        let roomInput = params.room_input;
        let room = roomInput || roomSelect;
        console.log(room);
        
        // let room =
        if(!isRealString(params.name) || !isRealString(room)) {
            return callback('Name and room name are required.')
        }
        
        if (isRealString(roomSelect) && isRealString(roomInput)) {
            return callback('Need to create or select a room!')
        }

        //throws user in the right room
        socket.join(room);

        //removes the user from any potential previous rooms to throw them in the new room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room)
        
        //check if room exists.....
        // if the room DOES NOT exist, we want to add a new room.
        // if the room DOES exist, we want to update room
        if(rooms.getRoom(room).length > 0){
            //then room not found, so add it!
            rooms.removeRoom(room);
        }
        else{
        }
        rooms.addRoom(users.getUserList(room), room);
        // console.log(rooms.getRoom(params.room));
        // console.log(rooms.getRoomList());
        

        io.to(room).emit('updateUserList', users.getUserList(room));
        io.to(room).emit('updateRoomList', rooms.getRoomList());
        

        //LHS is the normal way to emit messages in relativity to an individual
        //RHS if exists, is chaining the .to() method with emit to broadcast to specific rooms
        //io.emit -> io.to('Avengers').emit
        //socket.broadcast.emit -> socket.broadcast.to('Avengers').emit
        //socket.emit
        
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            //firs io.to() updates userList, second one prints a message saying user has left 
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
        console.log('User was disconnected');
    })
});

server.listen(port, () => {
    console.log(`Started listening on ${port}`);
    
})