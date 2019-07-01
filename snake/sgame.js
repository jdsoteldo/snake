//
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// let obstacle = {
//     x : Math.floor(Math.random()*17+1) * box,
//     y : Math.floor(Math.random()*15+3) * box
// }
// create the unit
const box = 32;

// load images

const background = new Image();
background.src = "images/background.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

// load audio files

let dead = new Audio();
dead.src = "audios/dead.mp3";
let eat = new Audio();
eat.src = "audios/eat.mp3";
let up = new Audio();
up.src = "audios/up.mp3";
let right = new Audio();
right.src = "audios/right.mp3";
let left = new Audio();
left.src = "audios/left.mp3";
let down = new Audio();
down.src = "audios/down.mp3";


// create the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){

    ctx.drawImage(background, 0, 0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "brown";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "brwon";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms
let game = setInterval(draw,120);
