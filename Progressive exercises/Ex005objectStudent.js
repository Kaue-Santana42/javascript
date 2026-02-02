console.log("=".repeat(15));
console.log("Object 'Student'");
console.log("=".repeat(15));

// Arrow Functions
const showStudentInfo = (studentName, studentAge, studentState) => console.log(`The student ${studentName} has ${studentAge} and it is ${studentState}`);

// Checks if the name's form was canceled, or if it was left blank, or if a number was typed
const checkName = (inputName) => inputName !== null && inputName.trim() !== "" && !isFinite(inputName);


// Main Code
var student = new Object();
let isNameValid = false;


do {
    student.name = prompt("Enter the student's name: ");
    isNameValid = checkName(student.name);

    if (!isNameValid) {
        console.log("Please, enter a name (this form can not be blank or a number)")
    }
} while(!isNameValid)

student.age = prompt("Enter the student's age: ");
student.isRegistered = prompt("Is the student registered? (yes or no): ");

showStudentInfo(student.name, student.age, student.isRegistered);
