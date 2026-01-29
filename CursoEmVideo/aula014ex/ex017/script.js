function generate(){
    let number = document.querySelector('input#txtNumber')
    let res = document.querySelector('textarea#boxRes')
    let tab = document.querySelector('select#seltab')
    
    if(number.value.length == 0) {
        alert('Please, insert a valid number')
    } else {
        let trueNumber = Number(number.value)
        let c = 1
        res.innerHTML = ''
        tab.innerHTML = ''
        
        
    for(; c <= 10; c++) {
        let times = c*trueNumber

        res.innerHTML += `${trueNumber} x ${c} = ${times} \n`
    }
    
    c = 1

    while(c <= 10) {
        let item = document.createElement('option')
        item.value = `tab${c}` // Each option will receive a value

        item.text = `${trueNumber} x ${c} = ${trueNumber*c}`
        tab.appendChild(item) // Will add an element/text as a child of tab
        c++
    }
    }
}
