let canvasHeight = innerHeight - 20;
let canvasWidth = canvasHeight * 9 / 16;


let ctx;

let flappybirdImage;
let birdWidth = 34;
let birdHeight = 24;
let birdX = canvasWidth / 8;
let birdY = canvasHeight / 2;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}


let pipeWidth = 64;
let pipeHeight = 512;
let pipeY = 0;
let pipeX = canvasWidth + pipeWidth;
let pipeArray = [];
let pipeTopImage;
let pipeBottomImage;
let velocityY = 0;
let gravity = 0.4;


window.onload = () => {
    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    flappybirdImage = new Image();
    flappybirdImage.src = "flappybird.png";

    pipeTopImage = new Image();
    pipeTopImage.src = "toppipe.png";
    pipeBottomImage = new Image();
    pipeBottomImage.src = "bottompipe.png";

    
    update() 
    document.addEventListener("keydown", handleToggle)
    setInterval(addPipe, 1500);
}

function update(){

    requestAnimationFrame(update);
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    ctx.drawImage(flappybirdImage, bird.x, bird.y, bird.width, bird.height);
    velocityY += gravity;
    bird.y += velocityY;
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        pipe.x -= 2
    }
}

function addPipe(){
    console.log(pipeArray);
    let randomY = pipeY - (pipeHeight/4) - Math.random() * (pipeHeight / 2);
    let pipeTop = {
        x: pipeX,
        y: randomY,
        width: pipeWidth,
        height: pipeHeight,
        img: pipeTopImage
    }

    let pipeBottom = {
        x: pipeX,
        y: randomY + pipeHeight + (canvasHeight / 4),
        width: pipeWidth,
        height: pipeHeight,
        img: pipeBottomImage
    }

    

    pipeArray.push(pipeTop);
    pipeArray.push(pipeBottom)
}

function handleToggle(e){
    if(e.code == "Space" || e.code == "ArrowUp"){
        velocityY = -6;
    }
}