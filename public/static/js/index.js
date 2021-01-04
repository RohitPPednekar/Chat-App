var socket = io.connect('http://localhost:3000');
    socket.on('receive', function (message) {
      console.log('received %s', message);
      document.querySelector('.received-message').innerText = message;
    });



    function send(input) {
      console.log(input.value)
      var value = input.value;
      console.log('Sending Client Message: %s to Server', value);
      socket.emit('messageChange', {message: value});
    }