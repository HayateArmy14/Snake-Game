import { getInputDirection } from "./input.js";

export let SNAKE_SPEED = 5;
const easyOption = document.getElementById("option-1")
const mediumOption = document.getElementById("option-2")
const hardOption = document.getElementById("option-3")
const pauseButton = document.getElementById("pause")
const pauseResume = document.getElementById("menu-2")
let pauseCount = 0;
let easyCount = 0;
let mediumCount = 0;
let hardCount = 0;

pauseButton.addEventListener("click", function () {
    pauseCount = pauseCount + 1;
    if(pauseCount%2 === 0){
        document.getElementById("blink-text").style.display="none"
        document.getElementById("pause-menu").style.display="none"
        if(easyCount){
            SNAKE_SPEED = 4
        }else if(mediumCount){
            SNAKE_SPEED = 6
        }else if(hardCount){
            SNAKE_SPEED = 8
        }
    }else{
        SNAKE_SPEED = 0
        document.getElementById("blink-text").style.display="flex"
        document.getElementById("pause-menu").style.display="flex"
    }
    
})

pauseResume.addEventListener("click", function () {
    pauseCount = pauseCount + 1;
    if(pauseCount%2 === 0){
        document.getElementById("blink-text").style.display="none"
        document.getElementById("pause-menu").style.display="none"
        if(easyCount){
            SNAKE_SPEED = 4
        }else if(mediumCount){
            SNAKE_SPEED = 6
        }else if(hardCount){
            SNAKE_SPEED = 8
        }
    }else{
        SNAKE_SPEED = 0
        document.getElementById("blink-text").style.display="flex"
        document.getElementById("pause-menu").style.display="flex"
    }
})


easyOption.addEventListener("click", function() {
    SNAKE_SPEED = 4;
   document.getElementById("pause").style.display="flex"
   document.getElementById("starting-page").style.display="none"
   easyCount ++

    console.log("ok")
})

mediumOption.addEventListener("click", function() {
    document.getElementById("pause").style.display="flex"
    document.getElementById("starting-page").style.display="none"

    SNAKE_SPEED = 6;
    mediumCount ++
})
hardOption.addEventListener("click", function() {
    document.getElementById("pause").style.display="flex"
    document.getElementById("starting-page").style.display="none"

    SNAKE_SPEED = 8;
    hardCount ++
})


const snakeBody = [
    {x:11, y: 11},
]
let newSegments = 0;

export function update() {
    addSegments();
    const inputDirection  = getInputDirection()
    for(let i= snakeBody.length -2; i >= 0; i-- ) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x                  
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

export function expandSnake(amount) {
    newSegments += amount
}   

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i< newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0;
}