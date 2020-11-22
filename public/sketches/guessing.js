var socket;

function setup() { 
  socket = io.connect();
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    console.log(data);
}
