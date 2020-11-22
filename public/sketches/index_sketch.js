let drawX, guessX, buttonsY;
let bg;
let drawB, guessB;

var socket;
var data;
let posX, posY, stat;

function setup(){
    const canvas =  createCanvas(640,480);
    layout();
    data = 0;
    socket = io.connect('http://localhost:3000');
    socket.on('button', newDrawing);
}

function layout() {
    
    drawX = width / 4;
    guessX = width / 4 * 3;
    buttonsY = height / 2 + 20;

    bg = 0;

    drawB = false;
    guessB = false;

    background(0);

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    fill(bg);
    stroke(255,204,0);
    strokeWeight(5);
    rect(drawX, buttonsY, 200, 90);
    rect(guessX, buttonsY, 200, 90);

    noStroke();
    fill(255,204,0);
    textSize(40);
    text("choose your role", width / 2, height / 3);
    text("draw", drawX, buttonsY);
    text("guess", guessX, buttonsY);

    if (drawB) {
        fill(255,204,0);
        noStroke();
        rect(width / 2, height / 2, width, height);

        fill(0);
        textSize(50);
        text("draw", width / 2, height / 2);
    }

    if (guessB) {
        fill(255,204,0);
        noStroke();
        rect(width / 2, height / 2, width, height);

        fill(0);
        textSize(50);
        text("guess", width / 2, height / 2);
    }

    posX = mouseX;
    posY = mouseY;

}

function redirectToPaint() {
    window.location.href = "bodypaint.html";
    console.log("hi");
}

function redirectToGuess() {
    window.location.href = "guessing.html";
    console.log("hi");
}

function newDrawing(data) {
    if(data == 1) {
        console.log("guess");
        redirectToGuess();
    }
    
    if(data == 2) {
        console.log("draw");
        redirectToPaint();
    }

    console.log(data);
}

function mousePressed(){
    if(((mouseX > drawX - 100) && (mouseX < drawX + 100)) && 
        ((mouseY > buttonsY - 45) && (mouseY < buttonsY + 45))){
            console.log("draw");
            data = 1;
            socket.emit('button', data);
            redirectToPaint();
    }

    if(((mouseX > guessX - 100) && (mouseX < guessX + 100)) && 
        ((mouseY > buttonsY - 45) && (mouseY < buttonsY + 45))){
            console.log("guess");
            data = 2;
            socket.emit('button', data);
            redirectToGuess();
    }
}