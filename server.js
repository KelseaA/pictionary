var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on("connection", function(socket){
	socket.on('guess', function(guess) {
		socket.emit("guess", guess);
		socket.broadcast.emit("guess", guess);
        console.log(guess);
    });
});

server.listen(8080);