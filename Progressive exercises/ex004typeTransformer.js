console.log("=".repeat(15));
console.log("Type Transformer");
console.log("=".repeat(15));

let inputValue;
let isAnswerValid = false;

console.log("Write a number to be summed by 10");

do {
    inputValue = 0; // Resets variable state

    inputValue = prompt("What number do you chose?: ");
    isAnswerValid = checkInput(inputValue); // checks cancel button or blank answer

    if (!isAnswerValid) { 
        console.log("Please, type, at least, a number and without space");
    } else {
        isAnswerValid = false; // resets variable state in case of the input is letters
        inputValue = checkNumber(inputValue); // Check the input, returning NaN if it is not a number

        if (isNaN(inputValue) === true) { // Check if the return was NaN
            console.log(`The value typed is ${inputValue} (not a number), please, enter a number value.`);
        } else {
            isAnswerValid = true; // The loop is closed
            let sum = inputValue + 10;
            console.log(sum);
        }
    }
    
} while (!isAnswerValid);

// functions

function checkNumber(userInput) {
    if (isFinite(userInput)) { // Check if input is number, tranforming into a number an return it
        userInput = Number(userInput);
        return userInput;
    } else { // otherwise, returns NaN
        userInput = NaN;
        return userInput;
    }
}

function checkInput(userInput) { // Check if the cancel button was pressed or if the answer is blank
    if (userInput !== null && userInput.trim() !== "") {
        return true;
    } else {
        return false;
    }
}