let display = document.querySelector('h1');
let buttons = document.querySelectorAll(".cal-btn");
let memory=0;
let data_memory=[];
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
            if(display.textContent.includes('^')){
                let temp=display.textContent;
                var count = temp.match(/\W/g).length;
                if(count>1){
                    display.textContent = 'Syntax Error!';
                }
                let base= display.textContent.slice(0,display.textContent.indexOf('^'));
                let exponent= display.textContent.slice(display.textContent.indexOf('^')+1);
                display.textContent = displayAns(Math.pow(base, exponent));
            }else if(display.textContent.includes('%')){
                let temp=display.textContent;
                var count = temp.match(/\W/g).length;
                if(count>1){
                    display.textContent = 'Syntax Error!';
                }
                let n1= display.textContent.slice(0,display.textContent.indexOf('%'));
                let n2= display.textContent.slice(display.textContent.indexOf('%')+1);
                display.textContent = displayAns(n1%n2);
            }
            else{
                try{
                    display.textContent = displayAns( eval(display.textContent));
                }
                catch{
                    display.textContent = 'Syntax Error!';
                }
            }
        }
        else if (button.textContent == 'xy') {
            display.textContent += '^';
        }
        else if (button.textContent == 'C') {
            display.textContent = '';
        }
        else if (button.textContent == '⌫') {
            if (display.textContent.length > 0) {
                display.textContent = display.textContent.slice(0, -1);
            }
        }
        else if (button.textContent == '±') {
            if (display.textContent.charAt(0) == '-') {
                display.textContent = display.textContent.slice(1);
            } else {
                display.textContent = '-' + display.textContent;
            }
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
            display.textContent = displayAns(display.textContent*Math.PI);
        }
        else if (button.textContent == '10x') {
            display.textContent = displayAns(Math.pow(10,display.textContent));
        }
        else if (button.textContent == '√') {
            display.textContent = displayAns(Math.sqrt(display.textContent));
        }
        else if (button.textContent == 'n!') {
            let fact=1;
            for (let i = 1; i <= display.textContent; i++) {
                fact *= i;
            }
            display.textContent = fact;
        }
        else if (button.textContent == 'x2') {
            display.textContent = displayAns(Math.pow(display.textContent,2));
        }
        else if (button.textContent == '1/x') {
            display.textContent = displayAns(eval(1/display.textContent));
        }
        else if (button.textContent == '|x|') {
            display.textContent = displayAns(Math.abs(display.textContent));
        }
        else if (button.textContent == 'exp'|| button.textContent == 'e') {
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
            memory += parseFloat(display.textContent);
            data_memory.push(memory);
            display.textContent = memory;
        }
        else if (button.textContent == 'M-') {
            memory -= display.textContent;
            data_memory.push(memory);
            display.textContent = memory;
        }
        else if (button.textContent == 'MC') {
            memory = 0;
            data_memory=[];
            display.textContent = data_memory;
        }
        else if (button.textContent == 'MR') {
            display.textContent = data_memory;
        }
        else if (button.textContent == 'MS') {
            data_memory.push(display.textContent);
        }
        else if (button.textContent == 'DEG') {
            button.textContent = 'RAD';
            display.textContent = display.textContent*180/Math.PI;
        }
        else if (button.textContent == 'RAD') {
            button.textContent = 'DEG';
            display.textContent = Math.PI*display.textContent/180;
        }
        else if (button.textContent == 'F-E') {
            display.textContent = parseFloat(display.textContent).toExponential();
        }
        else if (button.textContent == '2x') {
            display.textContent = displayAns(Math.pow(2,display.textContent));
        }
        else if (button.textContent == '3x') {
            display.textContent = displayAns(Math.pow(3,display.textContent));
        }
        else if (button.textContent == '∛x') {
            display.textContent = displayAns(Math.pow(display.textContent,1/3));
        }
        else if (button.textContent == 'x3') {
            display.textContent = displayAns(Math.pow(display.textContent,3));
        }
        else {
            display.textContent += button.textContent;
        }
    });
});

function displayAns(ans) {
    if (countDecimal(ans) > 10) {
        return ans.toFixed(10);
    } else {
        return ans;
    }
}
function countDecimal(ans) {
    if (!Number.isInteger(ans)) {
        return ans.toString().split(".")[1].length;
    } else {
        return 0;
    }
}
