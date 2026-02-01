console.log("=".repeat(15));
console.log("Type Transformer");
console.log("=".repeat(15));

// --- Functions with Arrow Functions ---

// Check if the input is valid (not null and not empty)
const checkInput = (input) => input !== null && input.trim() !== ""; // Return true or false through a logic comparison

// Converts to number or returns NaN
const checkNumber = (input) => isFinite(input) ? Number(input) : NaN; // Implicitly returns the value through the arrow functions

// Main code

let inputValue;
let isAnswerValid = false;

do {
    inputValue = prompt("What number do you choose to sum by 10?: ");

    if(!checkInput(inputValue)) {
        console.log("Please, type a number and avoid blanck spaces. ");
        continue; // It jumps back to the condition check, going to next interaction (restart loop until properly answer)
    }

    const numericValue = checkNumber(inputValue);

    if (isNaN(numericValue)) {
        console.log(`The value is ${inputValue} (not a number). Try again. `);
    } else {
        console.log(`Success: ${numericValue} + 10 = ${numericValue + 10}`)
        isAnswerValid = true;
    }

} while (!isAnswerValid);

