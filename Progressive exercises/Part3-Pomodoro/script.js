// -- Get HTML elements --
const displayTimer = document.querySelector('#theTimer');

// -- Global Variables --
let timerInterval = 0;
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

// --- Logic Section ---

// -- Time Settings --

let timeSettings = {
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60,
    longBreak: 15 * 60
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

// -- Button Timer Script -- 
// Event Delegation for break control buttons
document.querySelector('#sectionBreakController').addEventListener('click', (event) => {
    // It ensures that a buttons is being clicked
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        // Logic for each button based on the ID
        switch (buttonId) {
            case 'buttonFocus':
                displayTimer.textContent = formatTime(timeSettings.workTime);
                buttonPressed = 1;
                break;
            case 'buttonShortBreak':
                displayTimer.textContent = formatTime(timeSettings.shortBreak);
                buttonPressed = 2;
                break;
            case 'buttonLongBreak':
                displayTimer.textContent = formatTime(timeSettings.longBreak);
                buttonPressed = 3;
                break;
        }
    }
});

// -- Timer starter script --
const startTimer = document.querySelector('#buttonPlayPause').addEventListener ('click', () => {
    let timeLeft;

});