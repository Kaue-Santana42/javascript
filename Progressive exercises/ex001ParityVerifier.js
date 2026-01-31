console.log('='.repeat(15));
console.log('Parity Verifier');
console.log('='.repeat(15));

let inputNumber;
let isValid = false;

do {
    inputNumber = prompt("Write a number: ");

    if (inputNumber !== null && isFinite(inputNumber) && inputNumber.trim() !== "") { // Check if it is a number and without blank input
        parityVerifier(Number(inputNumber)); // Explicitly convert the number
        isValid = true;
    } else {
        console.log("Please, type a number and without space");
    }
   
} while (!isValid); // Code continues while user gives wrong inputs

// Functions

function parityVerifier(number) { // Check if a number is odd or even using the remainder of the division
    if (number % 2 == 0) {
        console.log(`The ${number} is even`);
    } else {
        console.log(`The ${number} is odd`);
    }
}