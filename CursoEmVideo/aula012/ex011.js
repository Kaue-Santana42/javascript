var age = 11
console.log(`You have ${age} years old.`)
if (age < 16) {
    console.log('It does not vote')
} else if (age < 18 || age > 65)  {
        console.log('Optional vote')
    } else {
        console.log('Mandatory vote')
    }
