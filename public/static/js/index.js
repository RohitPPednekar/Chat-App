var socket = io.connect('http://localhost:3000');
var name;
var roomId;
    function createRoom() {
        var person = prompt("Please enter your name:")
        if (person == null || person == "" || person == undefined) {
            alert('Please enter name')
        } 
        if (person != null && person != "" && person != undefined) {
            name = person;
            socket.emit('createRoom', `${person}${generateGUID()}`);
            socket.on('roomWindow', function(roomDetails){
                console.log(roomDetails)
                roomId = roomDetails.id;
                document.getElementById('chat-number').innerHTML = roomDetails.id;
                document.getElementById('chat-Window-Id').style.display = 'block';
                document.getElementById('chat-Window').style.display = 'block';
            });
        }    
    }

    function sendMsgInRoom() {
        const msg = document.getElementById('chat-msg').value;
        if (msg == null || msg == "" || msg == undefined) {
            alert("Message connot be blank !")
        } 
        if (msg != null && msg != "" && msg != undefined) {
          socket.emit('chatMsg', {
                username: name,
                message: msg,
                roomname: roomId
            })
            document.getElementById('chat-msg').value = '';
        }    
    }

    //Displaying the message sent from user
    socket.on('chatDisplay', (data) => {debugger;
        document.getElementById('chat-messages-container').innerHTML += '<p><h4>' + data.username + ':</h4> ' + data.message + '</p>';
        document.querySelector('.container').scrollTop = document.querySelector('.container').scrollHeight

    })

    //Sending username if the user is typing
    document.getElementById('chat-msg').addEventListener('keypress', () => {
        socket.emit('typing', {username: name, roomname: roomId})
    })

    //Displaying if a user is typing
    socket.on('typing', (user) => {
        document.getElementById('typing').innerHTML = '<p>' + user + ' is typing...</p>';
    })

    function generateGUID() {
        return 'xxxxxxxx-4xxx-xxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    