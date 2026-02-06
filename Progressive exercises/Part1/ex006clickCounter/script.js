let outputCounter = document.querySelector('div#counter');
let increase_btn = document.querySelector('button#increase-btn');
let reset_btn = document.querySelector('button#reset-btn');

let counter = 0;

increase_btn.addEventListener("click", increaseCounter);
reset_btn.addEventListener("click", resetCounter)


function increaseCounter() {
    counter += 1;
    outputCounter.innerHTML = counter;
}

function resetCounter(){
    counter = 0;
    outputCounter.innerHTML = counter;
}