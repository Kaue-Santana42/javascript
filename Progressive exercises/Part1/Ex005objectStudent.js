console.log("=".repeat(15));
console.log("Object 'Student'");
console.log("=".repeat(15));

// Arrow Functions
const showStudentInfo = (studentName, studentAge, studentState) => console.log(`The student ${studentName} has ${studentAge} and it is ${studentState}`);

// Checks if the name's form was canceled, or if it was left blank, or if a number was typed
const checkName = (inputName) => inputName !== null && inputName.trim() !== "" && !isFinite(inputName);
// Checks if the age's form was canceled, left blank, and if it is a number
const checkAge = (inputAge) => inputAge !== null && inputAge.trim() !== "" && isFinite(inputAge);
// Check if is registered, return true if yes, false if not
const checkRegisteredAnswer = (inputRegistered) => inputRegistered === "yes" ? true : false;


// -- Main Code --
let student = new Object();
let isNameValid = false;
let isAgeValid = false;

// Check if name is valid
do {
    student.name = prompt("Enter the student's name: ");
    isNameValid = checkName(student.name);

    if (!isNameValid) {
        console.log("Please, enter a name (this form can not be blank or a number)")
    }
} while(!isNameValid)

// Check if age is valid
do {
    student.age = prompt("Enter the student's age: ");
    isAgeValid = checkAge(student.age);

    if (!isAgeValid) {
        console.log("Please, enter only numbers for age (this form can not be blank)")
    }
} while (!isAgeValid);

// Check if answer of register is valid
let isAnswerValid = false;

do {
    let registeredAnswer = prompt("Is the student registered? (yes or no): ");

    if (registeredAnswer === null || registeredAnswer.trim() === "") { // Check if the form is empty or if it was canceled
        console.log("Please, write strictly 'yes' or 'no' (this form can not be blank)");
        continue;
    }

    registeredAnswer = registeredAnswer.toLowerCase().trim();

    if (registeredAnswer === "no" || registeredAnswer === "yes") {
        student.isRegistered = checkRegisteredAnswer(registeredAnswer); // return true if is registered
        isAnswerValid = true;
    } else {
        console.log("Please, write strictly 'yes' or 'no'"); // Continue until provide answer yes or no
    }

} while(!isAnswerValid);

showStudentInfo(student.name, student.age, student.isRegistered);

