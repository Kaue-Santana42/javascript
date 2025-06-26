function verif() {
    var date = new Date()
    var year = date.getFullYear()
    var fYear = document.getElementById('txtyear')
    var res = document.querySelector('div#res')

    if(fYear.value.length == 0 || fYear.value > year) {
        alert('[ERROR] Verify the datas and try again!')
    } else {
        var fGender = document.getElementsByName('radgender')
        var age = year - Number(fYear.value)
        var gender = ''
        var img = document.createElement('img')

        img.setAttribute('id', 'photo')

        if (fGender[0].checked) {
            gender = 'Man'
            if (age >= 0 && age < 10) {
                // child
                img.setAttribute('src', 'midia/baby_boy.png')
            } else if (age >= 10 && age < 21){
                // young
                img.setAttribute('src', 'midia/young_man.png')
            } else if (age < 50) {
                // adult
                img.setAttribute('src', 'midia/adult_man.png')
            } else {
                // old
                img.setAttribute('src', 'midia/old_man.png')
            }
        } else if (fGender[1].checked) {
            gender = 'Woman'
            if (age >= 0 && age < 10) {
                // child
                img.setAttribute('src', 'midia/baby_girl.png')
            } else if (age >= 10 && age < 21){
                // young
                img.setAttribute('src', 'midia/young_woman.png')
            } else if (age < 50) {
                // adult
                img.setAttribute('src', 'midia/adult_woman.png')
            } else {
                // old
                img.setAttribute('src', 'midia/old_woman.png')
            }
        }
        res.style.textAlign = 'center'
        img.style.marginTop = '15px'
        res.innerHTML = `We've detected a ${gender} with ${age} years old`
        res.appendChild(img)
    }
}
