const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: '540e7760-7a36-40b7-8c5e-291840508fd6',  
    name: "ChatApp",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 600000
    }
  }))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/views/index.html`);
})

http.listen(port, function() {
    var port = http.address().port
    console.log(`Your Chat-App server is listening at PORT :${port}`)
  });


io.sockets.on('connection', function (socket) {
    console.log('this is connected user')
    socket.on('createRoom', function(room) {
        console.log(room)
        socket.join(room);
    });
});

