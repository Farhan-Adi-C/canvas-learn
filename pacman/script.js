// primarry
let board;
let ctx;

let rowCount = 21;
let colCount = 19;
const tileSize = 32;

const boardWidth = colCount * tileSize;
const boardHight = rowCount * tileSize;


// setup image
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

let cery = new Image();
cery.src = 'cherry.png';


// X = wall, 0 = skip, P = pacman, " " = food
// b = blueGhost, p = pinkGhost, o = orangeGhost, r = redGhost;
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
];


// variable
let walls = new Set();
let foods = new Set();
let ghosts = new Set();
let pacman;

let score = 0;
let health = 3;
let gameOver = false;


const directions = ["U", "D", "R", "L"];



// function onload window
window.onload = function () {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHight;
    ctx = board.getContext('2d');
    loadImages();
    loadMap();

    for (let ghost of ghosts.values()){
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
    update();

    document.addEventListener('keyup', movePacman);

}


function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar == "X") { 
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if (tileMapChar == "b") { 
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "r") { 
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "p") { 
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "o") { 
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == "P") {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == " ") {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
}

function loadImages() {
    blueGhostImage = new Image();
    blueGhostImage.src = './assets/blueGhost.png';
    orangeGhostImage = new Image();
    orangeGhostImage.src = './assets/orangeGhost.png';
    pinkGhostImage = new Image();
    pinkGhostImage.src = './assets/pinkGhost.png';
    redGhostImage = new Image();
    redGhostImage.src = './assets/redGhost.png';
    pacmanDownImage = new Image();
    pacmanDownImage.src = './assets/pacmanDown.png';
    pacmanUpImage = new Image();
    pacmanUpImage.src = './assets/pacmanUp.png';
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = './assets/pacmanLeft.png';
    pacmanRightImage = new Image();
    pacmanRightImage.src = './assets/pacmanRight.png';
    wallImage = new Image();
    wallImage.src = './assets/wall.png';
}

function update() {
    if(gameOver){
        return;
    }
    move();
    draw();
    setTimeout(update, 1000 / 20)
}

function draw() {
    ctx.clearRect(0, 0, board.width, board.height);
    ctx.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);

    for (let ghost of ghosts.values()) {
        ctx.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    for (let wall of walls.values()) {
        ctx.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    for (let food of foods.values()) {
        ctx.rect(food.x, food.y, food.width, food.height);
        ctx.fill();
    }

    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    if(gameOver){
        ctx.fillText("Game Over: " + String(score, tileSize/2, tileSize/2))
    }else{
        ctx.fillText("x" + String(health) + " " + String(score), tileSize/2, tileSize/2)
    }
}

function move() {
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    for (let wall of walls.values() ) {
        if(collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }

    for (let ghost of ghosts.values()) { 
        if(collision(pacman, ghost)){
            health --;
            if(health == 0){
                gameOver = true;
                return;
            }
            resetPositions();
        }
        if(ghost.y == tileSize * 9 && ghost.direction != "U" && ghost.direction != "D") {
            ghost.updateDirection("U");
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        for(let wall of walls.values() ){
            if(collision(ghost, wall) || ghost.x <= 0 || ghost.x + ghost.width >= boardWidth){
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
            }
        }
    }

    let foodEaten = null;
    for ( let food of foods.values()){
        if (collision(pacman, food)){
            foodEaten = food;
            score+=10;
            break;
        }
    }
    foods.delete(foodEaten);

    if(foods.size == 0){
        resetPositions();
        loadMap();
    }
}

function movePacman(e) {
    if(gameOver){
        loadMap();
        resetPositions();
        health = 3;
        gameOver = false;
        score = 0;
        update()
    }
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        pacman.updateDirection("U");
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        pacman.updateDirection("D");
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        pacman.updateDirection("R");
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        pacman.updateDirection("L")
    }

    if(pacman.direction == "U") {
        pacman.image = pacmanUpImage;
    }
    else if(pacman.direction == "D") {
        pacman.image = pacmanDownImage;
    }
    else if(pacman.direction == "R") {
        pacman.image = pacmanRightImage;
    }
    else if(pacman.direction == "L") {
        pacman.image = pacmanLeftImage;
    }
}

function collision (a, b) {
    return a.x < b.x + b.width && // sisi kiri a dibagian kiri dari sisi kanan b
            a.x + a.width > b.x && // sisi kanan a di kanan sisi kiri b
            a.y < b.y + b.height && // sisi atas y di atas 
            a.y + a.height > b.y

}

function resetPositions(){
    pacman.reset();
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    for(let ghost of ghosts.values()){
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.startX = x;
        this.startY = y;

        this.velocityX = 0;
        this.velocityY = 0;
        this.direction = "R";
    }

  updateVelocity() {
        if (this.direction == "U") {
            this.velocityX = 0;
            this.velocityY = -tileSize / 4;
        }
        else if (this.direction == "D") {
            this.velocityX = 0;
            this.velocityY = tileSize / 4;
        }
        else if (this.direction == "R") {
            this.velocityX = tileSize / 4;
            this.velocityY = 0;
        }
        else if (this.direction == "L") {
            this.velocityX = -tileSize / 4;
            this.velocityY = 0;
        }
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        for (let wall of walls.values()){
            if(collision(this, wall)){
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }
  
}