// -- Get HTML elements --
const displayTimer = document.getElementById('theTimer');
const sidePanel = document.getElementById('settingsControlPanel');

// Global Variable
let timeLeft; 
let isRunning = false;

// --- CSS Section ---

// Favicon Swapping
const swapFavicon = (currentMode) => {
    const favicon = document.getElementById('favicon');
    switch (currentMode) {
        case 1:
            favicon.setAttribute("href", "images/focus-icon.ico");
            break;
        case 2:
            favicon.setAttribute("href", "images/shortBreak-icon.ico");
            break;
        case 3:
            favicon.setAttribute("href", "images/longBreak-icon.ico");
            break;
    }
}

// -- Settings Buttons --

let isMuted = false;

// Swap Icon to muted or not
const swapSoundIcon = () => {
    const soundIcon = document.getElementById('soundIcon');

    if(!isMuted) {
        soundIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
        isMuted = true;
    } else {
        soundIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
        isMuted = false;
    }
}

// Open side panel
document.getElementById('settings').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        switch (buttonId) {
            case 'buttonSettings':
                sidePanel.classList.toggle('open'); // create or remove a class if it exists or not.
                break;
            case 'buttonSound':
                swapSoundIcon();
                break;
        }
    }
});

// When time is running, settings and sound button will be hidden.
const hideSettings = (isRunning) => {
    const settingsSection = document.getElementById('settings');

    if (isRunning) {
        // when time starts
        settingsSection.classList.toggle('hidden');
        if (sidePanel.classList.contains('open')) {
            sidePanel.classList.toggle('open');
        }
    } else {
        // when time stops
        settingsSection.classList.toggle('hidden');
    }
}

// This function will swap the timer play Icon
const swapPlayerDisplay = (isRunning) => {
    const playIcon = document.getElementById('playPause');

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

// --- Logic Section ---

// -- Storage Handler --

const syncSettingsStorage = (timeConfigured) => {
    localStorage.setItem('savedTimeSettings', JSON.stringify(timeConfigured));
}

// It will check if there is any settings already saved
const loadSettingsStorage = () => {
    const timeSettingsSaved = localStorage.getItem('savedTimeSettings');

    if (timeSettingsSaved) {
        return JSON.parse(timeSettingsSaved);
    } else {
        return {
            workTime: 25 * 60, // 25 minutes in seconds
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };
    }
}

// -- Sound Section --

// Start sound
const playMusic = (isRunning, isMuted, currentMode) => {
    const backgroundAudio = document.getElementById('soundSection');

    // It pauses before any changes
    backgroundAudio.pause();

    if (!isRunning || isMuted) return; // Function will not work if the timer is stopped or the sound is muted.

    // Assign new font
    let track;
    if (currentMode === 1) track = "focusMusic";
    else if (currentMode === 2) track = "shortBreakMusic";
    else track = "longBreakMusic";

    backgroundAudio.innerHTML = `
    <source src="sounds/${track}.ogg" type="audio/ogg">
    <source src="sounds/${track}.mp3" type="audio/ogg">
    `;

    // Forcing the loading of the new file before play it
    backgroundAudio.load();
    backgroundAudio.play().catch(e => console.log("error when playing", e));
}

const playTransitionSound = (isMuted) => {
    const transitionSound = document.getElementById('soundTranstion');

    !isMuted && (transitionSound.play());
}

// -- Time Settings --

let timeSettings = loadSettingsStorage();

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

// Title Display script, it checks the mode and changes the title.
const updateTimerTitleDisplay = (currentMode) => {
    switch (currentMode) {
        case 1:
            document.title = "Focus: " + formatTime(timeLeft);
            break;
        case 2:
            document.title = "Short Break: " + formatTime(timeLeft);
            break;
        case 3:
            document.title = "Long Break: " + formatTime(timeLeft);
            break;
    }
}

// This function will be called when the settings change
const updateTimerDisplay = () => {
    switch (buttonPressed) {
        case 1:
            displayTimer.textContent = formatTime(timeSettings.workTime);
            timeLeft = timeSettings.workTime;
            updateTimerTitleDisplay(buttonPressed);
            break;
        case 2:
            displayTimer.textContent = formatTime(timeSettings.shortBreak);
            timeLeft = timeSettings.shortBreak;
            updateTimerTitleDisplay(buttonPressed);
            break;
        case 3:
            displayTimer.textContent = formatTime(timeSettings.longBreak);
            timeLeft = timeSettings.longBreak;
            updateTimerTitleDisplay(buttonPressed);
            break;
    }
}

// -- Time Settings Listener --
document.getElementById('settingsControlPanel').addEventListener('input', (event) => {
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
                syncSettingsStorage(timeSettings);
                break;
            case 'shortTimeScrollValue':
                timeSettings.shortBreak = value * 60;
                updateTimerDisplay();
                syncSettingsStorage(timeSettings);
                break;
            case 'longTimeScrollValue':
                timeSettings.longBreak = value * 60;
                updateTimerDisplay();
                syncSettingsStorage(timeSettings);
                break;
        }
    }
});

// It will start at the focus mode automatically
// Settings on the side panel will be showed according the user settings
window.addEventListener('load', () => {
    focusMode();

    const focusSliderValue = document.getElementById('focusTimeScrollValue');
    const shortBreakSliderValue = document.getElementById('shortTimeScrollValue');
    const longBreakSliderValue = document.getElementById('longTimeScrollValue');   
    
    focusSliderValue.value = formatTime(timeSettings.workTime).slice(0, -3);
    shortBreakSliderValue.value = formatTime(timeSettings.shortBreak).slice(0, -3);
    longBreakSliderValue.value = formatTime(timeSettings.longBreak).slice(0, -3);

    focusSliderValue.previousElementSibling.querySelector('output').textContent = focusSliderValue.value;
    shortBreakSliderValue.previousElementSibling.querySelector('output').textContent = shortBreakSliderValue.value;
    longBreakSliderValue.previousElementSibling.querySelector('output').textContent = longBreakSliderValue.value;
    
});

// Modes script functions

const focusMode = () => {
    displayTimer.textContent = formatTime(timeSettings.workTime);
    timeLeft = timeSettings.workTime;
    buttonPressed = 1;
    
    focusBackground();
    swapFavicon(buttonPressed);
}

const shortBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.shortBreak);
    timeLeft = timeSettings.shortBreak;
    buttonPressed = 2;
    shortBreakBackground();
    swapFavicon(buttonPressed);
}

const longBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.longBreak);
    timeLeft = timeSettings.longBreak;
    buttonPressed = 3;
    longBreakBackground();
    swapFavicon(buttonPressed);
}

// -- Button Timer Script -- 

// Event Delegation for break control buttons
document.getElementById('sectionBreakController').addEventListener('click', (event) => {
    // It ensures that a buttons is being clicked
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;

        // Logic for each button based on the ID
        switch (buttonId) {
            case 'buttonFocus':
                focusMode();
                updateTimerTitleDisplay(buttonPressed);

                isRunning && document.getElementById('buttonPlayPause').click(); // If the user changes the mode while the time is running, it will stop
                break;
            case 'buttonShortBreak':
                shortBreakMode();
                updateTimerTitleDisplay(buttonPressed);

                isRunning && document.getElementById('buttonPlayPause').click();
                break;
            case 'buttonLongBreak':
                longBreakMode();
                updateTimerTitleDisplay(buttonPressed);

                isRunning && document.getElementById('buttonPlayPause').click();
                break;
        }
    }
});

// Variables for time running
let timerId = null; // Used for stopping the setInterval()

let pomodoroCounter = 0; // It will count how many pomodoro has been finished

// Function responsible for check how many pomodoro has been finished
const swapMoodMode = (pomodoroFinished) => {
    if (buttonPressed == 1 && pomodoroFinished == 3) {
        pomodoroCounter = 0;
        buttonPressed = 3;
        longBreakMode();

    } else if (buttonPressed == 1 && pomodoroFinished !== 3) {
        buttonPressed = 2;
        shortBreakMode();

    } else if (buttonPressed == 2 || buttonPressed == 3) {
        buttonPressed = 1;
        focusMode();
    }
}

// -- Timer starter script --
const toggleTimer = document.getElementById('buttonPlayPause').addEventListener("click", () => {
    if (buttonPressed == 0) {
        window.alert('Please, select a mode');
    } else {
        if (isRunning) {
            // Pausing
            clearInterval(timerId);
            timerId = null;
            isRunning = false;

            swapPlayerDisplay(isRunning);
            hideSettings(isRunning);
            playMusic(isRunning, isMuted, buttonPressed);
        } else {
            // Starting
            isRunning = true;
            swapPlayerDisplay(isRunning);
            hideSettings(isRunning);
            playMusic(isRunning, isMuted, buttonPressed);

            timerId = setInterval(() => {
            timeLeft--; // Remove 1 second
            displayTimer.textContent = formatTime(timeLeft);
            updateTimerTitleDisplay(buttonPressed);
            
            // When time's up
            if (timeLeft <= 0) {
                isRunning = false;
                clearInterval(timerId);
                timerId = null;

                swapPlayerDisplay(isRunning);
                hideSettings(isRunning);
                // Pomodoro will be marked as finished only when it is in focusMode
                buttonPressed == 1 && (pomodoroCounter++);
                swapMoodMode(pomodoroCounter);
                playTransitionSound(isMuted);
                document.getElementById('buttonPlayPause').click(); // It will automatically start the timer when it finishes
            }
        }, 1000);
    }
    }

});