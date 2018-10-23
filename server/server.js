const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey, whats goin on',
        createAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('create Message', message);
        
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});
server.listen(port, () => {
    console.log(`Started listening on ${port}`);
    
})