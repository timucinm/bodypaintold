var express = require('express');

var app = express();
var Server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("Hello");

var socket = require('socket.io');

var io = socket(Server);

io.sockets.on('connection', newConnection);

function newConnection (socket) {
    console.log('new connection: ' + socket.id);

    socket.on('button', buttonMsg);
    socket.on('mouse', mouseMsg);

    function buttonMsg(data) {
        socket.broadcast.emit('button', data);
        // sending data to everone including this client
        // io.sockets.emit('button', data);
        console.log(data);
    }

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}
