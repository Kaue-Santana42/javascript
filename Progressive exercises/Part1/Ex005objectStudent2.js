console.log("=".repeat(15));
console.log("Object 'Student'");
console.log("=".repeat(15));

// -- Validation Functions (Arrow Functions) --
const checkName = (name) => name !== null && name.trim() !== "" && !isFinite(name);
const checkAge = (age) => age !== null && age.trim() !== "" && isFinite(age);
const checkYesNo = (answer) => answer === "yes" || answer === "no";

// Function that receive the full object and decides the phrase
const formatStudentPhrase = (studentObj) => {
    const status = studentObj.isRegistered === "yes" ? "Active" : "Inactive";
    return `Student: ${studentObj.name} | Age: ${studentObj.age} | Status: ${status}`;
};

// -- Main Code --

let schoolDatabase = []; // List to save several students
let wantToContinue = true;

while (wantToContinue) {
    let currentStudent = {}; // Empty object for current student

    // 1. Colects and validates the name
    let name;
    do {
        name = prompt("Enter the student's name: ");
        if (!checkName(name)) {
            console.log("Invalid name! Use letters only.");
        }
    } while (!checkName(name))
    currentStudent.name = name.trim();

    // 2. Colects and validates the age
    let age;
    do {
        age = prompt(`Enter ${currentStudent.name}'s age: `);
        if(!checkAge(age)) {
            console.log("Invalid age! Use numbers only. ");
        }
    } while(!checkAge(age))
    currentStudent.age = Number(age);

    // 3. Colects and validates register
    let registered;
    do {
        registered = prompt("Is the student registered? (yes/no)");

        if (registered === null) { // Check if cancel button was pressed
            console.log("This form can not be blank, answer only 'yes' or 'no'");
            continue;
        }

        registered = registered.toLowerCase().trim() // Turn string to lowercase without spaces

        if (!checkYesNo(registered)) {
            console.log("Please answer 'yes' or 'no'.");
        }
    } while (!checkYesNo(registered));
    currentStudent.isRegistered = registered;

    // Add the filled object to the array (data base)
    schoolDatabase.push(currentStudent);

    // Asks if want to add another
    let next;
    do {
        next = prompt("Add another student? (yes/no)");

        if (next === null) { // Check if cancel button was pressed
            console.log("This form can not be blank, answer only 'yes' or 'no'");
            continue;
        }

        next = next.toLowerCase().trim(); // Turn string to lowercase without spaces

        if (!checkYesNo(next)) {
            console.log("Please answer 'yes' or 'no'.");
        }
    } while(!checkYesNo(next));

    
    if (next === "no") {
        wantToContinue = false;
    }
}

// Final output
console.log("\n-- Final Report --");
schoolDatabase.forEach(student => {
    console.log(formatStudentPhrase(student));
});

console.log(`Total students registered: ${schoolDatabase.length}`);