function logMap(map) {
    const temp = {}
    map.forEach((items, setName) => {
        temp[setName] = items
    })
    console.log(temp)
}