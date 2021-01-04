const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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
  });

