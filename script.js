
const operators = ['+', '-', '*', '/'];
const buttonsNumbers = document.querySelectorAll('.buttons-numbers .button')
const buttonsOperators = document.querySelectorAll('.buttons-operations .button');
const buttonsFunctions = document.querySelectorAll('.buttons-functions .button')
const display = document.getElementById('display');
const displayPlaceholder = document.getElementById('displayPlaceholder');

let newNumber = true;
let divZero = false;
let decimal = false;

let curNum = 0;
let prevNum = 0;
let oper = '+';

for (let i = 0; i < buttonsNumbers.length; i++) {
    const element = buttonsNumbers[i];
    element.addEventListener('click', function() {
        appendNumber(element.textContent);
    });
}

for (let i = 0; i < buttonsOperators.length; i++) {
    const element = buttonsOperators[i];
    element.addEventListener('click', function() {
        appendOperator(element.textContent);
    });
}

for (let i = 0; i < buttonsFunctions.length; i++) {
    const element = buttonsFunctions[i];
    switch (element.id) {
        case 'equal':
            element.addEventListener('click', function() {
                if (prevNum) {
                    equate();
                }
            });
            break;
        case 'clear':
            element.addEventListener('click', clear);
            break;
        case 'decimal':
            element.addEventListener('click', appendDecimal)
            break;
    }
}

addEventListener('keydown', function(e) {
    console.log(e.code);
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
            e.preventDefault();
            if (prevNum) {
                equate();
            }
            break;
        case 'Enter':
            e.preventDefault();
            if (prevNum) {
                equate();
            }
            break;
        case 'Delete':
            clear();
            break;
        case 'Backspace':
            deprecate();
            break;
        case 'NumpadDecimal':
            appendDecimal();
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
    if (divZero) { clear();}

    if(display.textContent.charAt(display.textContent.length-1) === '0' && display.textContent.length === 1) {
        if (prevNum) {
            oper = operator
            displayPlaceholder.textContent = displayPlaceholder.textContent.slice(0, displayPlaceholder.textContent.length-1) + oper;
            return;
        } else {
            return;
        }
    }

    curNum = parseFloat(display.textContent);
    if (prevNum) {
        curNum = operate(prevNum, curNum, oper);
    }
    
    oper = operator;
    prevNum = curNum;
    curNum = 0;
    displayPlaceholder.textContent = `${prevNum} ${oper}`;
    display.textContent = '0';
    newNumber = true;
    decimal = false;
}

function operate(numA, numB, operator) {
    let result = 0;
    switch (operator) {
        case '+':
            return(add(numA, numB));
        case '-':
            return(subtract(numA, numB));
        case '*':
            return(multiply(numA, numB));
        case '/':
            if (numB === 0) {
                divZero = true;
                return(Infinity);
            }
            return(divide(numA, numB));
    }
}

function equate() {
    curNum = operate(prevNum, parseFloat(display.textContent), oper);
    prevNum = 0;
    display.textContent = `${curNum}`;
    displayPlaceholder.textContent = '';
}

function clear() {
    prevNum = 0;
    curNum = 0;
    displayPlaceholder.textContent = '';
    display.textContent = '0';
    newNumber = true;
    divZero = false;
    decimal = false;
}

function appendDecimal() {
    if (!decimal) {
        if (newNumber) {
            newNumber = false;
        }
        display.textContent += '.';
        decimal = true;
    }
}

function deprecate() {
    if (display.textContent.length > 0) {
        if (display.textContent.charAt(display.textContent.length-1) === '.') {
            decimal = false;
        }
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
        if (display.textContent.length === 0) {
            if (prevNum) {
                curNum = prevNum;
                prevNum = 0;
                display.textContent = `${curNum}`;
                displayPlaceholder.textContent = '';
                newNumber = false;
                return;
            } else {
                clear();
                return;
            }
        }
        if (display.textContent.length === 1 && display.textContent.charAt(display.textContent.length-1) === '0') {
            newNumber = true;
            return;
        }
    }
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