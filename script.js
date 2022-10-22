
const operators = ['+', '-', '*', '/'];
const buttonsNumbers = document.querySelectorAll('.buttons-numbers .button')
const buttonsOperators = document.querySelectorAll('.buttons-operations .button');
const display = document.getElementById('display');

let newNumber = true;
let divZero = false;

for (let i = 0; i < buttonsNumbers.length; i++) {
    const element = buttonsNumbers[i];
    element.addEventListener('click', function() {
        appendNumber(element.textContent);
    });
}

for (let i = 0; i < buttonsOperators.length; i++) {
    const element = buttonsOperators[i];
    if (element.id === 'equal') {
        element.addEventListener('click', operate);
        continue;
    }
    if (element.id === 'clear') {
        element.addEventListener('click', clear);
        continue;
    }
    element.addEventListener('click', function() {
        appendOperator(element.textContent);
    });
}

addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.code === 'Backspace' && display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
        if (display.textContent.length === 0) {
            display.textContent = '0';
            newNumber = true;
        }
    }
    if (parseInt(e.code.charAt(e.code.length-1) + '1')) {
        appendNumber(e.code.charAt(e.code.length-1));
    }

    switch (e.code) {
        case 'NumpadAdd':
            appendOperator('+')
            break;
        case 'NumpadSubtract':
            appendOperator('-')
            break;
        case 'NumpadMultiply':
            appendOperator('*')
            break;
        case 'NumpadDivide':
            appendOperator('/')
            break;
        case 'NumpadEnter':
            operate();
            break;
        case 'Delete':
            clear();
            break;
        default:
            break;
    }
});

function appendNumber(number) {
    if (divZero) {
        clear();
    }

    if (newNumber) {
        if (number === '0') {
            return;
        }
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
        newNumber = false
    }
    
    display.textContent += number;
}

function appendOperator(operator) {
    if (divZero) {
        clear();
    }
    if(display.textContent.length === 0) {
        return;
    }
    if(operators.includes(display.textContent.charAt(display.textContent.length-1))){
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
    }
    display.textContent += operator + '0';
    newNumber = true;
}

function operate() {
    let lastChar = display.textContent.charAt(display.textContent.length-1);
    if (operators.includes(lastChar)) {
        if (lastChar === '/' || lastChar === '*') {
            display.textContent += '1';
        } else {
            display.textContent += '0';
        }
    }
    let result = eval(display.textContent)
    if (result === Infinity) {
        display.textContent = 'Division by zero!';
        divZero = true;
        return;
    }
    display.textContent = result;
}

function clear() {
    display.textContent = '0';
    newNumber = true;
    divZero = false;
}

function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    return numA / numB;
}