// Accessing the DOM elements
const entryBox = document.querySelector(".mainText");
const statusBox = document.querySelector(".subText");
const numbers = document.querySelectorAll(".aele");
const operators = document.querySelectorAll(".oper");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const backSpace = document.querySelector(".backspace");
const decimalPoint = document.querySelector(".decimalPoint");

let isAfterOper = false; 
let fixStatusText = false;
let isAfterEqual = false;
const operationSigns = ['+', '-', 'x', '÷'];
const hasSignAlready = (str) => operationSigns.some(v => str.includes(v));
const integerRegex = /^-?\d+$/;
const floatRegex = /^-?\d*\.\d+$/;

// Adding functionality to the clear button
clear.addEventListener("click", () => {
    entryBox.textContent = '';
    statusBox.textContent = '';
});

// Adding functionality to the backspace button
backSpace.addEventListener("click", () => {
    if (!statusBox.textContent.includes("=")) {
        entryBox.textContent = entryBox.textContent.substring(0, entryBox.textContent.length - 1)
    } 
    else {
        statusBox.textContent = '';
    }
});

// Adding the decimal point
decimalPoint.addEventListener("click", () => {
    if (!entryBox.textContent.includes('.')) {entryBox.textContent += '.'}
});

// Adding numbers to the textbox
numbers.forEach(number => number.addEventListener("click", () => {
    if (isAfterEqual) {
        statusBox.textContent = '';
        entryBox.textContent = number.textContent;
        isAfterEqual = false;
        fixStatusText = false;
    }
    else if (isAfterOper) {
        entryBox.textContent = number.textContent;
        fixStatusText = true;
    }
    else {
        entryBox.textContent += number.textContent;
    }
    isAfterOper = false;
}));

// Adding the operation signs to the textbox
operators.forEach(operator => operator.addEventListener("click", () => {
    if (isAfterEqual) {
        statusBox.textContent = `${entryBox.textContent} ${operator.textContent}`;
        isAfterEqual = false;
    }
    else if (hasSignAlready(statusBox.textContent) && (entryBox.textContent === '' || entryBox.textContent === statusBox.textContent.split(" ")[0])) {
        statusBox.textContent = statusBox.textContent.substring(0, statusBox.textContent.length - 1) + operator.textContent;
        
    }
    else if (hasSignAlready(statusBox.textContent)) {
        let middleStep = statusBox.textContent;
        middleStep += ` ${entryBox.textContent}`;
        let res = operate(middleStep.split(" "));
        statusBox.textContent = `${res} ${operator.textContent}`
        entryBox.textContent = `${res}`;
    }
    else if (fixStatusText) {
        statusBox.textContent = statusBox.textContent;
        console.log('hello');
    }
    else if ((!hasSignAlready(entryBox.textContent)) && statusBox.textContent.split(" ").length <= 1) {
        statusBox.textContent += `${entryBox.textContent} ${operator.textContent}`;
        
    }
    isAfterOper = true;
}))

// Perform mathematical operations
function operate(arr) {
    let result;
    if (integerRegex.test(arr[0]) && integerRegex.test(arr[2])) {
        if (arr[1] == '÷' && arr[2] == '0') {result = "DONT DO THAT"}
        else if (arr[1] === '+') {result = parseInt(arr[0]) + parseInt(arr[2])}
        else if (arr[1] === '-') {result = parseInt(arr[0]) - parseInt(arr[2])}
        else if (arr[1] === 'x') {result = parseInt(arr[0]) * parseInt(arr[2])}
        else if (arr[1] === '÷') {result = parseInt(arr[0]) / parseInt(arr[2])};
    }
    else if (floatRegex.test(arr[0]) || floatRegex.test(arr[2])) {
        if (arr[1] == '÷' && arr[2] == '0') {result = "DONT DO THAT"}
        else if (arr[1] === '+') {result = parseFloat(arr[0]) + parseFloat(arr[2])}
        else if (arr[1] === '-') {result = parseFloat(arr[0]) - parseFloat(arr[2])}
        else if (arr[1] === 'x') {result = parseFloat(arr[0]) * parseFloat(arr[2])}
        else if (arr[1] === '÷') {result = parseFloat(arr[0]) / parseFloat(arr[2])};
    };

    if (floatRegex.test(result)) {
        if (result.toString().length - result.toString().indexOf('.') - 1 > 2) {
            result = result.toFixed(2);
        }
    }

    return result;
};


equal.addEventListener("click", () => {
    if(!statusBox.textContent == '') {
        if (isAfterEqual) {
            if (integerRegex.test(entryBox.textContent) || floatRegex.test(entryBox.textContent)) {
                let statusLst = statusBox.textContent.split(" ");
                statusLst[0] = entryBox.textContent;
                let entryResult = operate(statusLst);
                statusBox.textContent = statusLst.join(" ");
                entryBox.textContent = `${entryResult}`;
            }
         }
     
         else if (!statusBox.textContent.includes('=')) {
             statusBox.textContent += ` ${entryBox.textContent} =`;
             let entryResult = operate(statusBox.textContent.split(" "));
             entryBox.textContent = `${entryResult}`;
             // isAfterOper = true;
             isAfterEqual = true;
         }
    }
    
})

