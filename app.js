let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let start = document.querySelector(".start");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 5;
let intervalTime = 0;
let interval = 0;

document.addEventListener("DOMContentLoaded", function () {
    createBoard();
    start.addEventListener('click', startGame);
    document.body.addEventListener('keydown', keyDown);
    playAgain.addEventListener('click', replay);
});

//creates the tiles which append to and divide the gameBoard
function createBoard() {
    for (let i = 0; i < 400; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
};

//starts the snake array and the score
function startGame() {
    let squares = document.querySelectorAll(".grid div");
    //calls the function that selects a random square for the apple
    randomApple(squares);
    //starts moving the snake arra to the right
    direction = 1;
    scoreDisplay.innerHTML = score;

    //sets "spped" of snake moving around
    intervalTime = 1000 / speed;

    //location of snake
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
};

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("!!Collision Detected!! Game Over!!!");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
};

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
};

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
};

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;

        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
};

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
};

function keyDown(e) {
    if (e.keyCode === 39) {
        direction = 1; // right
    } else if (e.keyCode === 38) {
        direction = -width; //if we press the up arrow, the snake will go ten divs up
    } else if (e.keyCode === 37) {
        direction = -1; // left, the snake will go left one div
    } else if (e.keyCode === 40) {
        direction = +width; // down the snake head will instantly appear 10 divs below from the current div
    }
};

function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}