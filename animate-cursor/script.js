// // const mycanvas = document.getElementById('canvas');

// // mycanvas.width = window.innerWidth;
// // mycanvas.height = window.innerHeight; 

// // // declare canvas type / context 
// // const canvas = mycanvas.getContext('2d');
// // console.log(canvas)

// // // // styling canvas

// // // canvas.fillStyle = 'red';
// // // canvas.strokeStyle = '#999';
// // // canvas.lineWidth = '5';
// // // canvas.beginPath();

// // // // make rectangle
// // // canvas.rect(50, 50, 300, 300)
// // // canvas.rect(360, 50, 300, 300)
// // // canvas.fill();
// // // canvas.stroke();

// // // // make circle / Arc
// // // canvas.fillStyle = 'blue';
// // // canvas.beginPath();
// // // canvas.arc(900, 200, 100,  0, 2 * Math.PI);
// // // canvas.fill();

// // // // make triangle
// // // canvas.fillStyle = 'purple';
// // // canvas.strokeStyle = '#999';
// // // canvas.beginPath();
// // // canvas.moveTo(900, 200);
// // // canvas.lineTo(1000, 400);
// // // canvas.lineTo(800, 400);
// // // canvas.closePath();
// // // // canvas.lineTo(900, 200);
// // // canvas.stroke();
// // // canvas.fill()



// // //  animation shapes
// // let x = 160;
// // let y = 160
// // let speedX = 5;
// // let speedY = 5;

// // function dash(){
// //     window.requestAnimationFrame(dash)
// //     canvas.clearRect(0,0, innerWidth, innerHeight);
// //     canvas.fillStyle = 'red';
// //     canvas.fillStroke = 'black';
// //     canvas.beginPath();
// //     canvas.arc(x, y, 150, 0, 2 * Math.PI);
// //     canvas.fill();
// //     canvas.stroke();

// //     if(x + 150 > innerWidth || x < 150){
// //          speedX = -speedX;

// //     }
// //     if(y + 150 > innerHeight || y < 150){
// //          speedY = -speedY;

// //     }
// //     x += speedX;
// //     y += speedY;
// // }

// // dash()


// const mycanvas = document.getElementById('canvas');
// mycanvas.width = window.innerWidth;
// mycanvas.height = window.innerHeight;
// let particleArray = [];

// window.addEventListener('resize', function(){
//     mycanvas.width = window.innerWidth;
// mycanvas.height = window.innerHeight;
// })

// const canvas = mycanvas.getContext('2d');
// // console.log(canvas);

// // canvas.fillStyle = 'red';
// // canvas.fillStroke = 'black';
// // canvas.rect(100, 100, 200, 200);
// // canvas.fill();
// // canvas.stroke();
// // canvas.beginPath();


// let x = 200;
// let y = 200;

// let speedX = 5;
// let speedY = 5;


// function gerak(){
//     window.requestAnimationFrame(gerak)

// canvas.fillStyle = 'blue';
// canvas.strokeStyle = 'red';
// canvas.lineWidth = 10;
// canvas.clearRect(0,0,innerWidth, innerHeight);
// canvas.arc(x, 200, 50, 0, Math.PI * 2);
// canvas.fill();
// canvas.stroke();
// canvas.beginPath();

// if(x + 50 > innerWidth || x < 50){
//     speedX = -speedX;
// }
// x += speedX;
// }
// // gerak()


// let mouse = {
//     x: null,
//     y: null
// }




// function createCircle(){
//     // canvas.clearRect(0,0, mycanvas.width, mycanvas.height);
//     let warna = Math.round(Math.random() * 10000)
//     canvas.fillStyle = `#${warna}`;
//     canvas.strokeStyle = 'black';
//     canvas.beginPath();
//     canvas.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
//     canvas.fill();
//     // canvas.stroke();
// }


// class Particle {
//     constructor(){
//         this.x = Math.random() * mycanvas.width;
//         this.y = Math.random() * mycanvas.height;
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//     }

//     update(){
//         this.x += this.speedX;
//         this.y += this.speedY;
//     }
//     draw(){
//         canvas.beginPath();
//         canvas.fillStyle = 'red';
//         canvas.arc(this.x, this.y, 20, 0, Math.PI * 2);
//         canvas.fill();
//     }
// }

// function init(){
//     for(let i = 0; i < 100; i++){
//         particleArray.push(new Particle());
//     }
// }
// init()

// function start(){
//     for(let i = 0; i < particleArray.length; i++){
//         particleArray[i].update();
//         particleArray[i].draw();
//     }
// }


// window.addEventListener('mousemove', function(event){
//     // const rect = mycanvas.getBoundingClientRect();
//     mouse.x = event.x;
//     mouse.y = event.y;
//     // createCircle()
// })

// function animate(){
//     canvas.clearRect(0,0, mycanvas.width, mycanvas.height);

//     start();
//     requestAnimationFrame(animate)
// }
// animate();

const mycanvas = document.getElementById('canvas');
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;

const ctx = mycanvas.getContext('2d');
mycanvas.style = 'background-color: black'

ctx.fillStyle = 'red';
ctx.strokeStyle = 'black';


let mouse = {
    x: null,
    y: null,
}



// let ex = 200;
// let ye = 200;
// let speedX = 5;
// let speedY = 5;


// function gerak(){
//     requestAnimationFrame(gerak)
//     ctx.beginPath();
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     ctx.fillStyle = 'blue';
//     ctx.strokeStyle = 'black';
//     ctx.arc(ex, ye, 200, 0, Math.PI * 2 );
//     ctx.fill();
//     ctx.stroke()


//     if (ex > innerWidth - 200 || ex < 200) {
//         speedX = -speedX;
//     }
//     if (ye > innerHeight - 200 || ye < 200) {
//         speedY = -speedY;
//     }
//     // if(ex < innerWidth || ex < 200) {
//     //     ex +=5;
//     // }
//     // if(ye < innerHeight || ye < 200) {
//     //     ye += 5
//     // }
//      ex+=speedX;
//     ye+=speedY;

// }
// gerak()

let warna = 0;
let menampungCircle = [];
class Particle {
    constructor() {
        // this.x = Math.random() * mycanvas.width;
        // this.y = Math.random() * mycanvas.height;
        this.x = mouse.x + Math.random() * 100;
        this.y = mouse.y + Math.random() * 100;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
        this.size = Math.random() * 10;
        this.speedSize = Math.random();
        this.color = 'hsl('+ warna +', 100%, 50%)';

    }
    updateCoordinate() {
        if (this.x > innerWidth || this.x < 100) {
            this.speedX = - this.speedX;
        }
        if (this.y > innerHeight || this.y < 100) {
            this.speedY = - this.speedY;
        }
        // this.size -= this.speedSize;

        // if (this.size > 100 || this.size < 20) {
        //     this.speedSize = -this.speedSize;
        // }

        if(this.size > .2) this.size -= .2;
        this.x += this.speedX;
        this.y += this.speedY;

    }
    drawCircle() {
        ctx.beginPath()

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        // ctx.stroke();
    }
}


window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let index = 0; index < 5; index++) {
        menampungCircle.push(new Particle())
    }
})

window.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 30; i++){
        menampungCircle.push(new Particle())
    }
})


function start() {
    for (let i = 0; i < menampungCircle.length; i++) {
        menampungCircle[i].updateCoordinate();
        menampungCircle[i].drawCircle();

        for(let j = i; j < menampungCircle.length; j++){
            const dx = menampungCircle[i].x - menampungCircle[j].x;
            const dy = menampungCircle[i].y - menampungCircle[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = menampungCircle[i].color;
                ctx.moveTo(menampungCircle[i].x, menampungCircle[i].y);
                ctx.lineTo(menampungCircle[j].x, menampungCircle[j].y);
                ctx.stroke()
            }
        }

        if(menampungCircle[i].size <= .3){
            menampungCircle.splice(i, 1);
            i--;
        }

    }
}

function animate() {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    warna+= 5;
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // ctx.fillRect(0, 0, mycanvas.width, mycanvas.height)

    start()
    requestAnimationFrame(animate);
}
animate()

