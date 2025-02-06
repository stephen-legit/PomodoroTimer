let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;

// DOM elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerDisplay = document.querySelector(".timer");

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        timerDisplay.classList.add("running"); // Add animation class
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.classList.remove("running"); // Remove animation class
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    timerDisplay.classList.remove("running"); // Remove animation class
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            alert("Time's up! Take a break! 🎉");
            timerDisplay.classList.remove("running");
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

// To allow for functionality with Electron
const { ipcRenderer } = require("electron");

// Minimize button
document.getElementById("minimize").addEventListener("click", () => {
    ipcRenderer.send("minimize-window");
});

// Close button
document.getElementById("close").addEventListener("click", () => {
    ipcRenderer.send("close-window");
});
