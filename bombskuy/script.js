// welcome section
let welcomeContainer = document.getElementById("welcome");
let buttonPlay = document.getElementById("buttonPlay");
let buttonIntruction = document.getElementById("buttonIntruction");
let inputUsername = document.querySelector(".username");
let inputLevel = document.querySelector(".level");
let username;
let level;
let win = false;
let isStart = false;

// data dog
let dogs = [];
let dogCount;
let isDogMove = false;

// intruction section
let intructionContainer = document.getElementById("intruction");
intructionContainer.style.display = "none";
let buttonCloseIntruction = document.getElementById("closeIntruction");

// button intruction
buttonIntruction.addEventListener("click", () => {
    intructionContainer.style.display = "block";
})

// button close intruction
buttonCloseIntruction.addEventListener("click", () => {
    intructionContainer.style.display = "none";
})

// leaderboard section
let leaderboardSection = document.getElementById("leaderboard");
leaderboardSection.style.display = "none";
let buttonPlayAgain = document.getElementById("playagain")
let buttonReset = document.getElementById("reset")
let leaderboardlist = document.getElementById("leaderboardlist");
let tableLeaderboard = document.getElementById("tableLeaderboard")


// button play
buttonPlay.addEventListener("click", () => {
    if (!inputUsername.value || inputLevel.value == "selectLevel") {
        alert("isi username dan level terlebih dahulu")
    }

    else {
        welcomeContainer.style.display = "none";
        intructionContainer.style.display = "none";
        canvas.style.display = "inline-block";
        username = inputUsername.value;
        level = inputLevel.value;
        isStart = true;
        if (level == "easy") dogCount = 1;
        if (level == "medium") dogCount = 2;
        if (level == "hard") dogCount = 3;

        setInterval(() => {
            isDogMove = true;
        }, 2000);
        startGame();

        getTime();

    }

})


// canvas 
let canvas = document.getElementById("canvas");
let canvasWidth = 1000;
let canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "rgba(63, 63, 63, 1)";
canvas.style.display = "none";
canvas.style.position = "relative";
let animationId;

// block map
let blockSize = canvasHeight / 9;
let mapWidth = blockSize * 11;
let mapHeight = blockSize * 9;
let colBlock = 11;
let rowBlock = 9;



// data game
let detik = 0;
let timerInterval;
let time;
let heart = 3;
let gameOver = false;
let leaderboard = false;
let charExplotion = false;
let charDamage = false;
let wallCrackGet = 0;
let tntGet = 0;
let iceGet = 0;
let heartItemGet = 0;
let totalTntCount = 3;
let totalIceCount = 3;
let totalHeartItemCount = 1;
let tntItem = [];
let iceItem = [];
let heartItem = [];
let animationGameoverId;

let numberRandomItem = ["0", "1", "2"]
let randomDirection = ["R", "L", "U", "D"];


// comp game
let char;
let charSpeed = 3;
let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

let dog;
let walls = [];
let wallRandomCount = 10;
let explosions = [];
let stones = [];
let bombs = [];
let roads = [];
let maps = [
    "XXXXXXXXXXX",
    "XC        X",
    "X X X X X X",
    "X         X",
    "X X X X X X",
    "X         X",
    "X X X X X X",
    "X         X",
    "XXXXXXXXXXX",
];

// images
let backgroundImage;
let bombSkuyImage;
let heartImage;
let wallCrackImage;
let wallImage;
let tntImage;
let iceImage;
let charDownImage;
let charUpImage;
let charLeftImage;
let charRightImage;
let bombImage;
let explosionImage;
let heartItemImage;
let dogDownImage;
let dogUpImage;
let dogRightImage;
let dogLeftImage;

window.onload = () => {
    if (!localStorage.getItem("leaderboardData")) {
        localStorage.setItem("leaderboardData", JSON.stringify([]));
    }
    startGame();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

}

function startGame() {
    loadImages();
    if (gameOver && !isStart || win && !isStart) {

        gameOverSection();
    } else if (leaderboard) {
        leaderboardSection.style.display = "block";
        canvas.style.display = "none";
    } else if (isStart) {
        canvas.style.display = "inline-block";
        walls = [];
        stones = [];
        explosions = [];
        roads = [];
        bombs = [];
        tntItem = [];
        iceItem = [];
        heartItem = [];
        wallCrackGet = 0;
        time = "";
        tntGet = 0;
        iceGet = 0;
        heartItemGet = 0;
        heart = 3;
        detik = 0;
        time = "00:00:00";
        win = false;
        gameOver = false;
        isStart = false;
        dogs = [];
        loadGames();
        update();

    }
}

function gameOverSection() {
    animationGameoverId = requestAnimationFrame(gameOverSection);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "65px arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${win ? "You Win" : "Game Over"} `, 320, 150);
    ctx.font = "20px arial";
    ctx.fillText(`Good job ${username}! your time ${time} with results:`, 300, 200)


    ctx.drawImage(wallCrackImage, 250, 250, 50, 50);
    ctx.font = "40px arial";
    ctx.fillText(` = ${wallCrackGet}`, 310, 285);

    ctx.drawImage(tntImage, 440, 250, 50, 50);
    ctx.fillText(` = ${tntGet}`, 500, 285);

    ctx.drawImage(iceImage, 630, 250, 50, 50);
    ctx.fillText(` = ${iceGet}`, 690, 285);

    ctx.beginPath()
    ctx.fillStyle = "rgb(184, 86, 21)";
    ctx.roundRect(270, 370, 190, 40, 5);
    ctx.fill();


    ctx.beginPath()
    ctx.fillStyle = "rgba(46, 61, 197, 1)";
    ctx.roundRect(570, 370, 190, 40, 5);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "20px arial";
    ctx.fillText("Save Score", 310, 395);

    ctx.fillStyle = "white";
    ctx.font = "20px arial";
    ctx.fillText("Leaderboard", 610, 395);

    if (!gameOver) {
        cancelAnimationFrame(animationGameoverId)
        return;


    }

}


function update() {
    animationId = requestAnimationFrame(update);
    move();
    drawMap();

    if (keys.left) {
        char.udpateDirection("L");
    } else if (keys.right) {
        char.udpateDirection("R");
    } else if (keys.up) {
        char.udpateDirection("U");
    } else if (keys.down) {
        char.udpateDirection("D");
    } else {
        char.stop();
    }

    if (iceGet == totalIceCount && tntGet == totalTntCount && walls.length == 0) {
        clearInterval(timerInterval)
        win = true;
        gameOver = false;
        cancelAnimationFrame(animationId)
        startGame()
        return;
    }
    else if (heart <= 0) {
        clearInterval(timerInterval)
        win = false;
        cancelAnimationFrame(animationId)
        gameOver = true;
        startGame();
        return
    }

}

function loadImages() {
    backgroundImage = new Image();
    backgroundImage.src = "./images/background.jpg";
    bombSkuyImage = new Image();
    bombSkuyImage.src = "./images/logo_white.png";
    heartImage = new Image();
    heartImage.src = "./images/heart_indicator.png";
    wallCrackImage = new Image();
    wallCrackImage.src = "./images/wall_crack.png";
    wallImage = new Image();
    wallImage.src = "./images/wall.png";
    tntImage = new Image();
    tntImage.src = "./images/tnt.png";
    iceImage = new Image();
    iceImage.src = "./images/ice.png";
    charDownImage = new Image();
    charDownImage.src = "./images/char_down.png";
    charUpImage = new Image();
    charUpImage.src = "./images/char_up.png";
    charLeftImage = new Image();
    charLeftImage.src = "./images/char_left.png";
    charRightImage = new Image();
    charRightImage.src = "./images/char_right.png";
    bombImage = new Image();
    bombImage.src = "./images/bomb.png";
    explosionImage = new Image();
    explosionImage.src = "./images/duar.jpg";
    heartItemImage = new Image();
    heartItemImage.src = "./images/heart.png";
    dogUpImage = new Image();
    dogUpImage.src = "./images/dog_up.png";
    dogDownImage = new Image();
    dogDownImage.src = "./images/dog_down.png";
    dogRightImage = new Image();
    dogRightImage.src = "./images/dog_right.png";
    dogLeftImage = new Image();
    dogLeftImage.src = "./images/dog_left.png";

}

function loadGames() {

    for (let i = 0; i < rowBlock; i++) {
        for (let j = 0; j < colBlock; j++) {
            let row = maps[i];
            let mapBlock = row[j];

            let x = j * blockSize;
            let y = i * blockSize;
            if (mapBlock == "X") {
                stones.push(new Block("null", x, y, blockSize, blockSize))
            }
            if (mapBlock == "C") {
                char = new Block(charDownImage, x + 5, y + 5, blockSize - 10, blockSize - 10);
            }
            if (mapBlock == " ") {

                roads.push(new Block("null", x, y, blockSize, blockSize));
            }
        }

    }
    if (walls.length != wallRandomCount) {

    }
    for (let i = 0; i < 100; i++) {
        let random = Math.floor(Math.random() * (roads.length - 5) + 5);
        let wallAwal = roads[random];

        let cekwWall = walls.includes(wallAwal);
        if (!cekwWall) {
            walls.push(wallAwal)
        }

        // walls.push(wallRandom);
        if (walls.length == wallRandomCount) {
            break;
        }
    }

    for (let i = 0; i < 100; i++) {

        let random = Math.floor(Math.random() * (roads.length - 5) + 5);

        let dogAwal = roads[random];
        let checkWall = walls.includes(dogAwal);
        let checkDog = dogs.includes(dogAwal);
        if (!checkWall && !checkDog) {
            dogAwal.image = dogDownImage;
            dogs.push(dogAwal);
        }
        if (dogs.length == dogCount) {
            break;
        }
    }

}


function drawMap() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundImage, 0, 0, mapWidth, mapHeight);

    // ctx.globalAlpha = 0.5;

    for (let explosion of explosions) {
        let hitBox = {
            x: explosion.x + 5,
            y: explosion.y + 5,
            width: explosion.width - 10,
            height: explosion.height - 10
        }

        let hitBoxChar = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }

        if (collision(hitBoxChar, hitBox) && !charDamage) {
            heart--;
            charDamage = true;
            break;
        }
    }


    for (let i = walls.length - 1; i >= 0; i--) {
        let wall = walls[i];
        let wallDestroyed = false;

        for (let explosion of explosions) {
            let hitBox = {
                x: explosion.x + 5,
                y: explosion.y + 5,
                width: explosion.width - 10,
                height: explosion.height - 10
            }


            if (collision(wall, hitBox)) {
                wallDestroyed = true;
                break;
            }

        }

        if (wallDestroyed) {
            walls.splice(i, 1);

            for (let a = 0; a < 100; a++) {
                let numberRandom = Math.floor(Math.random() * 3 + 1);
                if (numberRandom == 1) {
                    if (tntItem.length + tntGet != totalTntCount) {

                        tntItem.push(new Block(tntImage, wall.x, wall.y, blockSize, blockSize));
                        break;
                    }
                }
                if (numberRandom == 2) {
                    if (iceItem.length + iceGet != totalIceCount) {

                        iceItem.push(new Block(iceImage, wall.x, wall.y, blockSize, blockSize));
                        break;
                    }
                }
                if (numberRandom == 3) {
                    if (heartItem.length != totalHeartItemCount) {

                        heartItem.push(new Block(heartItemImage, wall.x, wall.y, blockSize, blockSize));
                        break;
                    }
                }
            }


            wallCrackGet++;
            continue;
        }

        let hitBox = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }
        if (collision(hitBox, wall)) {
            char.y -= char.velocityY;
            char.x -= char.velocityX;
            char.stop();
        }

        for (let dog of dogs) {
            dog.dogCheckCollision(wall);
        }

        ctx.drawImage(wallImage, wall.x, wall.y, wall.width, wall.height);

    }

    for (let i = iceItem.length - 1; i >= 0; i--) {
        let ice = iceItem[i];
        let hitBox = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }
        if (collision(hitBox, ice)) {
            iceItem.splice(i, 1);
            iceGet++;
            continue;
        }
        ctx.drawImage(ice.image, ice.x, ice.y, ice.width, ice.height);
    }
    for (let i = tntItem.length - 1; i >= 0; i--) {
        let tnt = tntItem[i];
        let hitBox = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }
        if (collision(hitBox, tnt)) {
            tntItem.splice(i, 1);
            tntGet++;
            continue;
        }
        ctx.drawImage(tnt.image, tnt.x, tnt.y, tnt.width, tnt.height);
    }
    for (let i = heartItem.length - 1; i >= 0; i--) {
        let heartt = heartItem[i];
        let hitBox = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }
        if (collision(hitBox, heartt)) {
            heartItem.splice(i, 1);
            heart--;
            continue;
        }
        ctx.drawImage(heartt.image, heartt.x, heartt.y, heartt.width, heartt.height);
    }

    for (let i = 0; i < bombs.length; i++) {
        let bomb = bombs[i];
        ctx.drawImage(bomb.image, bomb.x, bomb.y, bomb.width, bomb.height)
        bomb.trsansisionSize();
    }

    for (let explosion of explosions) {
        ctx.drawImage(explosion.image, explosion.x, explosion.y, explosion.width, explosion.height);
    }


    for (let i = 0; i < stones.length; i++) {
        let stone = stones[i];
        for (let dog of dogs) {
            dog.dogCheckCollision(stone);
        }
    }

    for (let i = dogs.length - 1; i >= 0; i--) {
        let dog = dogs[i];
        if (isDogMove) {
            dog.x += dog.dogVelocityX;
            dog.y += dog.dogVelocityY;
        }

    let hitBox = {
            x: dog.x + 5,
            y: dog.y + 5,
            width: dog.width - 10,
            height: dog.height - 10
        }

        let hitBoxChar = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }

        if (collision(hitBoxChar, hitBox) && !charDamage) {
            heart--;
            charDamage = true;
            setTimeout(() => {
                charDamage = false;
            }, 3000);
            break;
        }

        

        ctx.drawImage(dog.image, dog.x, dog.y, dog.width, dog.height);
    }



    ctx.drawImage(bombSkuyImage, canvasWidth - (canvasWidth - 705) + 60, 30, 200, 30);
    ctx.fillStyle = "white";
    ctx.font = "22px arial";
    ctx.fillText(`Player   : ${username}`, canvasWidth - (canvasWidth - 705) + 60, 100);
    ctx.fillText(`Time     : ${time || "00:00:00"}`, canvasWidth - (canvasWidth - 705) + 60, 130);

    for (let i = 0; i < 3; i++) {
        if (heart <= i) {
            ctx.drawImage(heartImage, 72, 0, 36, 30, canvasWidth - (canvasWidth - 705) + 60 + (i * 40), 170, 36, 30);
        } else {

            ctx.drawImage(heartImage, 0, 0, 36, 30, canvasWidth - (canvasWidth - 705) + 60 + (i * 40), 170, 36, 30);
        }
    }

    ctx.drawImage(wallCrackImage, canvasWidth - (canvasWidth - 705) + 60, 230, 40, 40);
    ctx.font = "40px arial";
    ctx.fillText(`=  ${wallCrackGet}`, canvasWidth - (canvasWidth - 705) + 130, 260);

    ctx.drawImage(tntImage, canvasWidth - (canvasWidth - 705) + 60, 310, 40, 40);
    ctx.fillText(`=  ${tntGet}`, canvasWidth - (canvasWidth - 705) + 130, 340);


    ctx.drawImage(iceImage, canvasWidth - (canvasWidth - 705) + 60, 390, 40, 40);
    ctx.fillText(`=  ${iceGet}`, canvasWidth - (canvasWidth - 705) + 130, 420);

    if(charDamage) {
        if(Math.floor(Date.now() % 4) === 0 ){
            ctx.globalAlpha = 0.3;
        }
    }

    ctx.drawImage(char.image, char.x, char.y, char.width, char.height);
    ctx.globalAlpha = 1;
}


function move() {
    char.x += char.velocityX;
    char.y += char.velocityY;



    for (let i = 0; i < stones.length; i++) {
        let stone = stones[i];
        let hitBox = {
            x: char.x + 3,
            y: char.y + 3,
            width: char.width - 6,
            height: char.height - 6
        }
        if (collision(hitBox, stone)) {
            char.y -= char.velocityY;
            char.x -= char.velocityX;
            char.stop();
        }

        // for(let dog of dogs) {
        //     dog.dogCheckCollision(stone);
        // }
    }


}


class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.startX = x;
        this.startY = y;
        this.direction = "D";
        this.onLarge = false;
        this.dogVelocityX = 0;
        this.dogVelocityY = 2;
        this.charDogCollision = false;
    }

    udpateDirection(direction) {
        this.direction = direction;
        if (direction == "R") {
            this.image = charRightImage;
            this.velocityX = charSpeed;
            this.velocityY = 0;
        }
        if (direction == "L") {
            this.image = charLeftImage
            this.velocityX = -charSpeed;
            this.velocityY = 0;
        }
        if (direction == "U") {
            this.image = charUpImage
            this.velocityX = 0;
            this.velocityY = -charSpeed;
        }
        if (direction == "D") {
            this.image = charDownImage;
            this.velocityX = 0;
            this.velocityY = charSpeed;
        }

    }

    stop() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

    trsansisionSize() {
        if (this.width == blockSize) {
            this.onLarge = false;
        }

        if (this.width == blockSize - 10) {
            this.onLarge = true;
        }

        if (this.onLarge) {
            this.width += .5;
            this.height += .5;
            this.x -= .25;
            this.y -= .25;
        }

        if (!this.onLarge) {
            this.width -= .5;
            this.height -= .5;
            this.x += .25;
            this.y += .25;
        }


    }

    dogCheckCollision(object) {
        let hitBox = {
            x: this.x + 1,
            y: this.y + 1,
            width: this.width - 2,
            height: this.height - 2
        }
        if (collision(hitBox, object)) {
            this.x -= this.dogVelocityX;
            this.y -= this.dogVelocityY;

            this.x = Math.round(this.x);
        this.y = Math.round(this.y);
            this.updateDirectionDog();
        }
    }

    updateDirectionDog() {
        let randomNumber = Math.floor(Math.random() * 4);
        let direction = randomDirection[randomNumber];
        if (direction == "R") {
            this.image = dogRightImage;
            this.dogVelocityX = 2;
            this.dogVelocityY = 0;
        }
        if (direction == "L") {
            this.image = dogLeftImage;
            this.dogVelocityX = -2;
            this.dogVelocityY = 0;
        }
        if (direction == "U") {
            this.image = dogUpImage;
            this.dogVelocityX = 0;
            this.dogVelocityY = -2;
        }
        if (direction == "D") {
            this.image = dogDownImage;
            this.dogVelocityX = 0
            this.dogVelocityY = 2;
        }
    }

    
}



function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y

}


function handleKeyDown(e) {
    if (e.code == "KeyB") {

        console.log(tntItem);
        console.log(iceItem);
        console.log(heartItem);
    }
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
        keys.left = true;
        keys.down = false;
        keys.right = false;
        keys.up = false;
    }
    if (e.code == "KeyD" || e.code == "ArrowRight") {
        keys.right = true
        keys.left = false;
        keys.up = false;
        keys.down = false;
    }
    if (e.code == "KeyW" || e.code == "ArrowUp") {
        keys.up = true;
        keys.down = false;
        keys.right = false;
        keys.left = false;
    }
    if (e.code == "KeyS" || e.code == "ArrowDown") {
        keys.down = true;
        keys.up = false;
        keys.right = false;
        keys.left = false;
    }

    if (e.code == "Space") {
        if (bombs.length == 0) {
            let bombKoordinat = snapToGrid(char.x, char.y);
            bombs.push(new Block(bombImage, bombKoordinat.x, bombKoordinat.y, blockSize, blockSize));

            setTimeout(() => {
                bombs = [];
                let explosionUp = new Block(explosionImage, bombKoordinat.x, bombKoordinat.y + blockSize * -1, blockSize, blockSize);
                let explosionDown = new Block(explosionImage, bombKoordinat.x, bombKoordinat.y + blockSize * 1, blockSize, blockSize);
                let explosionRight = new Block(explosionImage, bombKoordinat.x + blockSize * 1, bombKoordinat.y, blockSize, blockSize);
                let explosionLeft = new Block(explosionImage, bombKoordinat.x + blockSize * -1, bombKoordinat.y, blockSize, blockSize);
                let explosionCenter = new Block(explosionImage, bombKoordinat.x, bombKoordinat.y, blockSize, blockSize);
                let potentialExplosion = [explosionUp, explosionDown, explosionRight, explosionLeft, explosionCenter];

                potentialExplosion.forEach(exp => {

                    let hitBox = {
                        x: exp.x + 5,
                        y: exp.y + 5,
                        width: exp.width - 10,
                        height: exp.height - 10
                    }
                    let checkStone = stones.some(stone => collision(hitBox, stone));
                    // let checkWall = walls.some(wall => collision(wall, hitBox));

                    if (!checkStone) {
                        explosions.push(exp);
                    }

                })

                setTimeout(() => {
                    explosions = [];
                  
                }, 500);

                setTimeout(() => {
                      charDamage = false;
                }, 3000);


            }, 5000);
        }
    }
}

function handleKeyUp(e) {
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
        keys.left = false;
    }
    if (e.code == "KeyD" || e.code == "ArrowRight") {
        keys.right = false;
    }
    if (e.code == "KeyW" || e.code == "ArrowUp") {
        keys.up = false;
    }
    if (e.code == "KeyS" || e.code == "ArrowDown") {
        keys.down = false;
    }

}

function snapToGrid(x, y) {
    let col = Math.round(x / blockSize);
    let row = Math.round(y / blockSize);

    return {
        x: col * blockSize,
        y: row * blockSize
    }
}



function getTime() {
    timerInterval = setInterval(() => {
        detik++;
        let h = Math.floor(detik / 3600);
        let m = Math.floor((detik % 3600) / 60);
        let s = detik % 60;

        let formatWaktu = String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0");
        time = formatWaktu;

    }, 1000)
}


function isClicked(mouseX, mouseY, btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.width &&
        mouseY >= btn.y && mouseY <= btn.y + btn.height;
}

canvas.addEventListener("click", (e) => {
    if (gameOver || win) {
        let rect = canvas.getBoundingClientRect();

        let btnSaveScore = { x: 270, y: 370, width: 190, height: 40 };
        let btnLeaderboard = { x: 570, y: 370, width: 190, height: 40 };

        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;

        if (isClicked(mouseX, mouseY, btnSaveScore)) {
            saveScore()
        }

        if (isClicked(mouseX, mouseY, btnLeaderboard)) {
            tampilLeaderboard();
        }
    }
})

function saveScore() {
    let listData = JSON.parse(localStorage.getItem("leaderboardData")) || [];

    let data = {
        username: username,
        time: time,
        totalWall: wallCrackGet,
        totalTnt: tntGet,
        totalIce: iceGet
    }

    listData.push(data);
    localStorage.setItem("leaderboardData", JSON.stringify(listData));
    alert("berhasil menyimpan Score ke leaderboard!");
    tampilLeaderboard()

}

function tampilLeaderboard() {
    canvas.style.display = "none";
    leaderboardSection.style.display = "block";
    let dataLeaderboard = JSON.parse(localStorage.getItem("leaderboardData")) ?? [];
    tableLeaderboard.innerHTML = ` <tr>
                <td>Player Name</td>
                <td>Time</td>
                <td><img src="./images/wall_crack.png" alt="" width="35"></td>
                <td><img src="./images/tnt.png" alt=""></td>
                <td><img src="./images/ice.png" alt=""></td>
            </tr>`;
    dataLeaderboard.forEach((user) => {
        tableLeaderboard.innerHTML += `
        <tr>
            <td>${user.username}</td>
            <td>${user.time}</td>
            <td>${user.totalWall}</td>
            <td>${user.totalTnt}</td>
            <td>${user.totalIce}</td>
        </tr>
        `
    })


}

buttonPlayAgain.addEventListener("click", () => {
    leaderboardSection.style.display = "none";
    canvas.style.display = "none";
    welcomeContainer.style.display = "block";
    gameOver = false;
    win = false;

    // isStart = true;
    cancelAnimationFrame(animationGameoverId);
    // startGame();

})

buttonReset.addEventListener("click", () => {
    localStorage.setItem("leaderboardData", JSON.stringify([]));
    tableLeaderboard.innerHTML = ` <tr>
                <td>Player Name</td>
                <td>Time</td>
                <td><img src="./images/wall_crack.png" alt="" width="35"></td>
                <td><img src="./images/tnt.png" alt=""></td>
                <td><img src="./images/ice.png" alt=""></td>
            </tr>`;
    alert("berhasil reset data leaderboard")

})

function dogSearchChar() {
    for (let dog of dogs) {

    }
}

