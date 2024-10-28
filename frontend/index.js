import { backend } from 'declarations/backend';

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
};

window.setOperation = (operation) => {
    if (currentOperation !== null) calculate();
    firstOperand = display.value;
    currentOperation = operation;
    shouldResetDisplay = true;
};

window.calculate = async () => {
    if (currentOperation === null || shouldResetDisplay) return;
    
    secondOperand = display.value;
    display.value = 'Calculating...';
    
    try {
        const x = parseFloat(firstOperand);
        const y = parseFloat(secondOperand);
        let result;

        switch (currentOperation) {
            case '+':
                result = await backend.add(x, y);
                break;
            case '-':
                result = await backend.subtract(x, y);
                break;
            case '*':
                result = await backend.multiply(x, y);
                break;
            case '/':
                result = await backend.divide(x, y);
                break;
        }

        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }

    currentOperation = null;
    shouldResetDisplay = true;
};
