'use strict'

let rounds = 16;
let key = 'кукушка'
let text = 'Ввести свой текст'
let block = []
let keyPos = 0

if (text.length % 2 != 0) {
    text = text + ' '
}


for (let i = 0; i < text.length; i += 2) {
    block.push(text.slice(i, i + 2))
}


function encryption(left, right, keyPos) {
    let end;
    for (let i = 0; i < rounds; i++) {
        // console.log(key);
        let k = (key[keyPos % key.length]).charCodeAt()
        let temp = right ^ (left ^ k);
        right = left
        left = temp
        keyPos++
        end = (String.fromCharCode(right) + String.fromCharCode(left))

    }

    return [end, keyPos]

}

let shifr = []
block.forEach(x => {
    [block, keyPos] = encryption(x[0].charCodeAt(), x[1].charCodeAt(), keyPos)
    shifr.push(block)
})

console.log("Зашифрованный текст: ");
console.log(shifr.join(''))

function decryption(left, right, keyPos) {
    let end;

    for (let i = 0; i < rounds; i++) {
        let k = (key[keyPos % key.length]).charCodeAt()
        let temp = right ^ (left ^ k);
        right = left
        left = temp
        keyPos--
        end = (String.fromCharCode(left) + String.fromCharCode(right))
    }
    return [end, keyPos]

}

let deshifr = [];
shifr.reverse()
keyPos--;

shifr.forEach(x => {
    [block, keyPos] = decryption(x[0].charCodeAt(), x[1].charCodeAt(), keyPos)
    deshifr.push(block)
})

console.log('Расшифровка');

let reverseStr = deshifr.join('')
let decryptStr = reverseStr.split('').reverse().join('');

console.log(decryptStr);
