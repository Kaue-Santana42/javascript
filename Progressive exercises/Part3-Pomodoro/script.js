// -- Get HTML elements --
const displayTimer = document.querySelector('#theTimer');

// Global Variable
let timeLeft; 
let isRunning = false;

// --- CSS Section ---

// -- Settings Buttons --
// Open side panel
document.querySelector('#settings').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        switch (buttonId) {
            case 'buttonSettings':
                const sidePanel = document.querySelector('#settingsControlPanel');
                sidePanel.classList.toggle('open'); // create or remove a class if it exists or not.
                break;
            case 'buttonSound':
                break;
        }
    }
});

// This function will swap the timer play Icon
const swapPlayerDisplay = (isRunning) => {
    const playIcon = document.querySelector('#playPause');
    if (isRunning) {
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
}

// Changing background and buttons color according the mode
const focusBackground = () => {
    const bodyBackground = document.querySelector('body');
    bodyBackground.style.setProperty('--background-color-two', '#6E3232');
    bodyBackground.style.setProperty('--background-color-three', '#C42727');

    document.documentElement.style.setProperty('--buttonColor', '#101010 0%, #6E3232 35%, #C42727 100%');
    document.documentElement.style.setProperty('--asideSliderBorderColor', '#C42727');
}

const shortBreakBackground = () => {
    const bodyBackground = document.querySelector('body');  
    bodyBackground.style.setProperty('--background-color-two', '#2E2E59');
    bodyBackground.style.setProperty('--background-color-three', '#2734C4');

    document.documentElement.style.setProperty('--buttonColor', '#101010 0%, #2E2E59 35%, #2734C4 100%');
    document.documentElement.style.setProperty('--asideSliderBorderColor', '#2734C4');
}

const longBreakBackground = () => {
    const bodyBackground = document.querySelector('body');  
    bodyBackground.style.setProperty('--background-color-two', '#251D3B');
    bodyBackground.style.setProperty('--background-color-three', '#6127C4');

    document.documentElement.style.setProperty('--buttonColor', '#101010 0%, #251D3B 35%, #6127C4 100%');
    document.documentElement.style.setProperty('--asideSliderBorderColor', '#6127C4');
}

// -- Sound Section --


// --- Logic Section ---

// -- Time Settings --

let timeSettings = {
    workTime: 0.1 * 60, // 25 minutes in seconds
    shortBreak: 0.1 * 60,
    longBreak: 0.1 * 60
};

// -- Time formatter -- 
// Called when a button is pressed
const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// This variable will be useful to identify what was the last button pressed, 
// then the program will know if the display must be updated based on the mode.
let buttonPressed = 0;

// This function will be called when the settings change
const updateTimerDisplay = () => {
    switch (buttonPressed) {
        case 1:
            displayTimer.textContent = formatTime(timeSettings.workTime);
            break;
        case 2:
            displayTimer.textContent = formatTime(timeSettings.shortBreak);
            break;
        case 3:
            displayTimer.textContent = formatTime(timeSettings.longBreak);
            break;
    }
}

// -- Time Settings Listener --
document.querySelector('#settingsControlPanel').addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT') {
        const value = event.target.value;
        const inputId = event.target.id;

        // Update the visual text (<output>)
        // parentElement goes back to parent element (<div>) and search the child selected (<output>).
        const displayOutput = event.target.parentElement.querySelector('output');
        displayOutput.textContent = value;

        switch (inputId) {
            case 'focusTimeScrollValue':
                timeSettings.workTime = value * 60;
                updateTimerDisplay(); // Timer Display is updated automatically when settings is changed
                break;
            case 'shortTimeScrollValue':
                timeSettings.shortBreak = value * 60;
                updateTimerDisplay();
                break;
            case 'longTimeScrollValue':
                timeSettings.longBreak = value * 60;
                updateTimerDisplay();
                break;
        }
    }
});

// Modes script functions

const focusMode = () => {
    displayTimer.textContent = formatTime(timeSettings.workTime);
    timeLeft = timeSettings.workTime;
    buttonPressed = 1;
    focusBackground();
}

const shortBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.shortBreak);
    timeLeft = timeSettings.shortBreak;
    buttonPressed = 2;
    shortBreakBackground();
}

const longBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.longBreak);
    timeLeft = timeSettings.longBreak;
    buttonPressed = 3;
    longBreakBackground();
}

// -- Button Timer Script -- 

// Event Delegation for break control buttons
document.querySelector('#sectionBreakController').addEventListener('click', (event) => {
    // It ensures that a buttons is being clicked
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        // Logic for each button based on the ID
        switch (buttonId) {
            case 'buttonFocus':
                focusMode();

                isRunning && document.querySelector('#buttonPlayPause').click(); // If the user changes the mode while the time is running, it will stop
                break;
            case 'buttonShortBreak':
                shortBreakMode();

                isRunning && document.querySelector('#buttonPlayPause').click();
                break;
            case 'buttonLongBreak':
                longBreakMode();

                isRunning && document.querySelector('#buttonPlayPause').click();
                break;
        }
    }
});

// Variables for time running
let timerId = null; // Used for stopping the setInterval()

let pomodoroCounter = 0; // It will count how many pomodoro has been finished

const swapMoodMode = (pomodoroFinished) => {
    if (buttonPressed == 1 && pomodoroFinished == 3) {
        longBreakMode();
        pomodoroCounter = 0;
        buttonPressed = 3;
    } else if (buttonPressed == 1 && pomodoroFinished !== 3) {
        shortBreakMode();
        buttonPressed = 2;
    }

    if (buttonPressed == 2 || buttonPressed == 3) {
        focusMode();
        buttonPressed = 1;
    }
}

// -- Timer starter script --
const toggleTimer = document.querySelector('#buttonPlayPause').addEventListener("click", () => {
    if (buttonPressed == 0) {
        window.alert('Please, select a mode');
    } else {
        if (isRunning) {
            // Pausing
            clearInterval(timerId);
            timerId = null;
            isRunning = false;

            swapPlayerDisplay(isRunning);
        } else {
            // Starting
            isRunning = true;
            swapPlayerDisplay(isRunning);

            timerId = setInterval(() => {
            timeLeft--; // Remove 1 second
            displayTimer.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                isRunning = false;
                swapPlayerDisplay(isRunning);
                
                buttonPressed == 1 && (pomodoroCounter += 1);
                swapMoodMode(pomodoroCounter);

                clearInterval(timerId);
                timerId = null;
            }
        }, 1000);
    }
    }

});