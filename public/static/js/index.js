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

    function joinRoom() {
        var person = prompt("Please enter your name:")
        var roomid = prompt("Please enter your room id:")
        if (person == null || person == "" || person == undefined) {
            alert('Please enter name')
        } 
        if (roomid == null || roomid == "" || roomid == undefined) {
            alert('Please enter room id !')
        }
        if (person != null && person != "" && person != undefined && 
            roomid != null && roomid != "" && roomid != undefined) {
                name = person;
                roomId = roomid;
                document.getElementById('chat-number').innerHTML = roomId;
                document.getElementById('chat-Window-Id').style.display = 'block';
                document.getElementById('chat-Window').style.display = 'block';
                socket.emit('joinedRoom', {
                    username: person,
                    roomname: roomId
                })
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
            document.getElementById('typing').innerHTML = '';
        }    
    }

    socket.on('chatDisplay', (data) => {
        document.getElementById('chat-messages-container').innerHTML += `<p><h4>${data.username}:</h4>${data.message}</p>`;
        document.querySelector('.container').scrollTop = document.querySelector('.container').scrollHeight

    })

    document.getElementById('chat-msg').addEventListener('keypress', () => {
        socket.emit('typing', {username: name, roomname: roomId})
    })

    socket.on('typing', (user) => {
        document.getElementById('typing').innerHTML = `<p>${user} is typing...</p>`;
    })

    socket.on('newUser', (data)=>{
        const newJoinNotify = document.getElementById('chat-messages-container');
        if(data.username == name){
            newJoinNotify.innerHTML += '<p>You have joined in the Room</p>';
        } else{
            newJoinNotify.innerHTML += `<p>   ${data.username} has joined in the Room</p>`;
        }
    })

    function generateGUID() {
        return 'xxxxxxxx-4xxx-xxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    