let num = document.querySelector('input#fnum')
let list = document.querySelector('select#flist')
let res = document.querySelector('div#res')
let values = []

function isNumber(n) {
    if(Number(n) >= 1 && Number(n) <= 100) {
        return true
    } else {
        return false
    }
}

function inList(n, l) {
    if (l.indexOf(Number(n)) == -1) {
        return true
    } else {
        return false
    }
}

function add() {
    if(isNumber(num.value) && inList(num.value, values)) {
        values.push(Number(num.value))

        let item = document.createElement('option')
        item.text = `The value ${num.value} has been added`

        list.appendChild(item)
        res.innerHTML = ''
    } else {
        alert('Invalid value or already found in the list')
    }
    num.value = ''
    num.focus()
}

function finish() {
    if (values.length == 0) {
        alert('Add a number before start')
    } else {
        let tot = values.length
        let great = values[0]
        let small = values[0]
        let sum = 0
        let aver = 0

        for (let pos in values) {
            sum += values[pos]
            if (values[pos] > great) 
                great = values[pos]
            if (values [pos] < small)
                small = values[pos]
        }
        aver = sum / tot

        res.innerHTML = ''
        res.innerHTML += `<p>In total, we have ${tot} registered numbers</p>`
        res.innerHTML += `<p>The greatest value registered was ${great}</p>`
        res.innerHTML += `<p>The smallest value registered was ${small}</p>`
        res.innerHTML += `<p>Adding all values, we have ${sum}</p>`
        res.innerHTML += `<p>The average of all values is ${aver}</p>`
    }
    
}
