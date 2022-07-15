import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;//2 times per second
const snakeBody = [
    {x: 10, y: 11}
];//defining positions of the pieces of the snake, default start to center of the board

let newSegments = 0;

export function update(){
    addSegments();
    const inputDirection = getInputDirection();
    console.log("update snake...");
    //shifting entire snake except the head
    //moves current body piece to where the one ahead of it is, looping thru all except the head
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard){
    console.log("draw snake...");
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount){
    newSegments += amount;
}

export function onSnake(position={x:null, y:null}, {ignoreHead=false} = {}){
    console.log("checking if snake on food", position.x, position.y);
    return snakeBody.some((segment,index) => {
        if(ignoreHead && index === 0){
            console.log("returning early, checking if snake intersecting", segment, index)
            return false;
        }
        console.log("checking snake piece", segment.x, segment.y);
        return equalPosition(segment, position);
    })
}

export function getSnakeHead(){
    return snakeBody[0];
}

//check if head of snake is touching (overlapping) with the snake body
export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true});
}

function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments(){
    for(let i=0;i<newSegments;i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }

    newSegments = 0;
}
