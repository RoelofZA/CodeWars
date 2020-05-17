function nextHigher(n) {
    var strBits = (n).toString(2);
    var last = strBits.lastIndexOf('0', strBits.lastIndexOf('1'));

    if (last == -1)
        return parseInt(('10' + strBits.substring(1, strBits.length).split('').reverse().join('')).split('').join(''), 2);
    else
        return parseInt((strBits.substring(0, last) + '10' + strBits.substring(last + 2, strBits.length).split('').reverse().join('')).split('').join(''), 2);
}


console.log(nextHigher(128), 256);
console.log(nextHigher(1), 2);
console.log(nextHigher(1022), 1279);
console.log(nextHigher(127), 191);
console.log(nextHigher(1253343), 1253359);