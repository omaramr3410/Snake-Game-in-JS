import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, 
getSnakeHead, snakeIntersection} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

//main game loop 
function main(currentTime){

    if(gameOver){
        if(confirm('You lost. Press ok to restart the game.')){
            window.location = '/'
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    //return if not supposed to update the DOM
    if(secondsSinceLastRender < 1 / SNAKE_SPEED){
        return;
    }
    console.log("Render");
    lastRenderTime = currentTime;
    
    //overall game logic section
    update();
    //take what occurs in the update() function and update the DOM
    draw();

}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    //clear board and draw new snake
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    // return gameOver;
}