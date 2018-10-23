let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    

    socket.emit('createMessage', {
        from: 'chelsea@example.com',
        text: 'sup dude'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});