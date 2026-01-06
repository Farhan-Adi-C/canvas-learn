// welcome section
let welcomeContainer = document.getElementById("welcome");
let buttonPlay = document.getElementById("buttonPlay");
let buttonIntruction = document.getElementById("buttonIntruction");
let inputUsername = document.querySelector(".username");
let inputLevel = document.querySelector(".level");
let username;


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

// button play
buttonPlay.addEventListener("click", () => {
    if (!inputUsername.value || inputLevel.value == "selectLevel") {
        alert("isi username dan level terlebih dahulu")
    }

  else{
      welcomeContainer.style.display = "none";
      intructionContainer.style.display = "none";
      canvas.style.display = "inline-block";
      username = inputUsername.value;
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
let time;
let heart = 3;


// comp game
let char;
let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

let dog;
let walls = [];
let wallRandomCount = 10;
let stones = [];
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

window.onload = () => {
    loadImages();
    loadGames();
    update();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp); 

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
}

function loadGames() {
   
    for(let i = 0; i < rowBlock; i++) {
        for(let j = 0; j < colBlock; j++) {
            let row = maps[i];
            let mapBlock = row[j];
            
            let x = j * blockSize;
            let y = i * blockSize;
            if(mapBlock == "X") {
                stones.push(new Block("null", x, y, blockSize, blockSize))
            }
            if(mapBlock == "C") {
                 char = new Block(charDownImage, x + 5, y + 5, blockSize - 10, blockSize - 10);
            }
            if(mapBlock == " ") {
                // if(i != 1 && j != 1 || i != 1 && j != 2 || i != 2 && j != 1){
                // }
               
                roads.push(new Block("null", x, y, blockSize, blockSize));
            }
        }

    }
    for(let i = 0; i < wallRandomCount; i++) {
       let random = Math.floor(Math.random() * (roads.length - 5) + 5);
       let wallRandom = roads[random];
       walls.push(wallRandom);
    }

   
}


function drawMap() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(backgroundImage, 0, 0, mapWidth, mapHeight);
    ctx.drawImage(char.image, char.x, char.y, char.width, char.height);

    for(let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        if(collision(char, wall)){
            char.y -= char.velocityY;
            char.x -= char.velocityX;
            char.stop();
        }
        ctx.drawImage(wallImage, wall.x, wall.y, wall.width, wall.height);

    }
    ctx.drawImage(bombSkuyImage, canvasWidth - (canvasWidth - 705) + 60, 30, 200, 30);
    ctx.fillStyle = "white";
    ctx.font = "22px arial";
    ctx.fillText(`Player   : ${username}`, canvasWidth - (canvasWidth - 705) + 60, 100 );
    ctx.fillText(`Time     : ${time || "00:00:00"}`, canvasWidth - (canvasWidth - 705) + 60, 130 );

    for(let i = 0; i < 3; i++) {
        if(heart <= i){
        ctx.drawImage(heartImage, 72, 0, 36, 30, canvasWidth - (canvasWidth - 705) + 60 + (i * 40), 170, 36 , 30 );
        }else{

            ctx.drawImage(heartImage, 0, 0, 36, 30, canvasWidth - (canvasWidth - 705) + 60 + (i * 40), 170, 36 , 30 );
        }
    }

    ctx.drawImage(wallCrackImage, canvasWidth - (canvasWidth - 705) + 60, 230, 40, 40 );
    ctx.font = "40px arial";
    ctx.fillText(`=  4`, canvasWidth - (canvasWidth - 705) + 130, 260 );

    ctx.drawImage(tntImage, canvasWidth - (canvasWidth - 705) + 60, 310, 40, 40 );
    ctx.fillText(`=  0`, canvasWidth - (canvasWidth - 705) + 130, 340 );


    ctx.drawImage(iceImage, canvasWidth - (canvasWidth - 705) + 60, 390, 40, 40 );
    ctx.fillText(`=  1`, canvasWidth - (canvasWidth - 705) + 130, 420 );

}


 function move() {
    char.x += char.velocityX;
    char.y += char.velocityY;



    for(let i = 0; i < stones.length; i++) {
        let stone = stones[i];
        if(collision(char, stone)){
            char.y -= char.velocityY;
            char.x -= char.velocityX;
            char.stop();
        }
    }

       
 }



function getTime() {
  setInterval(() => {
        detik++;
        let h = Math.floor(detik / 3600);
        let m =  Math.floor((detik % 3600) / 60 ) ;
        let s = detik % 60;

        let formatWaktu = String(h).padStart(2, "0") + ":" + 
                            String(m).padStart(2, "0") + ":" + 
                            String(s).padStart(2, "0") ;
        time = formatWaktu;

    }, 1000)
}

class Block {
    constructor (image, x, y, width, height){
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
    }

    udpateDirection(direction) {
        this.direction = direction;
        if(direction == "R"){
            this.image = charRightImage;
            this.velocityX = blockSize / 40;
            this.velocityY = 0;
        }
        if(direction == "L"){
            this.image = charLeftImage
            this.velocityX = -blockSize / 40;
            this.velocityY = 0;
        }
        if(direction == "U"){
            this.image = charUpImage
            this.velocityX = 0;
            this.velocityY = -blockSize / 40;
        }
        if(direction == "D"){
            this.image = charDownImage;
            this.velocityX = 0;
            this.velocityY = blockSize / 40;
        }
        
    }

    stop() {
        this.velocityX = 0;
        this.velocityY = 0;
    }


}


function collision(a, b) {
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y

}


function handleKeyDown(e) {
    if(e.code == "KeyA" || e.code == "ArrowLeft"){
        keys.left = true;
        keys.down = false;
        keys.right = false;
        keys.up = false;
    }
    if(e.code == "KeyD" || e.code == "ArrowRight"){
        keys.right = true
        keys.left = false;
        keys.up = false;
        keys.down = false;
    }
    if(e.code == "KeyW" || e.code == "ArrowUp"){
        keys.up = true;
        keys.down = false;
        keys.right = false;
        keys.left = false;
    }
    if(e.code == "KeyS" || e.code == "ArrowDown"){
        keys.down = true;
        keys.up = false;
        keys.right = false;
        keys.left = false;
    }
    
}

function handleKeyUp(e) {
       if(e.code == "KeyA" || e.code == "ArrowLeft"){
        keys.left = false;
    }
    if(e.code == "KeyD" || e.code == "ArrowRight"){
       keys.right = false;
    }
    if(e.code == "KeyW" || e.code == "ArrowUp"){
        keys.up = false;
    }
    if(e.code == "KeyS" || e.code == "ArrowDown"){
       keys.down = false;
    }
    
}
