let canvasWidth = 900;
let canvasHeight = 500;
let canvas;
let ctx;

let animationId;

let dinoImg;
let dinoFrameImg = ["dino-run1.png", "dino-run2.png", "dino-duck1.png", "dino-duck2.png"];

let dinoJumpImg;
let dinoDeadImg;
let random2 = 0;
let random6 = 0;

let cactus;
let cactusImg = [];
let trackImg;

let dinoWidth = 70;
let dinoHeight = 70;
let dinoY = canvasHeight - dinoHeight - dinoHeight / 2 - 5;
let dino = {
    x: dinoWidth,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}
let velocityY = 0;
let gravity = .8;
let duck = false;
let frame = 0;
let frameSpeed = 6;

let speedLevel = 10;
let trackArray = [
    { x: 0, y: canvasHeight - dinoHeight, width: canvasWidth * 2, height: 15 },
    { x: canvasWidth * 2, y: canvasHeight - dinoHeight, width: canvasWidth * 2, height: 15 }
]

let cactusObj = [
    {
        x: canvasWidth,
        y: dinoY,
        width: 34,
        height: 70,
        image: "cactus1.png"
    },
    {
        x: canvasWidth,
        y: dinoY,
        width: 69,
        height: 70,
        image: "cactus2.png"
    },
    {
        x: canvasWidth,
        y: dinoY,
        width: 102,
        height: 70,
        image: "cactus3.png"
    },
    {
        x: canvasWidth,
        y: dinoY - 20,
        width: 50,
        height: 90,
        image: "big-cactus1.png"
    },
    {
        x: canvasWidth,
        y: dinoY - 20,
        width: 103,
        height: 90,
        image: "big-cactus2.png"
    },
    {
        x: canvasWidth,
        y: dinoY - 20,
        width: 100,
        height: 90,
        image: "big-cactus3.png"
    },
];
let obstacles = [];

let score = 0;
let intervalLevel = 1800;
let gameOverImg;
let gameOver = false;


window.onload = () => {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    loadImages();

    setInterval(() => {
        
        random6 = Math.floor(Math.random() * 6)
        obstacles.push({ ...cactusObj[random6], image: cactusImg[random6] });
    }, intervalLevel);

    setInterval(() => {
        score+= 10;
    }, 300);

    update();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
}

function loadImages() {
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";

    dinoJumpImg = new Image();
    dinoJumpImg.src = "./img/dino-jump.png";

    dinoDeadImg = new Image();
    dinoDeadImg.src = "./img/dino-dead.png";




    trackImg = new Image();
    trackImg.src = "./img/track.png";

    for (let obj of cactusObj) {
        let img = new Image();
        img.src = `./img/${obj.image}`;

        cactusImg.push(img)
    }

    gameOverImg = new Image();
    gameOverImg.src = "./img/game-over.png";


}

function update() {
    animationId = requestAnimationFrame(update);

    frame++;
    if (frame % frameSpeed === 0) {
        random2 = (random2 === 0) ? 1 : 0;
    }
    let frameIndex = duck ? random2 + 2 : random2;
    dinoImg.src = `./img/${dinoFrameImg[frameIndex]}`



    draw();

}

function draw() {
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = "20px arial";
    ctx.fillStyle = "white";
    ctx.fillText(String(score).padStart(6, "0"), 10, 20);

    dino.y += velocityY;
    if (dino.y >= dinoY) {
        velocityY = 0;
        dino.y = dinoY;
        if (duck) {
            dino.y += 20;
            dino.height = 50;
        } else {
            dino.height = 70
        }
        ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    else if (dino.y < dinoY) {
        ctx.drawImage(dinoJumpImg, dino.x, dino.y, dino.width, dino.height);
        velocityY += gravity;
    }

    for (let track of trackArray) {
        ctx.drawImage(trackImg, track.x, track.y, track.width, track.height);
        track.x -= speedLevel;

        if (track.x + track.width <= 0) {
            track.x = trackArray[1 - trackArray.indexOf(track)].x + track.width;
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= 10;
      
        
        if(collision(dino, obstacle)) {
           gameOver = true;
        }

        if(gameOver) {
             cancelAnimationFrame(animationId);
            ctx.drawImage(gameOverImg, (canvasWidth - 386 ) / 2, canvasHeight / 2 - 20, 386, 40);

            return;
        }
    }


}

function handleKeyDown(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        if (dino.y == dinoY) {
            velocityY = -15;
        }
        if(gameOver) {
            gameOver = false;
            obstacles = [];
            dino.x = dinoWidth;
            dino.y = dinoY;
            score = 0;
            update();
        }
        
    }

    if (e.code == "ArrowDown") {
        duck = true;
    }
}

function handleKeyUp(e) {
    if (e.code == "ArrowDown") {
        duck = false;
    }
}

function collision(a, b) {
   return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}
