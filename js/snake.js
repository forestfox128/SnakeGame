
var canvas;
var ctx;
var snakeDots;
var inGame = true;

var leftDirect = true;
var rightDirect = false;
var upDirect = false;
var downDirect = false;

const DELAY = 120;
const canvasWidth = 400;
const canvasHeight = 400;
const moveSize = 10;
const leftKey = 37;
const rightKey = 39;
const upKey = 38;
const downKey = 40;

//creating an array of snake coordinates
var X = [];
var Y = [];

var head;
var tail;
var img;

window.onload = function(){
    init();
}
var init = function(){
     canvas = document.getElementById('canvas');
     ctx = canvas.getContext('2d');

     head = new Image();
     head.onload = function(){
        ctx.drawImage(head,0,0);
     }
    head.src = "img/head.png";

     loadImg();
     createSnake();
     setTimeout("gameCycle()", DELAY);
    
}



var loadImg = function(){

    head = new Image();
    head.src = "img/head.png";

     tail = new Image();
     tail.src = "img/tail.png";
}

var createSnake = function(){

    snakeDots = 3;

    for(var i = 0; i < snakeDots; i++){
        X[i] = 100 - i*10;
        Y[i] = 100;
    }
}

var drawOnCanvas = function(){

    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    console.log(inGame);
    if(inGame){

        for(var i = 0; i < snakeDots; i++){
            if(i == 0){
                
                ctx.drawImage(head,X[i],Y[i]);
            }
            else{
                ctx.drawImage(tail,X[i],Y[i]);
            }
        }
    }
    else{
        gameOver();
    }
}

var gameOver = function(){

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', canvasWidth/2, canvasHeight/2);
}

var move = function(){

    for(var i = snakeDots; i > 0; i--){
        X[i] = X[i-1];
        Y[i] = Y[i-1];
    }

    if(leftDirect){

        X[0] -= moveSize;
    }
    if(rightDirect){

        X[0] += moveSize;
    }
    if(upDirect){

        Y[0] -= moveSize;
    }
    if(downDirect){

        Y[0] += moveSize;
    }
}



var checkCollision = function() {

    for (var z = snakeDots; z > 0; z--) {

        if ((z > 4) && (X[0] == X[z]) && (Y[0] == Y[z])) {
            inGame = false;
        }
    }

    if (Y[0] >= canvasHeight) {
    
        inGame = false;
    }

    if (Y[0] < 0) {
    
       inGame = false;
    }

    if (X[0] >= canvasWidth) {
    
      inGame = false;
    }

    if (X[0] < 0) {
    
      inGame = false;
    }
};

var gameCycle = function(){

    if(inGame){
        
        move();
        checkCollision();
        drawOnCanvas();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e){

    console.log("key");
    var key = e.keyCode;
    console.log(key);

    if(key == leftKey && !rightDirect){
        leftDirect = true;
        upDirect = false;
        downDirect = false;
    }
    if(key == rightKey && !leftDirect){
        rightDirect = true;
        upDirect = false;
        downDirect = false;
    }
    if(key == upKey && !downDirect){
        upDirect = true;
        leftDirect = false;
        rightDirect = false;
    }
    if(key == downKey && !upDirect){
        downDirect = true;
        leftDirect = false;
        rightDirect = false;
    }
}