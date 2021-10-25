const btns = document.querySelectorAll('.btns');
const display = document.querySelector('.operation-display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const sign = document.querySelector('.sign');
let firstValue = '';
let secondValue = '';
let operation = '';
let savedOperation = '';
let calculated = false;
let operationSelect = false;

btns.forEach((x) => x.addEventListener('click', showDisplays));
equal.addEventListener('click', calculateNumbers);
clear.addEventListener('click', clearOperations);
sign.addEventListener('click', changeNumberSign);

function calculateNumbers() {
  if (Number(firstValue) && Number(secondValue) && operation === '/') {
    display.innerText = Number(Math.round(divide(firstValue, secondValue) * 1000) / 1000);
    firstValue = Number(Math.round(divide(firstValue, secondValue) * 1000) / 1000);
    secondValue = '';
    calculated = true;
  }
  if (Number(firstValue) && Number(secondValue) && operation === 'X') {
    display.innerText = Number(Math.round(multiply(firstValue, secondValue) * 1000) / 1000);
    firstValue = Number(Math.round(multiply(firstValue, secondValue) * 1000) / 1000);
    secondValue = '';
    calculated = true;
  }
  if (Number(firstValue) && Number(secondValue) && operation === '-') {
    display.innerText = subtract(firstValue, secondValue);
    firstValue = subtract(firstValue, secondValue);
    secondValue = '';
    calculated = true;
  }
  if (Number(firstValue) && Number(secondValue) && operation === '+') {
    display.innerText = add(Number(firstValue), Number(secondValue));
    firstValue = add(Number(firstValue), Number(secondValue));
    secondValue = '';
    calculated = true;
  }
}

function changeNumberSign() {
  if (Math.sign(display.innerText) !== -1 && operationSelect === false) {
    display.innerText = Number(-Math.abs(display.innerText));
    firstValue = Number(-Math.abs(firstValue));
  } else if (operationSelect === false) {
    display.innerText = Number(Math.abs(display.innerText));
    firstValue = Number(Math.abs(firstValue));
  } else if (operationSelect === true && Math.sign(display.innerText) !== -1 && secondValue === '') {
    display.innerText = Number(-Math.abs(display.innerText));
    firstValue = Number(-Math.abs(firstValue));
  } else if (operationSelect === true && secondValue === '') {
    display.innerText = Number(Math.abs(display.innerText));
    firstValue = Number(Math.abs(firstValue));
  }
  if (Math.sign(display.innerText) !== -1 && operationSelect === true && secondValue !== '') {
    display.innerText = Number(-Math.abs(display.innerText));
    secondValue = Number(-Math.abs(secondValue));
  } else if (operationSelect === true && secondValue !== '') {
    display.innerText = Number(Math.abs(display.innerText));
    secondValue = Number(Math.abs(secondValue));
  }
}

function showDisplays(event) {
  if (display.innerText === '0' && firstValue === '' && Number(event.target.innerText)) {
    display.innerText = event.target.innerText;
    firstValue = event.target.innerText;
  } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === false && display.innerText !== '0') {
    display.innerText += event.target.innerText;
    firstValue += event.target.innerText;
  }
  if (!display.innerText.includes('.') && event.target.dataset.operation === 'decimal' && display.innerText == '0' && operationSelect === false) {
    display.innerText += `${event.target.innerText}`;
    firstValue += `0${event.target.innerText}`;
  } else if (display.innerText !== '0' && !display.innerText.includes('.') && event.target.dataset.operation === 'decimal' && operationSelect === false) {
    display.innerText += event.target.innerText;
    firstValue += event.target.innerText;
  } else if (!display.innerText.includes('.') && event.target.dataset.operation === 'decimal' && display.innerText == '0' && operationSelect === true) {
    display.innerText += `${event.target.innerText}`;
    secondValue += `${event.target.innerText}`;
  } else if (!display.innerText.includes('.') && event.target.dataset.operation === 'decimal' && display.innerText !== '0' && operationSelect === true) {
    display.innerText += `${event.target.innerText}`;
    secondValue += `${event.target.innerText}`;
  }
  if (event.target.dataset.operation == 'add' || event.target.dataset.operation == 'subtract' || event.target.dataset.operation == 'divide' || event.target.dataset.operation == 'multiply') {
    operation = event.target.innerText;
    operationSelect = true;

    if (display.innerText == '0') firstValue = '0';
    if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '+') {
      display.innerText = add(parseInt(firstValue), parseInt(secondValue));
      firstValue = add(parseInt(firstValue), parseInt(secondValue));
      secondValue = '';
    }
    if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '-') {
      display.innerText = subtract(firstValue, secondValue);
      firstValue = subtract(firstValue, secondValue);
      secondValue = '';
    }
    if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === '/') {
      display.innerText = divide(firstValue, secondValue);
      firstValue = divide(firstValue, secondValue);
      secondValue = '';
    }
    if (calculated !== true && Number(firstValue) && Number(secondValue) && savedOperation === 'X') {
      display.innerText = multiply(firstValue, secondValue);
      firstValue = multiply(firstValue, secondValue);
      secondValue = '';
    }
    savedOperation = event.target.innerText;
  }
  if (operationSelect === true && secondValue === '' && Number(event.target.innerText)) {
    display.innerText = event.target.innerText;
    secondValue = event.target.innerText;
  } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === true && display.innerText !== firstValue && calculated === false) {
    display.innerText += event.target.innerText;
    secondValue += event.target.innerText;
  } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === true && calculated === false && display.innerText !== firstValue) {
    display.innerText = event.target.innerText;
    secondValue = event.target.innerText;
  } else if (display.innerText.length < 19 && event.target.dataset.operation === 'number' && operationSelect === true && calculated === true) {
    display.innerText += event.target.innerText;
    secondValue += event.target.innerText;
  }
}

function clearOperations() {
  firstValue = '';
  secondValue = '';
  operation = '';
  savedOperation = '';
  calculated = false;
  operationSelect = false;
  display.innerText = '0';
}

function add(a, b) {
  return a + b;
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
