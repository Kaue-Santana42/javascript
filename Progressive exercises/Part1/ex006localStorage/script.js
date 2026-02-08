
const outputCounter = document.querySelector('#counter');
const increaseBtn = document.querySelector('#increase-btn');
const resetBtn = document.querySelector('#reset-btn');

// First, try load the value of localStorage when it starts
// if returns null (first time), assign 0
let count = Number(localStorage.getItem('savedCount')) || 0;

// Update the screen (reusable function)
const updateDisplay = () => {
    outputCounter.textContent = count;

    localStorage.setItem('savedCount', count); // Each update will be saved
    
    outputCounter.style.color = count > 10 ? '#e74c3c' : '#4a90e2';
    
};

updateDisplay(); // Starts the display with the value from storage

increaseBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});