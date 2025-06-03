let colorOne = document.getElementById("color-a");
let colorTwo = document.getElementById("color-b");
let currentDirection = 'to bottom';
let outputCode = document.getElementById("code");

function setDirection(value, _this) {
    let direcrtions = document.querySelectorAll(".buttons button");
    for (let i of direcrtions) {
        i.classList.remove("active");
    }
    _this.classList.add("active");
    currentDirection = value;
}

function generateCode() {
    outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
    document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
    outputCode.select();
    document.execCommand('copy');
    alert("Gradient Copied!");
}

// Helper to generate random hex color
function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// Helper to pick a random direction
function getRandomDirection() {
    const directions = [
        'to top', 'to bottom', 'to left', 'to right',
        'to top left', 'to top right', 'to bottom left', 'to bottom right'
    ];
    return directions[Math.floor(Math.random() * directions.length)];
}

// Random button logic
const randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click', () => {
    document.querySelectorAll('input[type="color"]').forEach(input => {
        input.value = getRandomColor();
    });
    if (typeof setDirection === 'function') {
        const direction = getRandomDirection();
        // Find the button with the correct onclick attribute
        const buttons = document.querySelectorAll('.buttons button');
        let btn = null;
        buttons.forEach(b => {
            if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(direction)) {
                btn = b;
            }
        });
        setDirection(direction, btn);
    }
    if (typeof generateCode === 'function') {
        generateCode();
    }
});

// Set initial background on page load
window.addEventListener('DOMContentLoaded', () => {
    generateCode();
});