let socket = io();

function scrollToBottom () {
    // Selectors
    let messages = document.getElementById('messages')
    let newMessage = messages.lastChild;

    // Heights
    let clientHeight = messages.clientHeight
    let scrollTop = messages.scrollTop
    let scrollHeight = messages.scrollHeight

    let newMessageHeight = newMessage.clientHeight;
    let lastMessageHeight = newMessage.previousSibling.clientHeight;

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('should scroll');
        messages.scrollTop = scrollHeight;
        
    }
}



socket.on('connect', function () {
    console.log('Connected to server');
    let params = getParams(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            //kick the user back to the front page (root page)
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
            
        }
    })    
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('updateUserList', function (users) {
    let ol = document.createElement('ol');

    users.forEach(function (user) {
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.append(li);
    })

    let userList = document.getElementById('users')
    userList.innerHTML = "";
    userList.append(ol);
    console.log('Users list', users);
    
})


socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.getElementById('message-template').innerHTML
    
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    let li = document.createElement('li');
    li.className = "message";
    li.innerHTML = html;
    document.getElementById('messages').append(li);

    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let template = document.getElementById('location-message-template').innerHTML;

    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    let li = document.createElement('li');
    li.className = "message"
    li.innerHTML = html;
    document.getElementById('messages').append(li);

    scrollToBottom();
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