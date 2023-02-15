let display = document.querySelector('h1');
let buttons = document.querySelectorAll(".cal-btn");
// init memory variables
let memory = 0;
let data_memory = [];
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent == 'X') {
            display.textContent += '*';
        } else if (button.textContent == '÷') {
            display.textContent += '/';
        }
        else if (button.textContent == '−') {
            display.textContent += '-';
        }
        else if (button.textContent == '=') {
            equals(display.textContent);
        }
        else if (button.textContent == 'xy') {
            display.textContent += '^';
        }
        else if (button.textContent == 'C') {
            display.textContent = '';
        }
        else if (button.textContent == '⌫') {
            back(display.textContent);
        }
        else if (button.textContent == '±') {
            pm_toggle(display.textContent);
        }
        else if (button.textContent == 'mod') {
            display.textContent += '%';
        }
        else if (button.textContent == 'In') {
            display.textContent = displayAns(Math.log(display.textContent));
        }
        else if (button.textContent == 'log') {
            display.textContent = displayAns(Math.log10(display.textContent));
        }
        else if (button.textContent == 'π') {
            displayPI(display.textContent);
        }
        else if (button.textContent == '10x') {
            display.textContent = displayAns(Math.pow(10, display.textContent));
        }
        else if (button.textContent == '√') {
            display.textContent = displayAns(Math.sqrt(display.textContent));
        }
        else if (button.textContent == 'n!') {
            fact(display.textContent);
        }
        else if (button.textContent == 'x2') {
            display.textContent = displayAns(Math.pow(display.textContent, 2));
        }
        else if (button.textContent == '1/x') {
            display.textContent = displayAns(eval(1 / display.textContent));
        }
        else if (button.textContent == '|x|') {
            display.textContent = displayAns(Math.abs(display.textContent));
        }
        else if (button.textContent == 'exp' || button.textContent == 'e') {
            display.textContent = displayAns(Math.exp(display.textContent));
        }
        else if (button.textContent == 'sin') {
            display.textContent = displayAns(Math.sin(display.textContent));
        }
        else if (button.textContent == 'cos') {
            display.textContent = displayAns(Math.cos(display.textContent));
        }
        else if (button.textContent == 'tan') {
            display.textContent = displayAns(Math.tan(display.textContent));
        }
        else if (button.textContent == 'asin') {
            display.textContent = displayAns(Math.asin(display.textContent));
        }
        else if (button.textContent == 'acos') {
            display.textContent = displayAns(Math.acos(display.textContent));
        }
        else if (button.textContent == 'atan') {
            display.textContent = displayAns(Math.atan(display.textContent));
        }
        else if (button.textContent == '⌈x⌉') {
            display.textContent = displayAns(Math.ceil(display.textContent));
        }
        else if (button.textContent == '⌊x⌋') {
            display.textContent = displayAns(Math.floor(display.textContent));
        }
        else if (button.textContent == 'RAN') {
            display.textContent = displayAns(Math.random());
        }
        else if (button.textContent == 'M+') {
            mAdd(display.textContent);
        }
        else if (button.textContent == 'M-') {
            mSub(display.textContent);
        }
        else if (button.textContent == 'MC') {
            mClear();
        }
        else if (button.textContent == 'MR') {
            display.textContent = data_memory;
        }
        else if (button.textContent == 'MS') {
            data_memory.push(display.textContent);
        }
        else if (button.textContent == 'DEG') {
            button.textContent = 'RAD';
            display.textContent = display.textContent * 180 / Math.PI;
        }
        else if (button.textContent == 'RAD') {
            button.textContent = 'DEG';
            display.textContent = Math.PI * display.textContent / 180;
        }
        else if (button.textContent == 'F-E') {
            display.textContent = parseFloat(display.textContent).toExponential();
        }
        else if (button.textContent == '2x') {
            display.textContent = displayAns(Math.pow(2, display.textContent));
        }
        else if (button.textContent == '3x') {
            display.textContent = displayAns(Math.pow(3, display.textContent));
        }
        else if (button.textContent == '∛x') {
            display.textContent = displayAns(Math.pow(display.textContent, 1 / 3));
        }
        else if (button.textContent == 'x3') {
            display.textContent = displayAns(Math.pow(display.textContent, 3));
        }
        else {
            display.textContent += button.textContent;
        }
    });
});


// handling "=" operation
const equals = (Content) => {
    if (Content.includes('^')) {
        let temp = Content;
        var count = temp.match(/\W/g).length;
        if (count > 1) {
            display.textContent = 'Syntax Error!';
        }
        let base = Content.slice(0, Content.indexOf('^'));
        let exponent = Content.slice(Content.indexOf('^') + 1);
        display.textContent = displayAns(Math.pow(base, exponent));
    } else if (Content.includes('%')) {
        let temp = Content;
        var count = temp.match(/\W/g).length;
        if (count > 1) {
            display.textContent = 'Syntax Error!';
        }
        let n1 = Content.slice(0, Content.indexOf('%'));
        let n2 = Content.slice(Content.indexOf('%') + 1);
        display.textContent = displayAns(n1 % n2);
    }
    else {
        try {
            display.textContent = displayAns(eval(Content));
        }
        catch {
            display.textContent = 'Syntax Error!';
        }
    }
}

const displayAns = (ans) => {
    if (countDecimal(ans) > 10) {
        return ans.toFixed(10);
    } else {
        return ans;
    }
}
const countDecimal = (ans) => {
    if (!Number.isInteger(ans)) {
        return ans.toString().split(".")[1].length;
    } else {
        return 0;
    }
}

// handling "⌫" operation
const back = (content) => {
    if (content.length > 0) {
        content = content.slice(0, -1);
    }
    display.textContent = content;
}

// handling "+/-" toggle operation
const pm_toggle = (content) => {
    if (content.charAt(0) == '-') {
        content = content.slice(1);
    } else {
        content = '-' + content;
    }
    display.textContent = content;
}

// handling "PI"
const displayPI = (content) => {
    console.log(typeof (c));
    if (content == '') {
        display.textContent = 3.14159265359;
    }
    display.textContent = displayAns(content * Math.PI);
}

// handling factorial function
const fact = (content) => {
    let fact = 1;
    for (let i = 1; i <= content; i++) {
        fact *= i;
    }
    content = fact;
    display.textContent = content;
}

// Memory functions
const mAdd = (content) => {
    memory += parseFloat(content);
    data_memory.push(memory);
    display.textContent = memory;
}

const mSub = (content) => {
    memory -= content;
    data_memory.push(memory);
    display.textContent = memory;
}

const mClear = () => {
    memory = 0;
    data_memory = [];
    display.textContent = data_memory;
}