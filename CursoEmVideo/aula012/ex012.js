var now = new Date()
var hour = now.getHours()

console.log(`Now it is exactly ${hour} hours.`)

if (hour < 5 ) {
    console.log('Happy Sunrise')
} else if (hour < 12) {
    console.log('Good Morning!')
} else if (hour <= 18) {
    console.log('Good Afternoon!')
} else {
    console.log('Good Evening!')
}