// Variables
const tasktxt = document.querySelector('#newTask-txt');
let listSection = document.querySelector('#theList');

// Add a new task written in the textbox
document.querySelector('#addTask').addEventListener('click', () => {
    if (tasktxt.value === "") { // it alerts when the input is empty
        window.alert("Please, add a task")
    } else {
        // new task addition
        // add the task name in a <li> tag
        let newTask = document.createElement('li');
        newTask.textContent = tasktxt.value;

        // Add <label> tag
        let newLabel = document.createElement('label');

        // Add <input> tag with its attributes
        let newisDone = document.createElement('input');
        newisDone.type = 'checkbox';
        newisDone.name = 'doneOrNot';

        // Add text 'done' to label
        // createTextNode() will save a text to be used when using a node insertion,
        // such as appendChild(), different from .textContent that replace the whole tag content
        const labelText = document.createTextNode(' done');

        //Creating HTML structure
        newLabel.appendChild(newisDone);
        newLabel.appendChild(labelText);
        newTask.appendChild(newLabel); // <li> will receive <label>'s text and checkbox in once

        // Adding to <ul>
        listSection.appendChild(newTask);
    }
});