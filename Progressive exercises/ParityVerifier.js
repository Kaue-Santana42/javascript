console.log('='.repeat(15));
console.log('Parity Verifier');
console.log('='.repeat(15));

do {
    var inputNumber = prompt("Write a number: ");

    if (isFinite(inputNumber) && inputNumber.trim() !== "") { // Check if it is a number and without blank input
        parityVerifier(inputNumber);
    } else {
        console.log("Please, type a number and without space");
    }
   
} while (isFinite(inputNumber) == false || (inputNumber.trim() !== "") == false); // Code continues while user gives wrong inputs

// Functions

function parityVerifier(number) { // Check if a number is odd or even using the remainder of the division
    if (number % 2 == 0) {
        console.log(`The ${number} is Odd`);
    } else {
        console.log(`The ${number} is even`);
    }
}