console.log("=".repeat(15));
console.log("Multiplication Table");
console.log("=".repeat(15));

let inputNumber;
let isValid = false;

do {
    inputNumber = prompt("Type a number to check its time table: ");

    if (inputNumber !== null && isFinite(inputNumber) && inputNumber.trim() !== "") { // Check if it is a number and without blank input or cancel the operation
        timeTable(Number(inputNumber));
        isValid = true;
    } else {
        console.log("Please, type a number and without space");
    }
} while (!isValid); // Code continues while user gives wrong answers

// Functions

function timeTable(number) {
    for (let i = 1; i <= 10; i++) { // It uses 'for' loop to make the time table
        console.log(`${number} x ${i} = ${number*i}`);
    }
}

