/*
Артём Краснов,
КНМО-101
*/

function calculate(equation){
    function processOperation(numbers, stack){
        let b = numbers.pop();
        let a = numbers.pop();
        let s = stack.pop();
        
        let result = 0;
        switch(s){
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = a / b; break;
            case '^': result = Math.pow(a, b); break;
        }

        numbers.push(result);
    }

    function priority(sign){
        switch(sign){
            case ')':
            case '(': return 1;
            case '+':
            case '-': return 2;
            case '*':
            case '/': return 3;
            case '^': return 4;
            default: return 0;    //undefine for example
        }
    }

    let numbers = [];
    let stack = [];

    let lastNumber = 0;
    let lastCharacter = ''
    let minus = false;

    for(let i=0; i<equation.length; ++i){
        let c = equation[i];

        if(c == ' ')
            continue
        
        if(c.isDigit()){
            lastNumber = lastNumber * 10 + (c - '0');
            continue;
        }
        
        if(priority(c) == 0)
            throw c + " isn't a sign";

        if(c == '('){
            stack.push(c);
            continue;
        }

        if(lastCharacter == '(' && c == '-'){
            minus = true;
            continue;
        }

        numbers.push((minus)? -lastNumber : lastNumber);
        lastNumber = 0;

        if(c == '^'){
            stack.push(c);
            continue;
        }
       
        while(priority(c) <= priority(stack.last())){
            if(stack.last() == '('){
                stack.pop();
                lastNumber = numbers.pop();
                break;
            }
            processOperation(numbers, stack);   
        }
            
        if(c != ')')
            stack.push(c);

        lastCharacter = c;
    }

    if(equation.last().isDigit())
      numbers.push(lastNumber);

    while(numbers.length > 1){
        processOperation(numbers, stack);
    }

    if(stack.length != 0)
        throw 'syntax error'

    return numbers[0];
}

Array.prototype.last = function(){
    return this[this.length - 1];
}

String.prototype.isDigit = function(){
    return this >= '0' && this <= '9';
}

String.prototype.last = function(){
    return this[this.length - 1];
}

console.log(calculate(process.argv[2]))
