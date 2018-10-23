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

    let messageTextbox = document.getElementById('message-input')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.value
    }, function () {
        messageTextbox.value = "";
    });
}, true);

let locationButton = document.getElementById('send-location');

locationButton.addEventListener('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.setAttribute('disabled', 'disabled')
    locationButton.innerHTML = "Sending location...";
    // locationButton.textContent('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttribute('disabled');
        locationButton.innerHTML = "Share Location";
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });      
    }, function () {
        locationButton.removeAttribute('disabled');
        alert('Unable to fetch location.');
    })
}); 