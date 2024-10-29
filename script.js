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


// Initialize game on page load
window.onload = initializeGame;

// Game State Variables
let flippedCards = [];
let matchedPairs = 0;
const cardValues = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥭"]; // Symbols for card pairs
const totalPairs = cardValues.length;

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
    // Reset score, timer, and game state
    score = 0;
    timer = 0;
    matchedPairs = 0;
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

// Create Game Grid with Cards
function createGameGrid() {
    const allCards = [...cardValues, ...cardValues]; // Duplicate symbols for matching pairs
    shuffleArray(allCards); // Shuffle card values
    gameGrid.innerHTML = ""; // Clear any existing cards

    allCards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;

        // Front and Back for Flip Effect
        const front = document.createElement("div");
        front.classList.add("card-front");
        front.innerText = symbol;

        const back = document.createElement("div");
        back.classList.add("card-back");
        back.innerText = "?";

        card.appendChild(front);
        card.appendChild(back);
        gameGrid.appendChild(card);

        // Card flip event listener
        card.addEventListener("click", () => handleCardFlip(card));
    });
}

// Shuffle Array Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Handle Card Flip Logic
function handleCardFlip(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if Two Flipped Cards are a Match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        matchedPairs += 1;
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = []; // Reset for next pair

        // Check for Game Win
        if (matchedPairs === totalPairs) {
            setTimeout(() => showWinPopup(), 500);
        }
    } else {
        // Hide cards if not a match after a brief pause
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

// Show Win Popup
function showWinPopup() {
    winPopup.style.display = "block";
    // Save score to leaderboard
    saveScoreToLeaderboard();
}

// Save Score to Leaderboard
function saveScoreToLeaderboard() {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push({ score, timer });
    scores.sort((a, b) => b.score - a.score || a.timer - b.timer);
    localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5))); // Top 5 scores

    // Update leaderboard display
    updateLeaderboard();
}

// Update Leaderboard Display
function updateLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];

    scores.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1} - Score: ${entry.score}, Time: ${entry.timer}s`;
        leaderboardList.appendChild(listItem);
    });
}

// Restart the Game
playAgainBtn.addEventListener("click", () => {
    winPopup.style.display = "none";
    initializeGame();
});

// Initialize game on page load
window.onload = initializeGame;
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const winSound = document.getElementById("win-sound");
const backgroundMusic = document.getElementById("background-music");

// Play background music on game start
backgroundMusic.play();

// Function to play sounds
function playSound(sound) {
    if (!isMuted) sound.play();
}

// Play flip sound when a card is flipped
function handleCardFlip(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);
        playSound(flipSound);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Play match sound on successful match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        matchedPairs += 1;
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = [];
        playSound(matchSound);

        // Check for game win
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                showWinPopup();
                playSound(winSound);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}
