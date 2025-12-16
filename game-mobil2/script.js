const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight + 50;

const ctx = canvas.getContext('2d');

const imageCar = new Image();
imageCar.src = localStorage.getItem('carSrc');


let carX = 10;
let carY = 400;

let widthCar = canvas.width / 10 + 100;
let heightCar = 200;

obsImage = new Image();
obsImage.src = "obstacle.png";

let widthObs = canvas.width / 10 + 100;
let heightObs = canvas.height / 10 + 100;

let obs = [
    {
        x: canvas.width,
        y: Math.ceil((Math.round(Math.random() * 4)) * heightObs),
        passed: false
    }
];

let scoreElement = document.getElementById('score');
let score = 0;
scoreElement.innerText = score;

let speed = 0;
let spawnObs = 0;


// let ElementTrackingObsX = document.getElementById('obsX');
// let ElementTrackingObsY = document.getElementById('obsY');
// let obsX = 0;
// let obsY = 0;
// ElementTrackingObsX.innerText = obsX;
// ElementTrackingObsY.innerText = obsY;

// let ElementTrackingCarX = document.getElementById('carX');
// let ElementTrackingCarY = document.getElementById('carY');

// ElementTrackingCarX.innerText = carX;
// ElementTrackingCarY.innerText = carY;



const mouse = {
    x: null,
    y: null
};




window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowUp" && carY > 10) {
        carY -= heightCar ;

    }
    if (e.key == "ArrowDown" && carY < 700) {
        carY += heightCar ;
    }

})

const startGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageCar, carX, carY, widthCar, heightCar)


    for (let i = 0; i < obs.length; i++) {
        ctx.drawImage(obsImage, obs[i].x, obs[i].y, widthObs, heightObs);
        obs[i].x -= speed;

        if (obs[i].x == canvas.width - spawnObs) {
            obs.push({
                x: canvas.width,
                y: Math.ceil((Math.round(Math.random() * 4)) * heightObs),
                passed: false
            })
        }

        if (obs[i].x <= carX && obs[i].passed == false) {
            obs[i].passed = true;
            score++;
            scoreElement.innerText = score;
        }
       
        const carTop = carY;
        const carBottom = carY + heightCar;

        const obsTop = obs[i].y;
        const obsBottom = obs[i].y + heightObs;

        if(
            widthCar - 60 > obs[i].x &&
            0 < obs[i].x &&
            obs[i].y == carY

             )
            {
            cancelAnimationFrame(animated)
        }



        // tracking koordinat car

// ElementTrackingCarX.innerText = carX;
// ElementTrackingCarY.innerText = carY;
//         // untuk tracking koordinat obtacle
//         obsX = obs[i].x;
//         obsY = obs[i].y;
//         ElementTrackingObsX.innerText = obsX;
//         ElementTrackingObsY.innerText = obsY;

    }

    let animated = requestAnimationFrame(startGame);
}
// startGame();


// inisialisasi awal user

let levelConfig = {
    easy: {speed: 5, spawnObs: 1300 },
    medium: {speed: 10, spawnObs: 1000 },
    hard: {speed: 20, spawnObs: 700}
}


const form = document.getElementById('form')
const gameCanvas = document.getElementById('gameCanvas');
gameCanvas.style.display = 'none';

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const level = document.getElementById('level').value;
    const carSrc = document.querySelector('input[name="car"]:checked').value;

    localStorage.setItem("level", level);
    localStorage.setItem("carSrc", carSrc);

    imageCar.src = localStorage.getItem('carSrc');
    speed = levelConfig[localStorage.getItem('level')].speed ?? 5;
    spawnObs = levelConfig[localStorage.getItem('level')].spawnObs ?? 1700;

    startGame();


    form.style.display = 'none';
    gameCanvas.style.display = 'block';

   
})



