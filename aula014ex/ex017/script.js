function generate(){
    let number = document.querySelector('input#txtNumber')
    let res = document.querySelector('textarea#boxRes')
    
    if(number.value.length == 0) {
        alert('Please, insert a valid number')
    } else {
        let trueNumber = Number(number.value)
        res.innerHTML = ''
        
    for(c = 1; c <= 10; c++) {
        let times = c*trueNumber

        res.innerHTML += `${trueNumber} x ${c} = ${times} \n`
    }
    }
}
