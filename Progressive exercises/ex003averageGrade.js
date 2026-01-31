console.log("=".repeat(15));
console.log("Average Grade");
console.log("=".repeat(15));

let allGrades = [];
let stopAnswer;
let isNumberValid = false;

do {
    // Valid if is a number
    do {
        let inputGrade;
        isNumberValid = false; // Reset the isNumberValid state

        inputGrade = prompt("Write a grade to be added: ");

        if (inputGrade !== null && isFinite(inputGrade) && inputGrade.trim() !== "") { // Check if it is a number and without blank input or cancel the operation
            allGrades.push(Number(inputGrade));
            isNumberValid = true;
        } else {
            console.log("Please, type a number and without space");
        }
        
    } while (!isNumberValid); // Code continues while user gives wrong answers

    // Valid yes or no answer
        let isAnswerValid = false

    do {
        stopAnswer = prompt("Would you like to add another grade? (yes or no): ");

        if (stopAnswer === null ) { // Cancel button will be considered a 'no' answer
            stopAnswer = "no";
            isAnswerValid = true;
        } else {
            stopAnswer = stopAnswer.toLowerCase().trim(); // Remove spaces and convert the answer to lowercase
            
            if (validAnswer(stopAnswer)) { // Check if the answer is yes or no strictly
                isAnswerValid = true
            }     
        }

        
    } while (!isAnswerValid); // Continues ultil write yes or no

} while (stopAnswer === "yes");

averageGrade(allGrades)



// Functions

// Calculates the average grade
function averageGrade(allGrades) {

    let totalOfGrades = allGrades.length; // Check array length
    let sumGrade = 0;

    for (let i = 0; i < totalOfGrades; i++) {
        sumGrade += allGrades[i]; // sumGrade will be the sum of each array number
    }

    let averageGrade = sumGrade / totalOfGrades; // The average will be calculated
    console.log(`The average grade of the grades [${allGrades.join(", ")}] is ${+averageGrade.toFixed(1)}`);
}

// Check if answer will be yes or no, other input will not validate
function validAnswer(answer) {
    if (answer === "yes" || answer === "no") {
        return true;
    } else {
        console.log("Please, write strictly 'yes' or 'no'");
        return false;
    }
}

