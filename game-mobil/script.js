const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style = "background-color: black;"

const ctx = canvas.getContext('2d');

let car = new Image();
car.src = 'image.png';



let carX = 10;
let carY = 300;
let speedObs = 5;

let obstacle = new Image();
obstacle.src = 'obstacle.png';
console.log(canvas.width)
let obs = [];
obs[0] = {
    x: canvas.width,
    y: 110
};

let scoreElement = document.getElementById('score');
let score = 0;
scoreElement.innerHTML = score;


window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowUp") {
        if (carY >= 200) {
            carY -= 200;
        }
    } if (event.key == "ArrowDown") {
        if (carY < 550) {
            carY += 200;
        }
    }

})
const main = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, 300, 200);

    // setInterval(() => {
    //     speedObs +=5;
    // }, 5000)

    for (let i = 0; i < obs.length; i++) {
        //  console.log(obs[i])
        ctx.drawImage(obstacle, obs[i].x, obs[i].y, 300, 300);

        obs[i].x -= speedObs;

        if (obs[i].x == 12) {
            score++;
            scoreElement.innerHTML = score;
        }

        if (obs[i].x == 402) {
            obs.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - obstacle.height + 100)

            })
        }
        if (
            obs[i].x > 0 &&
            carX + 200 > obs[i].x &&
            carY < obs[i].y + 300 &&
            carY  > obs[i].y) {
                alert('anda kalah')
                location.reload();
                cancelAnimationFrame(animationFrame)
            

        }
    }
    let animationFrame = requestAnimationFrame(main)


}

// window.addEventListener('keydown', (e) => {
//     main()
// })
main()

window.addEventListener('click', (e) => {
    // console.log('angka random: ' + Math.random() * (canvas.height - obstacle.height))
    // console.log('koordinat y: ' + e.y);
    // console.log('koordinat x: ' + e.x);
    
    console.log(carY)

})


