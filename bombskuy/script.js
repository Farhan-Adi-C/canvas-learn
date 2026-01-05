// welcome section
let welcomeContainer = document.getElementById("welcome");
let buttonPlay = document.getElementById("buttonPlay");
let buttonIntruction = document.getElementById("buttonIntruction");


// intruction section
let intructionContainer = document.getElementById("intruction");
intructionContainer.style.display = "none";
let buttonCloseIntruction = document.getElementById("closeIntruction");

buttonIntruction.addEventListener("click", () => {
    intructionContainer.style.display = "block";
})

buttonCloseIntruction.addEventListener("click", () => {
    intructionContainer.style.display = "none";
})