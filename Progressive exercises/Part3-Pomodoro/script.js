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

// Time settings
document.querySelector('#settingsControlPanel').addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT') {
        const inputId = event.target.id;

        switch (inputId) {
            case 'focusTimeScrollValue':
                const focusTimeOutput = event.target.closest('OUTPUT');
                focusTimeOutput.textContent = inputId.value;
                break;
            case 'shortTimeScrollValue':
                break;
            case 'longTimeScrollValue':
                break;
        }
    }
});

// --- Logic Section ---

// -- Time Settings --

const timeSettings = {
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

// -- Get HTML elements --
const displayTimer = document.querySelector('#theTimer');

// -- Button Timer Script -- 
// Event Delegation for break control buttons
document.querySelector('#sectionBreakController').addEventListener('click', (event) => {
    // It ensures that a buttons is being clicked
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        let timerMinutes;
        let timerSeconds;

        // Logic for each button based on the ID
        switch (buttonId) {
            case 'buttonFocus':
                const workTimeSeconds = timeSettings.workTime; // Get the total seconds in the object
                timerMinutes = String(Math.floor(workTimeSeconds / 60)).padStart(2, '0');
                timerSeconds = String(workTimeSeconds % 60).padStart(2, '0');

                displayTimer.textContent = `${timerMinutes}:${timerSeconds}`;
                break;
            case 'buttonShortBreak':
                const shortBreakSeconds = timeSettings.shortBreak;
                timerMinutes = String(Math.floor(shortBreakSeconds / 60)).padStart(2, '0');
                timerSeconds = String(shortBreakSeconds % 60).padStart(2, '0');

                displayTimer.textContent = `${timerMinutes}:${timerSeconds}`;
                break;
            case 'buttonLongBreak':
                const longBreakSeconds = timeSettings.longBreak;
                timerMinutes = String(Math.floor(longBreakSeconds / 60)).padStart(2, '0');
                timerSeconds = String(longBreakSeconds % 60).padStart(2, '0');

                displayTimer.textContent = `${timerMinutes}:${timerSeconds}`;
                break;
        }
    }
});
