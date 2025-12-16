const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const imageCar = new Image();
imageCar.src = 'image.png';


const mouse = {
    x: null,
    y: null
};


window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

const coba = () => {
    
    ctx.clearRect(0, 0,innerWidth, innerHeight);
    ctx.drawImage(imageCar, mouse.x, mouse.y, 100, 100)
    requestAnimationFrame(coba)
}
coba();