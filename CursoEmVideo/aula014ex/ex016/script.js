function toCount(){
    let begin = document.querySelector('input#numbegin')
    let end = document.querySelector('input#numend')
    let pace = document.querySelector('input#numpace')
    let res = document.querySelector('div#res')

    if(begin.value.length == 0 || end.value.length == 0 || pace.value.length == 0) { // checks if some input is empty
        window.alert('[ERROR] It is left some datas! ')
        res.innerHTML = 'Impossible to Count!'
    } else {
        res.innerHTML = 'Counting: <br>'
        let b = Number(begin.value) // It is important to use 'Number()' when taking number on the document
        let e = Number(end.value)
        let p = Number(pace.value)

        if (p == 0) {
            window.alert('The pace must not be 0, considering PACE 1')
            pace.value = 1
            p = 1
        }

        if (b < e) { //Counting up
            for(;b <= e; b += p) { 
            res.innerHTML += `${b} \u{1F449} `
        } //The first expression of the 'for' loop was omitted, but i believe is a good  practice declare a counter.
        } else {
            for(;b >= e; b -= p) { //Countdown
                res.innerHTML += `${b} \u{1F449} `
            }
        }

        res.innerHTML += `\u{1F3C1}`
    }
    
}
