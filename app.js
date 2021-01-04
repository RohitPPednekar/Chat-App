var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/views/index.html`);
})


app.listen(port || process.env.PORT, ()=>{
    console.log(`You Chat-App server is running on port ${port}`);
}); 