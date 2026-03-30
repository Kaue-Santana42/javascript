// -- Get HTML elements --
const displayTimer = document.getElementById('theTimer');
const sidePanel = document.getElementById('settingsControlPanel');

// Global Variable
let timeLeft; 
let isRunning = false;
let isMuted = false;
// This variable will be useful to identify what was the last button pressed, 
// then the program will know if the display must be updated based on the mode.
let buttonPressed = 0;

// --- CSS Section ---

// Favicon Swapping
const favicons = {
    focus: "images/focus-icon.ico",
    short: "images/shortBreak-icon.ico",
    long: "images/longBreak-icon.ico"
};

const swapFavicon = (currentMode) => {
    const favicon = document.getElementById('favicon');
    switch (currentMode) {
        case 1:
            favicon.setAttribute("href", favicons.focus);
            break;
        case 2:
            favicon.setAttribute("href", favicons.short);
            break;
        case 3:
            favicon.setAttribute("href", favicons.long);
            break;
    }
};

// -- Settings Buttons --

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
};

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
};

// This function will swap the timer play Icon
const swapPlayerDisplay = (isRunning) => {
    const playIcon = document.getElementById('playPause');

    if (isRunning) {
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
};

// Changing background and buttons color according the mode
// Object responsible for the colors
const themes = {
    focus: {sec: '#6E3232', ter: '#C42727'},
    short: {sec: '#2E2E59', ter: '#2734C4'},
    long: {sec: '#251D3B', ter: '#6127C4'}
};
// Theme update's logic
const updateTheme = (colorSecondary, colorTertiary, sliderColor) => {
    const root = document.documentElement;
    const body = document.body;

    // Updates the background gradient
    body.style.setProperty('--background-color-two', colorSecondary);
    body.style.setProperty('--background-color-three', colorTertiary);

    // Updates the components' color (buttons and sliders)
    root.style.setProperty('--buttonColor', `#101010 0%, ${colorSecondary} 35%, ${colorTertiary} 100%`);
    root.style.setProperty('--asideSliderBorderColor', sliderColor);
};

// Function resposible for updating the visual pomodoro markers
const updateVisualMarkers = (count) => {
    const markers = document.querySelectorAll('.marker');

    markers.forEach((marker, index) => {
        if (index < count) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });
};

// --- Logic Section ---

// -- Storage Handler --

const syncSettingsStorage = (timeConfigured) => {
    localStorage.setItem('savedTimeSettings', JSON.stringify(timeConfigured));
};

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
};

// -- Sound Section --

const sounds = {
    focus: new Audio('sounds/focusMusic.mp3'),
    short: new Audio('sounds/shortBreakMusic.mp3'),
    long: new Audio('sounds/longBreakMusic.mp3'),
    transition: new Audio('sounds/transitionSound.mp3')
};

// Initial settings
Object.values(sounds).forEach(sound => {
    sound.loop = (sound !== sounds.transition); // All in loop, except transition
});

const stopAllMusic = () => {
    sounds.focus.pause();
    sounds.short.pause();
    sounds.long.pause();
};

// Start sound
const playMusic = (isRunning, isMuted, currentMode) => {
   stopAllMusic();

    if (!isRunning || isMuted) return;

    // Play the music based on the mode
    if(currentMode === 1) sounds.focus.play().catch(error => console.log("Error Playing: ", error));
    if(currentMode === 2) sounds.short.play().catch(error => console.log("Error Playing: ", error));
    if(currentMode === 3) sounds.long.play().catch(error => console.log("Error Playing: ", error));

    // play() returns a 'promise object', if doesn't work, catch() will intervene and catch the error, otherwise the code would stop with it. 
};

const playTransitionSound = (isMuted) => {
    stopAllMusic();
    
    if (!isMuted) sounds.transition.play().catch(error => console.log("Error Playing: ", error));
};

// -- Time Settings --

let timeSettings = loadSettingsStorage();

// -- Time formatter -- 
// Called when a button is pressed
const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

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
};

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
};

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

// Settings on the side panel will be showed according the user settings
const loadSliderSettingsDisplay = () => {
    const focusSliderValue = document.getElementById('focusTimeScrollValue');
    const shortBreakSliderValue = document.getElementById('shortTimeScrollValue');
    const longBreakSliderValue = document.getElementById('longTimeScrollValue');   
    
    focusSliderValue.value = formatTime(timeSettings.workTime).slice(0, -3);
    shortBreakSliderValue.value = formatTime(timeSettings.shortBreak).slice(0, -3);
    longBreakSliderValue.value = formatTime(timeSettings.longBreak).slice(0, -3);

    focusSliderValue.previousElementSibling.querySelector('output').textContent = focusSliderValue.value;
    shortBreakSliderValue.previousElementSibling.querySelector('output').textContent = shortBreakSliderValue.value;
    longBreakSliderValue.previousElementSibling.querySelector('output').textContent = longBreakSliderValue.value;
}

// It will start at the focus mode automatically
window.addEventListener('load', () => {
    focusMode();
    loadSliderSettingsDisplay();
});

// Modes script functions

const focusMode = () => {
    displayTimer.textContent = formatTime(timeSettings.workTime);
    timeLeft = timeSettings.workTime;
    buttonPressed = 1;
    
    updateTheme(themes.focus.sec, themes.focus.ter, themes.focus.ter);
    swapFavicon(buttonPressed);
};

const shortBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.shortBreak);
    timeLeft = timeSettings.shortBreak;
    buttonPressed = 2;
    
    updateTheme(themes.short.sec, themes.short.ter, themes.short.ter);
    swapFavicon(buttonPressed);
};

const longBreakMode = () => {
    displayTimer.textContent = formatTime(timeSettings.longBreak);
    timeLeft = timeSettings.longBreak;
    buttonPressed = 3;

    updateTheme(themes.long.sec, themes.long.ter, themes.long.ter);
    swapFavicon(buttonPressed);
};

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
    if (buttonPressed == 1 && pomodoroFinished == 4) {
        buttonPressed = 3;
        longBreakMode();

    } else if (buttonPressed == 1 && pomodoroFinished !== 4) {
        buttonPressed = 2;
        shortBreakMode();

    } else if (buttonPressed == 2 || buttonPressed == 3) {
        buttonPressed = 1;
        focusMode();

        if (pomodoroCounter == 4) { // The user will see the 4 pomodoro counters filled
            updateVisualMarkers(0);
            pomodoroCounter = 0;
        }
    }
};

// -- Timer starter script --
const handleTimerToggle = () => {
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
            clearInterval(timerId); // It ensures that the timerId was cleared

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
                playTransitionSound(isMuted);
                // Pomodoro will be marked as finished only when it is in focusMode
                buttonPressed == 1 && (pomodoroCounter++)
                updateVisualMarkers(pomodoroCounter);
                swapMoodMode(pomodoroCounter);
                updateTimerTitleDisplay(buttonPressed);
                handleTimerToggle(); // It will automatically start the timer when it finishes
            }
            }, 1000);
        }
    }
};

document.getElementById('buttonPlayPause').addEventListener("click", handleTimerToggle);