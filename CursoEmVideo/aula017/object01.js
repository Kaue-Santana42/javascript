let friend = {
    name: 'Jose',
    sex: 'M',
    weight: 85.4,
    getfat(p=0){
        console.log('Got fat')
        this.weight += p
    }
}

friend.getfat(2)
console.log(`${friend.name} weight ${friend.weight}Kg`)