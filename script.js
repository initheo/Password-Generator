const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const strengthMeterEl = document.querySelector('.strength-meter')
const weakEl = document.querySelector('.indicator .weak')
const mediumEl = document.querySelector('.indicator .medium')
const strongEl = document.querySelector('.indicator .strong')
const strengthTextEl = document.querySelector('.strength-text')
const regExpWeak = /[a-z]/
const regExpMedium = /\d+/
const regExpStrong = /[!@#$%^&*(){}[\]=<>/,.]/
const regExpUpper = /[A-Z]/

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

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    resultEl.innerText = password
    
    if (password) {
        checkPasswordStrength(password)
    } else {
        strengthMeterEl.classList.remove('visible')
    }
})

function checkPasswordStrength(password) {
    weakEl.classList.remove('active')
    mediumEl.classList.remove('active')
    strongEl.classList.remove('active')
    strengthTextEl.classList.remove('weak', 'medium', 'strong')
    
    strengthMeterEl.classList.add('visible')
    
    
    let score = 0

    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (regExpWeak.test(password)) score++
    if (regExpUpper.test(password)) score++
    if (regExpMedium.test(password)) score++
    if (regExpStrong.test(password)) score++
    
    let strengthLevel
    if (score <= 2) {
        strengthLevel = 1 
    } else if (score <= 4) {
        strengthLevel = 2 
    } else {
        strengthLevel = 3 
    }
    
    if (strengthLevel >= 1) {
        weakEl.classList.add('active')
        strengthTextEl.textContent = 'Weak Password'
        strengthTextEl.classList.add('weak')
    }
    
    if (strengthLevel >= 2) {
        mediumEl.classList.add('active')
        strengthTextEl.textContent = 'Medium Password'
        strengthTextEl.classList.remove('weak')
        strengthTextEl.classList.add('medium')
    }
    
    if (strengthLevel >= 3) {
        strongEl.classList.add('active')
        strengthTextEl.textContent = 'Strong Password'
        strengthTextEl.classList.remove('medium')
        strengthTextEl.classList.add('strong')
    }
}

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}