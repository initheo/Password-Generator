const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const excludeAmbiguousEl = document.getElementById('exclude-ambiguous')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    const excludeAmbiguous = excludeAmbiguousEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length, excludeAmbiguous)
})

function generatePassword(lower, upper, number, symbol, length, excludeAmbiguous) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName](excludeAmbiguous)
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    // fallback without exclusion
    return getRandomLowerEx(false)
}

function getRandomUpper() {
    return getRandomUpperEx(false)
}

function getRandomNumber() {
    return getRandomNumberEx(false)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function getRandomLowerEx(excludeAmbiguous) {
    const ambiguous = new Set(['l'])
    while (true) {
        const char = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        if (!excludeAmbiguous || !ambiguous.has(char)) return char
    }
}

function getRandomUpperEx(excludeAmbiguous) {
    const ambiguous = new Set(['I', 'O'])
    while (true) {
        const char = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        if (!excludeAmbiguous || !ambiguous.has(char)) return char
    }
}

function getRandomNumberEx(excludeAmbiguous) {
    const ambiguous = new Set(['0', '1'])
    while (true) {
        const char = String.fromCharCode(Math.floor(Math.random() * 10) + 48)
        if (!excludeAmbiguous || !ambiguous.has(char)) return char
    }
}

// Adapter functions used by mapping to accept exclude flag
function getRandomLower(excludeAmbiguous) { return getRandomLowerEx(excludeAmbiguous) }
function getRandomUpper(excludeAmbiguous) { return getRandomUpperEx(excludeAmbiguous) }
function getRandomNumber(excludeAmbiguous) { return getRandomNumberEx(excludeAmbiguous) }

