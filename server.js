var express = require('express');
var app = express();
var router = express.Router();

var path = require('path');

app.use(express.static('/src')); 
console.log(__dirname);
app.use('/', router);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index2.html');
});
app.listen(3000, function () {
console.log('Listening on port 3000!');
});



