import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition();//position on board, must be between 1 - 21
const EXPANSION_RATE = 5;//growth of snake from food

export function update(){
    if(onSnake(food)){
        console.warn("snake is on the food")
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }    
}

export function draw(gameBoard){
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

//provides new position for food by random, and not currently overlapping by the snake body
function getRandomFoodPosition(){
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}