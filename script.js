
const operators = ['+', '-', '*', '/'];
const buttonsNumbers = document.querySelectorAll('.buttons-numbers .button')
const buttonsOperators = document.querySelectorAll('.buttons-operations .button');
const display = document.getElementById('display');

// eval

for (let i = 0; i < buttonsNumbers.length; i++) {
    const element = buttonsNumbers[i];
    element.addEventListener('click', function() {
        if (element.id === 'zero' && display.textContent.length === 0) {
            return;
        }
        if (operators.includes(display.textContent.charAt(display.textContent.length-1)) && element.id === 'zero') {
            return;
        }
        display.textContent += element.textContent
    });
}

for (let i = 0; i < buttonsOperators.length; i++) {
    const element = buttonsOperators[i];
    if (element.id === 'equal') {
        element.addEventListener('click', operate);
        continue;
    }
    if (element.id === 'clear') {
        element.addEventListener('click', () => display.textContent = '');
        continue;
    }
    element.addEventListener('click', function() {
        if(display.textContent.length === 0) {
            return;
        }
        if(operators.includes(display.textContent.charAt(display.textContent.length-1))){
            display.textContent = display.textContent.slice(0, display.textContent.length-1);
        }
        display.textContent += element.textContent;
    });
}

addEventListener('keydown', function(e) {
    if (e.code === 'Backspace' && display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
    }
});

function operate() {
    let lastChar = display.textContent.charAt(display.textContent.length-1);
    if (operators.includes(lastChar)) {
        if (lastChar === '/' || lastChar === '*') {
            display.textContent += '1';
        } else {
            display.textContent += '0';
        }
    }

    display.textContent = eval(display.textContent);
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