const boardSize = 40;
var DELAY = 200;
var leftDirect = null;
var rightDirect = null;
var upDirect = null;
var downDirect = null;
const leftKey = 37;
const rightKey = 39;
const upKey = 38;
const downKey = 40;

var inGame = true;

var X = 20;
var Y = 20;

var snake = {
    XCoordinates: [],
    YCoordinates: [],
    snakeHead: 'red',
    snakeColor: 'green',
    grow: false,
    X: 20,
    Y: 20,

    createNewModule: function(){
        if(this.XCoordinates.length < 1 || this.YCoordinates.length < 1){
            var startPoint = document.getElementById(String(this.X)+"|"+String(this.Y));
            startPoint.style.backgroundColor = this.snakeHead;
            this.XCoordinates.push(this.X);
            this.YCoordinates.push(this.Y);
        }
        else{
            this.grow = true;
        }
    },
    move: function(){
        this.XCoordinates = [this.X,...this.XCoordinates];
        this.YCoordinates = [this.Y,...this.YCoordinates];
        var tail = document.getElementById(String(this.XCoordinates[(this.XCoordinates.length-1)])+"|"+String(this.YCoordinates[(this.YCoordinates.length-1)]));
        tail.style.backgroundColor = '#000';

        if(!this.grow){
            this.XCoordinates.pop();
            this.YCoordinates.pop();    
        } 
        this.grow = false;
    },

    paint: function(){
        var head = document.getElementById(String(this.XCoordinates[0])+"|"+String(this.YCoordinates[0]));
        head.style.backgroundColor = this.snakeHead;
        if(this.XCoordinates.length > 1){
            for(var i = 1; i< this.XCoordinates.length; i++){
                var body = document.getElementById(String(this.XCoordinates[i])+"|"+String(this.YCoordinates[i]));
                body.style.backgroundColor = this.snakeColor;
            }
        }
    },

    moveLeft: function(){
        this.Y = this.Y-1;
        this.checkCollision();
        this.move();
        this.paint();
    },
    moveRight: function(){
        this.Y = this.Y+1;
        this.checkCollision();
        this.move();
        this.paint();
    },
    moveUp: function(){
        this.X = this.X-1;
        this.checkCollision();
        this.move();
        this.paint();
    },
    moveDown: function(){
        this.X = this.X+1;
        this.checkCollision();
        this.move();
        this.paint();
    },

    checkCollision: function(){
        if(this.X < 0 || this.X > boardSize - 1 || this.Y < 0 || this.Y > boardSize - 1){
            inGame = false;
            var table = document.getElementById('messagePlace');
            table.innerHTML = "GAME OVER";
        }
    }
};

var cherry = {

    X: [],
    Y: [],

    add: function(){
        var x = Math.floor(Math.random()*40);
        var y = Math.floor(Math.random()*40);
        this.X.push(x);
        this.Y.push(y);

        var cell = document.getElementById(String(x)+"|"+String(y));
        cell.setAttribute("class", "cherry");
    },

    eatenBySnake: function(){
        for(var i = 0; i < this.X.length; i++){
            if(snake.X == this.X[i] && snake.Y == this.Y[i]){
                snake.createNewModule();
                snake.createNewModule();
                var cell = document.getElementById(String(this.X[i])+"|"+String(this.Y[i]));
                cell.classList.remove("cherry");
                addNewFood();
                this.add();
            }
        }
    }
}

var bomb = {

    X: [],
    Y: [],

    add: function(){
        var x = Math.floor(Math.random()*40);
        var y = Math.floor(Math.random()*40);
        this.X.push(x);
        this.Y.push(y);

        var cell = document.getElementById(String(x)+"|"+String(y));
        cell.setAttribute("class", "bomb");
    },

    eatenBySnake: function(){
        for(var i = 0; i < this.X.length; i++){
            if(snake.X == this.X[i] && snake.Y == this.Y[i]){
                var cell = document.getElementById(String(this.X[i])+"|"+String(this.Y[i]));
                cell.classList.remove("bomb");
                DELAY = 300;
                medicine.add();
            }
        }
    }
}

var medicine = {

    X: [],
    Y: [],

    add: function(){
        var x = Math.floor(Math.random()*40);
        var y = Math.floor(Math.random()*40);
        this.X.push(x);
        this.Y.push(y);

        var cell = document.getElementById(String(x)+"|"+String(y));
        cell.setAttribute("class", "pills");
    },

    eatenBySnake: function(){
        for(var i = 0; i < this.X.length; i++){
            if(snake.X == this.X[i] && snake.Y == this.Y[i]){
                var cell = document.getElementById(String(this.X[i])+"|"+String(this.Y[i]));
                cell.classList.remove("pills");
                DELAY = 200;
            }
        }
    }
}

var apple = {

    X: [],
    Y: [],

    add: function(){
        var x = Math.floor(Math.random()*40);
        var y = Math.floor(Math.random()*40);
        this.X.push(x);
        this.Y.push(y);

        var cell = document.getElementById(String(x)+"|"+String(y));
        cell.setAttribute("class", "apple");
    },

    eatenBySnake: function(){
        for(var i = 0; i < this.X.length; i++){
            if(snake.X == this.X[i] && snake.Y == this.Y[i]){
                snake.createNewModule();
                var cell = document.getElementById(String(this.X[i])+"|"+String(this.Y[i]));
                cell.classList.remove("apple");
                addNewFood();
            }
        }
    }
}

var snakeFood = [cherry,apple,bomb,medicine];

window.onload = init;

function init(){

    createSnakeBoard();
    snake.createNewModule();
    cherry.add();
    bomb.add();
    gameCycle();
    
}

function createSnakeBoard(){

    var snakeTable = "<table id='table'><div id='messagePlace'></div>";
    for(var i = 0; i < boardSize; i++){
        snakeTable += "<tr>";
        for(var j = 0; j < boardSize; j++){
            var id = String(i) +"|"+ String(j);
            snakeTable += "<td id='"+id+"'></td>";
        }
        snakeTable += "</tr>";
    }
    snakeTable += "</table>";
    document.getElementById('snakeBoard').innerHTML = snakeTable; 
}

function gameCycle(){

   
    if(inGame){
        move();
        for(var i = 0; i < snakeFood.length; i++){
            snakeFood[i].eatenBySnake();
        }
        setTimeout("gameCycle()", DELAY);
    }
}

function addNewFood(){

    var foodIndex = Math.floor(Math.random()* snakeFood.length);
    console.log(foodIndex);
    snakeFood[foodIndex].add();
}

function move(){

    if(leftDirect){
        snake.moveLeft();
    }
    if(rightDirect){
        snake.moveRight();
    }
    if(upDirect){
        snake.moveUp();
    }
    if(downDirect){
        snake.moveDown();
    }
}

onkeydown = function(e){

    var key = e.keyCode;
    // console.log(key);
    if(key == leftKey){
        leftDirect = true;
        rightDirect = false;
        upDirect = false;
        downDirect = false;
    }
    if(key == rightKey){
        leftDirect = false;
        rightDirect = true;
        upDirect = false;
        downDirect = false;
    }
    if(key == upKey){
        leftDirect = false;
        rightDirect = false;
        upDirect = true;
        downDirect = false;
    }
    if(key == downKey){
        leftDirect = false;
        rightDirect = false;
        upDirect = false;
        downDirect = true;
    }
}