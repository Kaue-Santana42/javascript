function daytime() {
    var msg = document.getElementById('msg')
    var img = document.getElementById('image')
    var date = new Date()
    var hour = date.getHours()

    msg.innerHTML = `Now it is ${hour} hours.`
    if (hour >= 0 && hour < 12) {
        //morning
        img.src = 'midia/morning.png'
        document.body.style.background = '#ffbc63'
    } else if (hour >= 12 && hour < 18) {
        //afternoon
        img.src = 'midia/afternoon.png'
        document.body.style.background = '#813b71'
    } else {
        //night
        img.src = 'midia/Night.png'
        document.body.style.background = '#171d35'
    }
}

