var array = []

function addNumber() {
    let inputnumber = document.querySelector('input#txtNumber')
    let num = Number(inputnumber.value)

    // Verify if the value is inside the array or if a invalid value was included
    if (num < 1 || num > 100 || array.indexOf(num) > -1) {
        alert('Invalid value or already found')
        inputnumber.value = ''
    } else {
        document.querySelector('div#res').innerHTML = ''
        array.push(num)

        let textBox = document.querySelector('textarea#boxAdd')
        textBox.innerHTML += `The number ${num} has been added \n`
        inputnumber.value = ''
    }
     
}

function toArray() {
    if (array.length == 0) {
        alert('Add a number before finishing')
    } else {
        array = array.sort(function(a, b){return a - b})
        // As only sort() function returns a invalid order, this comparative function compares two elements through a sum, If the result is negative, a is sorted before b.If the result is positive, b is sorted before a.

        let size = array.length
        let sum = 0
        
        for (let i = 0; i < size; i++) { //Sum values in an array
            sum += array[i]
        }
        
        
        let res = document.querySelector('div#res')
        res.innerHTML = `<p>In all, we have ${size} registered numbers</p>`
        res.innerHTML += `<p>The greatest number reported was ${array[size-1]}</p>`
        res.innerHTML += `<p>The smallest number reported was ${array[0]}</p>`
        res.innerHTML += `<p>The sum of all values is ${sum}</p>`
        res.innerHTML += `<p>The average of all values is ${sum / size}</p>`
    }
}
