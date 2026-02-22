
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
        const label = document.createElement('label');
        label.classList.add('tasks-added');

        const li = document.createElement('li');
        // Internal structure
        // Each <li> will have a function that receives the task assign to object arrays

        // checkbox attributes
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = "checkbox";
        inputCheckbox.classList.add('task-checkbox');
        inputCheckbox.id = `task${index}`; // the id for each checkbox will be task + the index number
        inputCheckbox.onchange = () => isTaskDone(index);
        inputCheckbox.checked = item.doneOrNot ? true : false;

        // <span> for fontawesome
        const spanIcon = document.createElement('span');
        spanIcon.classList.add('done-icon');
        spanIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
        // <span> text attributes
        const spanTaskInput = document.createElement('span');
        spanTaskInput.textContent = item.task;
        spanTaskInput.id = `task-txt${index}`;

        // <span> text css class
        spanTaskInput.classList.add('task-text');

        // <button> attributes
        const buttonDelete = document.createElement('button');
        buttonDelete.onclick = () => removeTask(index);
        buttonDelete.id = `deleteTask${index}`;
        buttonDelete.classList.add('delete-button');
        buttonDelete.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

        label.append(inputCheckbox, spanIcon);
        li.append(spanTaskInput,label, buttonDelete);
        taskListUI.appendChild(li);
    });
};

// Load the localStorage of the user
let userTasks = loadTasks();

// Display the task list when the page loads
window.addEventListener("load", () => renderTasks(userTasks));

// - Buttons, checkboxes etc -
// Check if the check is done or not and change inside the object
const isTaskDone = (boxIndexNumber) => {
    let checkbox = document.querySelector(`#task${boxIndexNumber}`);

    userTasks[boxIndexNumber].doneOrNot = checkbox.checked; //checkbox.checked return value 'true' or 'false' when pressed

    // task is crossed out when done and it color changes
    let spanDone = document.querySelector(`#task-txt${boxIndexNumber}`);

    if (userTasks[boxIndexNumber].doneOrNot) {
        spanDone.classList.add('crossed');
        spanDone.style.color = "var(--buttonDoneColor)";
    } else {
        spanDone.classList.remove('crossed');
        spanDone.style.color = "initial";
    }

    syncStorage(userTasks);
    
}

// When the button is pressed, update the user task, save it, and display it
const addNewTask = document.querySelector('#addTask').addEventListener("click", () => {

    if (tasktxt.value === "") { // it alerts when the input is empty
        window.alert("You must add a task!");
    } else if ((tasktxt.value).length > 30) {
        window.alert("The task can not has more than 30 characters")
        tasktxt.value = "";
    } else {
        let currentTask = {};
        currentTask.task = tasktxt.value;
        currentTask.doneOrNot = false;

        userTasks.push(currentTask); // Add the new task into the task list array
        syncStorage(userTasks); // Save the new item
        renderTasks(userTasks); // Display the tasks

        tasktxt.value = ""; // Clean the input
        tasktxt.focus(); // Focus on input after add a task
    }
});

// When the user press 'enter', addNewTask button will be triggered
tasktxt.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector('#addTask').click();
    }
});

const removeTask = (boxIndexNumber) => {
    
    if (boxIndexNumber > -1) {
        // splice() will remove an item from an array, first parameter it's the position to start, and the second how many item wants to remove
        userTasks.splice(boxIndexNumber, 1);
        syncStorage(userTasks);
        renderTasks(userTasks);
    }
}