const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style = "background-color: black;"

const ctx = canvas.getContext('2d');

let car = new Image();
car.src = 'image.png';



let carX = 10;
let carY = 120;

let obstacle = new Image();
obstacle.src = 'obstacle.png';
// console.log(obstacle.src)
let obs = [];
obs[0] = {
    x: canvas.width,
    y: 110
};

let score = 0;

window.addEventListener('keydown', (event) => {
    if(event.key == "ArrowUp"){
        if(carY >= 200) {
            carY -=200;
        }
    } if(event.key == "ArrowDown"){
        if(carY < 550){
            carY +=200;
        }
    }

})
const main = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, 300, 200);

    for(let i = 0; i < obs.length; i++){
        ctx.drawImage(obstacle, obs[i].x, obs[i].y);
        obs[i].x-=5;

        if(obs[i].x == 245) {
            obs.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - obstacle.height)

            })
        }
    }
    requestAnimationFrame(main)
}
main()


