let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;
let isBreakTime = false;

// DOM elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerDisplay = document.querySelector(".timer");

// Custom Timer Settings
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");

// Update time immediately when user changes input
workTimeInput.addEventListener("input", () => {
    if (!isRunning && !isBreakTime) {
        minutes = parseInt(workTimeInput.value) || 25;
        seconds = 0;
        updateDisplay();
    }
});

breakTimeInput.addEventListener("input", () => {
    if (!isRunning && isBreakTime) {
        minutes = parseInt(breakTimeInput.value) || 5;
        seconds = 0;
        updateDisplay();
    }
});

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
    if (minutes === 0 && seconds === 0) {
        // Timer finished, switch between work/break
        if (!isBreakTime) {
            minutes = parseInt(breakTimeInput.value) || 5; // Switch to break time
            isBreakTime = true;
            alert("Break time! Relax ☕️");
        } else {
            minutes = parseInt(workTimeInput.value) || 25; // Switch to work time
            isBreakTime = false;
            alert("Back to work! 🚀");
        }
        seconds = 0;
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
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

// Dark Mode Toggle
const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".app").classList.toggle("dark-mode");
    document.querySelector(".timer").classList.toggle("dark-mode");
    themeToggleButton.classList.toggle("dark-mode");
});
