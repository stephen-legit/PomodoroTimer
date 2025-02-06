// Timer Variables
let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;
let isBreakTime = false;

// DOM Elements
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerDisplay = document.querySelector(".timer");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");
const themeToggleButton = document.getElementById("theme-toggle");

// Update time when user changes input
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
themeToggleButton.addEventListener("click", toggleDarkMode);

timerDisplay.classList.remove("running");

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        timerDisplay.classList.add("running");
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.classList.remove("running");
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = parseInt(workTimeInput.value) || 25;
    seconds = 0;
    updateDisplay();
    timerDisplay.classList.remove("running");
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        toggleWorkBreak();
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

function toggleWorkBreak() {
    if (!isBreakTime) {
        minutes = parseInt(breakTimeInput.value) || 5;
        isBreakTime = true;
        alert("Break time! Relax ☕️");
    } else {
        minutes = parseInt(workTimeInput.value) || 25;
        isBreakTime = false;
        alert("Back to work! 🚀");
    }
    seconds = 0;
}

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".app").classList.toggle("dark-mode");
    document.querySelector(".timer").classList.toggle("dark-mode");
    themeToggleButton.classList.toggle("dark-mode");
}

// Electron IPC Renderer
const { ipcRenderer } = require("electron");

document.getElementById("minimize").addEventListener("click", () => {
    ipcRenderer.send("minimize-window");
});

document.getElementById("close").addEventListener("click", () => {
    ipcRenderer.send("close-window");
});