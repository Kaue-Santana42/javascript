
// HTML elements selection
let tasktxt = document.querySelector('#newTask-txt');
let taskListUI = document.querySelector('#task-list');

// --Local storage section--

// Load from localStorage
// returns [] if it is empty
const loadTasks = () => {
    const listSaved = localStorage.getItem('savedList');
    return listSaved ? JSON.parse(listSaved) : []; // When empty, returns null, being false
}

// Save in localStorage
// This function will only take the array and "write" into the disk
const syncStorage = (tasks) => {
    localStorage.setItem('savedList', JSON.stringify(tasks));
}

// -- HTML update codes --

// Render the screen
// This function will clean the list in the HTML and rebuild based on the array
const renderTasks = (tasks) => {
    taskListUI.innerHTML = ""; // Clean to not duplicate

    // it will create a <li> for each object inside the array userTasks
    tasks.forEach((item, index) => { 
        const li = document.createElement('li');

        // Internal structure
        // the id for each checkbox will be task + the index number
        // Each <li> will have a function that receives the task assign to object arrays
        li.innerHTML = `
            <input type="checkbox" id="task${index}" onchange="isTaskDone(${index})" ${item.doneOrNot ? 'checked' : ''}>
            <span>${item.task}</span>
            <button onclick="removeTask(${index})">Delete</button>
        `;

        taskListUI.appendChild(li);
    });
};

// Load the localStorage of the user
let userTasks = loadTasks();

// Display the task list when the page loads
window.addEventListener("load", renderTasks(userTasks));

// - Buttons, checkboxes etc -
// Check if the check is done or not and change inside the object
const isTaskDone = (boxIndexNumber) => {
    let checkbox = document.querySelector(`#task${boxIndexNumber}`);

    if (checkbox.checked == true) {
        userTasks[boxIndexNumber].doneOrNot = true;
        syncStorage(userTasks);
    } else {
        userTasks[boxIndexNumber].doneOrNot = false;
        syncStorage(userTasks);
    }
}

// When the button is pressed, update the user task, save it, and display it
const addNewTask = document.querySelector('#addTask').addEventListener("click", () => {

    if (tasktxt.value === "") { // it alerts when the input is empty
        window.alert("You must add a task!");
    } else {
        let currentTask = {};
        currentTask.task = tasktxt.value;
        currentTask.doneOrNot = false;

        userTasks.push(currentTask); // Add the new task into the task list array
        syncStorage(userTasks); // Save the new item
        renderTasks(userTasks); // Display the tasks
    }  
});


const removeTask = (boxIndexNumber) => {
    
}