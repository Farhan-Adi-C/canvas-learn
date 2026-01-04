let canvas;
let canvasWidth = 360;
let canvasHeight = 640;
let ctx; 

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = canvasWidth / 8;
let birdY = canvasHeight / 2;
let birdImage;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

let pipeArray = [];
// pipeWidth : pipeHeight  === 1 : 8
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = canvasWidth;
let pipeY = 0;
let topPipeImage;
let bottomPipeImage;
let pipeVelocitiyX = -2;
let birdVelocityY = 0;
let gravitiy = 0.4;
let gameOver = false;
let score = 0;
let startGame = false;
let soundGame;
let speedLevel = 1500;
let pause = 1;

window.onload = () => {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');


    birdImage = new Image();
    birdImage.src = "./flappybird.png";
    // birdImage.onload = () => {
    //     ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height)
    // }

    topPipeImage = new Image();
    topPipeImage.src = 'toppipe.png';
    bottomPipeImage = new Image();
    bottomPipeImage.src = 'bottompipe.png';
    soundGame = new Audio("bgm_mario.mp3");

    if(startGame == false){
        document.addEventListener("keydown", function(e){
            if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){       
                startGame = true;
            }
        })
    }
    
update()
    document.addEventListener('keydown', moveBird);

setInterval(placePipe, speedLevel)

  
}

function update(){
    
       if (pause < 0) {
        ctx.fillStyle = "white";
        ctx.font = "30px sans-serif";
        ctx.fillText("PAUSED", 110, 320);
        soundGame.pause();
        cancelAnimationFrame(animationId);
    }else{
        
        let animationId = requestAnimationFrame(update);
    }
    

    if(startGame == false){
        ctx.fillStyle = "white";
        ctx.font = "25px sans-serif";
        ctx.fillText("press space to start game", 30, 250);
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height)

        return;
    }

    if(gameOver){
        soundGame.pause();
        soundGame.currentTime = 0;
        return;
    }
    if(bird.y > canvas.height ){
        gameOver = true;
    }

    if(startGame){

        soundGame.play();
    }

    if(score == 20){
        speedLevel = 1000;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);

    birdVelocityY += gravitiy;
    // bird.y += birdVelocityY;
    // bird.y = bird.y + birdVelocityY;
    bird.y = Math.max(bird.y + birdVelocityY, 0);
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height)

    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += pipeVelocitiyX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        if(collision(bird, pipe)){
            gameOver = true;
        }

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += .5;
            pipe.passed = true;
        }
    }

    while(pipeArray.length > 0 && pipeArray[0].x + pipeArray[0].width < 0){
        pipeArray.shift();
    }

    if(gameOver){
        ctx.fillText("GAME OVER", 40, 320);
    }

    ctx.fillStyle = "white";
    ctx.font = "45px sans-serif";
    ctx.fillText(score, 10, 45);
}

function placePipe(){


    if(startGame == false){
        return;
    }

    if(pause < 0){
        return
    }
    let randomY = pipeY - (pipeHeight/4) - Math.random() * (pipeHeight/2) ;

    let topPipe = {
        img: topPipeImage,
        x: pipeX,
        y: randomY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    let bottomPipe = {
        img: bottomPipeImage,
        x: pipeX,
        y: randomY + pipeHeight + (canvas.height / 4),
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);
}

function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){       
            birdVelocityY = -6;   

            if(gameOver){
                bird.y = birdY;
                pipeArray = [];
                score = 0;
                gameOver = false;
               
            }
    }

    if(e.code == "Escape"){
        pause *= -1;
        console.log(pause);
        if(pause > 0){
            update();
        }
    }
   
}

function collision(a, b){
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}