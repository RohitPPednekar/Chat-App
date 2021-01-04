var socket = io.connect('http://localhost:3000');


    function createRoom() {
        var person = prompt("Please enter your name:")
        if (person == null || person == "" || person == undefined) {
            alert('Please enter name')
        } 
        if (person != null && person != "" && person != undefined) {
            socket.emit('createRoom', `${person}${generateGUID()}`);
            socket.emit('messageChange', {message: value});
        }    
    }

    function generateGUID() {
        return 'xxxxxxxx-4xxx-xxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    