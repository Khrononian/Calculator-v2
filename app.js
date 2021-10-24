

const btns = document.querySelectorAll('.btns');
const display = document.querySelector('.operation-display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal')
const sign = document.querySelector('.sign')
let firstValue = '';
let secondValue = '';
let operation = '';
let savedOperation = ''
let calculated = false;
let operationSelect = false;

btns.forEach((x) => x.addEventListener('click', showDisplays));
equal.addEventListener('click', calculateNumbers)
clear.addEventListener('click', clearOperations)
sign.addEventListener('click', changeNumberSign)

function calculateNumbers() {
    console.log('Calculate', Number(firstValue), Number(secondValue))

    if (Number(firstValue) && Number(secondValue) && operation === '/') {
        display.innerText = divide(firstValue, secondValue)
        firstValue = divide(firstValue, secondValue)
        secondValue = ''
        calculated = true
    }
    if (Number(firstValue) && Number(secondValue) && operation === 'X') {
        display.innerText = multiply(firstValue, secondValue)
        firstValue = multiply(firstValue, secondValue)
        secondValue = ''
        calculated = true
    }
    if (Number(firstValue) && Number(secondValue) && operation === '-') {
        display.innerText = subtract(firstValue, secondValue)
        firstValue = subtract(firstValue, secondValue)
        secondValue = ''
        calculated = true
    }
    if (Number(firstValue) && Number(secondValue) && operation === '+') {
        display.innerText = add(Number(firstValue), Number(secondValue))
        firstValue = add(Number(firstValue), Number(secondValue))
        secondValue = ''
        calculated = true
    }
}

function showDisplays(event) {
  console.log(event.target.dataset, firstValue, Number(event.target.innerText));
  
    if (display.innerText === '0' && firstValue === '' && Number(event.target.innerText)) {
        display.innerText = event.target.innerText
        firstValue = event.target.innerText
        console.log('First Values')
    } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === false && display.innerText !== '0') {
        display.innerText += event.target.innerText
        firstValue += event.target.innerText
        console.log('Length', display.innerText.length, firstValue)
    }
    if (!display.innerText.includes('.') && event.target.dataset.operation === 'decimal' && display.innerText == '0') {
        display.innerText += `${event.target.innerText}`
        firstValue += `0${event.target.innerText}`
        console.log('Decimal', firstValue)
    } else if (display.innerText !== '0' && !display.innerText.includes('.') && event.target.dataset.operation === 'decimal' ) {
        display.innerText += event.target.innerText
        firstValue += `0${event.target.innerText}`
    }
    if (event.target.dataset.operation == 'add' || event.target.dataset.operation == 'subtract' || event.target.dataset.operation == 'divide' || event.target.dataset.operation == 'multiply') {
        operation = event.target.innerText;
        operationSelect = true;
        console.log('Operations', operation, savedOperation)
        if (display.innerText == '0') firstValue = '0'
        if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '+') {
            display.innerText = add(parseInt(firstValue), parseInt(secondValue))
            firstValue = add(parseInt(firstValue), parseInt(secondValue))
            secondValue = ''
        }
        if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '-') {
            display.innerText = subtract(firstValue, secondValue)
            firstValue = subtract(firstValue, secondValue)
            secondValue = ''
        }
        if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '/') {
            display.innerText = divide(firstValue, secondValue)
            firstValue = divide(firstValue, secondValue)
            secondValue = ''
        }
        if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === 'X') {
            display.innerText = multiply(firstValue, secondValue)
            firstValue = multiply(firstValue, secondValue)
            secondValue = ''
        }
        savedOperation = event.target.innerText
    }
    if (operationSelect === true && secondValue === '' && Number(event.target.innerText)) {
        display.innerText = event.target.innerText
        secondValue = event.target.innerText

        console.log('Second Values')
    } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === true) {
        display.innerText += event.target.innerText
        secondValue += event.target.innerText

        console.log('Second Length', display.innerText.length, secondValue, operationSelect)
    }
    console.log('Values', firstValue, secondValue, operation)
}

function changeNumberSign() {
    if (Math.sign(display.innerText) !== -1 && operationSelect === false) {
        display.innerText = Number(-Math.abs(display.innerText))
        firstValue =  Number(-Math.abs(firstValue))
        console.log(Math.sign(display.innerText))
        console.log('Sign change', typeof firstValue, typeof display.innerText, operationSelect)
    } else if (operationSelect === false) {
        display.innerText = Number(Math.abs(display.innerText))
        firstValue = Number(Math.abs(firstValue))
        console.log('Positive Sign')
    }
    if (Math.sign(display.innerText) !== -1 && operationSelect === true) {
        display.innerText = Number(-Math.abs(display.innerText))
        secondValue = Number(-Math.abs(secondValue))
        console.log('Second Sign Change')
    } else if (operationSelect === true) {
        display.innerText = Number(Math.abs(display.innerText))
        secondValue = Number(Math.abs(secondValue))
        console.log('Second sign positive')
    }
}

function clearOperations () {
    firstValue = '';
    secondValue = '';
    operation = ''
    savedOperation = ''
    calculated = false;
    operationSelect = false;
    display.innerText = '0'
}

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}