let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${message.from}: ${message.text}`));

    document.getElementById('messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank')

    a.appendChild(document.createTextNode('My current Location'));

    li.appendChild(document.createTextNode(`${message.from}: `));
    a.setAttribute('href', message.url);

    li.append(a);
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

let locationButton = document.getElementById('send-location');

locationButton.addEventListener('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });      
    }, function () {
        alert('Unable to fetch location.');
    })
}); 