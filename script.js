// Elements for controls and game state
const loadingScreen = document.getElementById("loading-screen");
const winPopup = document.getElementById("win-popup");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameGrid = document.querySelector(".game-grid");
const playAgainBtn = document.getElementById("play-again-btn");
const restartBtn = document.getElementById("restart-btn");
const muteBtn = document.getElementById("mute-btn");
const toggleModeBtn = document.getElementById("toggle-mode");
let score = 0;
let timer = 0;
let isMuted = false;

// Initialize Game with Loading Screen
function initializeGame() {
    loadingScreen.style.display = "block";
    setTimeout(() => {
        loadingScreen.style.display = "none";
        startGame();
    }, 2000); // Simulate loading for 2 seconds
}

// Start Game Logic
function startGame() {
    // Reset score and timer
    score = 0;
    timer = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;

    // Start timer
    setInterval(() => {
        timer += 1;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);

    // Initialize cards
    createGameGrid();
}

// Toggle Light/Dark Mode
toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Mute and Unmute Sound
muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? "Unmute" : "Mute";
});

// Restart Game
restartBtn.addEventListener("click", () => {
    location.reload(); // Simple way to restart
});

// Placeholder for Game Grid Creation
function createGameGrid() {
    // Here we'll generate and shuffle cards
    // This function will be completed in the next steps
}

// Initialize game on page load
window.onload = initializeGame;
