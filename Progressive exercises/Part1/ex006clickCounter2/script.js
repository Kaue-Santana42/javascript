
const outputCounter = document.querySelector('#counter');
const increaseBtn = document.querySelector('#increase-btn');
const resetBtn = document.querySelector('#reset-btn');

let count = 0;

// Arrow Functions
// Update the screen (reusable function)
const updateDisplay = () => {
    outputCounter.textContent = count; // innerHTML handles HTML markup and can render elements, while textContent treats everything as plain text, making it safer and more performant for manipulating text only. 
    
    outputCounter.style.color = count > 10 ? '#e74c3c' : '#4a90e2'; // Visual effect: change counter color if is greater than 10
    
};

increaseBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});