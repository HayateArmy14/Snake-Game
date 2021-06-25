import { onSnake, expandSnake } from "./snake.js"
import {randomGridPosition} from "./grid.js"

let food = getRandomFoodPosition()
let EXPANSION_RATE = 1
let snakeScore = 0;

const easyOption = document.getElementById("option-1")
const mediumOption = document.getElementById("option-2")
const hardOption = document.getElementById("option-3")
const scoreDiv = document.getElementById("score-number")

easyOption.addEventListener("click", function() {
    EXPANSION_RATE=1
})

mediumOption.addEventListener("click", function() {
    EXPANSION_RATE=3
})
hardOption.addEventListener("click", function() {
    EXPANSION_RATE=6
})


export function update() {
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        snakeScore = snakeScore + 1;  
        scoreDiv.innerHTML = `${snakeScore}` 
    } 
}

export function draw(gameBoard) {
        const foodElement  = document.createElement("div")
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x                  
        foodElement.classList.add("food")
        gameBoard.appendChild(foodElement)
  
}

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
}