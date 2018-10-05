
var canvas;
var ctx;
var snakeDots;
var inGame = true;

var leftDirect = false;
var rightDirect = true;
var upDirect = false;
var downDirect = false;

const DELAY = 120;
const canvasWidth = 600;
const canvasHeight = 600;
const moveSize = 10;
const leftKey = 37;
const rightKey = 39;
const upKey = 38;
const downKey = 40;

//creating an array of snake coordinates
var X = [];
var Y = [];

var boardArray = new Array(37,37);
var xCoor = 0;
var yCoor = 0;
var counter = 0;
for(var x = 0; x < 37; x++){
    yCoor = 0;
    for(var y = 0; y < 37; y++){
        boardArray[x][y] = counter;
        yCoor += 16;
        counter++;
    }
    xCoor += 16;
}

//apple coordinates
var gX, gY;
var cX, cY;
var head;
var headL,headR,headD,headU;
var tail;
var apple;
var cherry;

var score = 0;
var appleScore = 0, cherryScore = 0;
var t0,t1;

// window.onload = function(){
//     init();
// }
var init = function(){
     canvas = document.getElementById('canvas');
     ctx = canvas.getContext('2d');
    inGame = true;
    
     loadImg();
     createSnake();
     locateapple();
     locateCherry();
     updatePanel();
     t0 = performance.now();
     setTimeout("gameCycle()", DELAY);
    
}

var loadImg = function(){

    head = new Image();
    head.src = "img/head.png";
    

    tail = new Image();
    tail.src = "img/tail.png";

    apple = new Image();
    apple.src = "img/apple.png";

    cherry = new Image();
    cherry.src = "img/cherry.png";
}

var createSnake = function(){

    snakeDots = 3;

    X[0] = 50;
    Y[0] = 50;
    for(var i = 1; i < snakeDots; i++){
        X[i] = 50 - i*16;
        Y[i] = 58;
    }
}

var drawOnCanvas = function(){

    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    if(inGame){

        for(var i = 0; i < snakeDots; i++){
            if(i == 0){
                
                ctx.drawImage(head,X[i],Y[i]);
                
            }
            else{
                ctx.drawImage(tail,X[i],Y[i]);
            }
        }
        console.log(gX+" : "+gY);
        ctx.drawImage(apple,gX,gY);
        ctx.drawImage(cherry,cX,cY);
    }
    else{
        gameOver();
    }
}

var gameOver = function(){

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = "45px 'Hanalei Fill', cursive";
    
    ctx.fillText('Game over!!!', canvasWidth/2, canvasHeight/2);
}

var move = function(){

    for(var i = snakeDots; i >= 1; i--){
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

var locateapple = function(){

    var x = Math.floor(Math.random()*5.8);
    gX = x *100 +10;

    x = Math.floor(Math.random()*5.8);
    gY = x *100 +10;
}

var locateCherry = function(){

    var x = Math.floor(Math.random()*5.8);
    cX = x *100 +10;

    x = Math.floor(Math.random()*5.8);
    cY = x *100 +10;
}

var checkapple = function(){
    console.log("x: "+X[0]+" y: "+Y[0]+" gx: "+gX+ " gY: "+ gY);    
    if((X[0] == gX) && (Y[0] == gY)){
        console.log("Caught");
        snakeDots++;
        score++;
        appleScore++;
        locateapple();
    }
}

var checkCherry = function(){
       
    if((X[0] == cX) && (Y[0] == cY)){
        console.log("Caught");
        snakeDots+=2;
        score+=2;
        cherryScore++;
        locateCherry();
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

var updatePanel = function(){
    document.getElementById("generalScore").innerHTML = score;
    t1 = performance.now();
    document.getElementById("time").innerHTML = (t1 - t0)/1000 +" seconds";
    document.getElementById("applesScore").innerHTML = appleScore;
    document.getElementById("cherriessScore").innerHTML = cherryScore;
}

var gameCycle = function(){

    if(inGame){
        
        move();
        checkCollision();
        checkapple();
        checkCherry();
        drawOnCanvas();
        updatePanel();
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
        head = headR;

    }
    if(key == rightKey && !leftDirect){
        rightDirect = true;
        upDirect = false;
        downDirect = false;
        head = headL;
    }
    if(key == upKey && !downDirect){
        upDirect = true;
        leftDirect = false;
        rightDirect = false;
        head = headU;
    }
    if(key == downKey && !upDirect){
        downDirect = true;
        leftDirect = false;
        rightDirect = false;
        head = headD;
    }
}