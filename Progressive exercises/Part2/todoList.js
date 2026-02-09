// Object/Array Data
const list = [
    {task: "Make Coffe", done: false},
    {task: "Clean House", done: false},
    {task: "Practice JS", done: true}
];

// Saving Objects/Array with JSON
// JSON.stringify() gets the object/array and add quotation marks properly, than localStorage can accept the data
const saveList = JSON.stringify(list);

localStorage.setItem('myList', saveList);

//Getting Object/Array with JSON
const liststorageData = localStorage.getItem('myList');
const recoveredList = JSON.parse(liststorageData);

