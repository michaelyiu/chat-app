let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    // let li = `<li>${message.from}: ${message.text}</li>`
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));
    document.getElementById('messages').append(li);
});


document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById('message-input').value
    }, function () {
        
    });

}, true);

// function formSubmit(e) {
//     e.preventDefault();
// } 