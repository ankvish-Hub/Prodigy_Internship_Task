let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 0; // Counter for lap numbers

function updateDisplay() {
    document.getElementById("seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;
    document.getElementById("minutes").textContent = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    document.getElementById("hours").textContent = hours < 10 ? `0${hours}:` : `${hours}:`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0; // Reset lap counter
    updateDisplay();
    clearLapRecords();
}

function addLap() {
    if (isRunning) {
        lapCount++; // Increment lap counter
        const lapTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        const lapList = document.getElementById("lap-list");
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`; // Add lap number
        lapList.appendChild(lapItem);

        // Make the Lap Records heading visible
        document.getElementById("lap-heading").style.display = "block";
    }
}

function clearLapRecords() {
    const lapList = document.getElementById("lap-list");
    lapList.innerHTML = ""; // Clear all lap records
    document.getElementById("lap-heading").style.display = "none"; // Hide the heading again
}

// Event listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", addLap);

updateDisplay();
