const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/views/index.html`);
})


io.sockets.on('connection', function (socket) {
 
  });


app.listen(port || process.env.PORT, ()=>{
    console.log(`You Chat-App server is running on port ${port}`);
}); 