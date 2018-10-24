const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.')
        }
        socket.join(params.room);

        //LHS is the normal way to emit messages in relativity to an individual
        //RHS if exists, is chaining the .to() method with emit to broadcast to specific rooms
        //io.emit -> io.to('Avengers').emit
        //socket.broadcast.emit -> socket.broadcast.to('Avengers').emit
        //socket.emit

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () => {
    console.log(`Started listening on ${port}`);
    
})