let num = [5, 8, 2, 9, 3]
num[5] = 7
num.push(1)

console.log(`Our vector is: ${num}`)
console.log(`The first element is: ${num[0]}`)
console.log(`The vector in ascending order is: ${num.sort()}`)
console.log(`Our vector has ${num.length} elements`)

let pos = num.indexOf(8)
if (pos == -1) {
    console.log(`The value was not found`)
} else {
    console.log(`The value is in ${pos} position`)
}

