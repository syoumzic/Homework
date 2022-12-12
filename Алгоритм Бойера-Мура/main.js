function getShift(template){
    shifts = new Array(template.length);
   
    pi = new Array(template.length);  //перевëрнутая префикс функции
    pi[0] = 0;
    
    last = template.length - 1;
    for(let i = 1; i < template.length; ++i){
        j = pi[i - 1];
       
        while(j > 0 && template[last - i] != template[last - j])
            j = pi[j - 1];
          
        if(template[last - i] == template[last - j])
            ++j;
        pi[i] = j;
    }
   
    rpr = new Array(template.length);
    for(let i = pi[last]; i < template.length; ++i)
        rpr[i] = pi[last] - i;

    for(let i = 0; i < template.length - 2; ++i){
        if(template[i - pi[last - i]] != template[last - pi[last - i]]) 
            rpr[pi[last - i]] = i;
    }
   
    shifts = new Array(template.length);
    for(let l = 0; l < template.length; ++l){
        shifts[l] = template.length - l - rpr[l];
    }
   
    return shifts;
}

function getSingle(template){
    single = [];
    last = template.length - 1
    
    for(let i = 0; i < template.length; ++i){
        single[template[i]] = last - i;
    }
    return single;
}
function find(template, text){
    shifts = getShift(template);
    single = getSingle(template);
    i = 0;
    last = template.length - 1;
    M = [];

    while(i < text.length - last){
        for(l=0; l<template.length; ++l)
            if(template[last - l] != text[i + last - l])
               break;
    
        if(l == 0){
            if(text[i + last] in single)
                i += single[text[i + last]];
            else
                i += template.length;
        }
        else if(l == template.length){
            M.push(i);
            i += template.length;
        }
        else{
            i += shifts[l]; 
        }
    }
    
    return M;
}

function test(template, text){
    begin = new Date().getTime();
    find(template, text);
    end = new Date().getTime();
    console.log('Поиск "'+ template + '": ' + (end - begin) + ' ms');
}

fs = require("fs")
text = fs.readFileSync("Война и мир.txt").toString();

test("князь", text);
test("князь Андрей", text);
test("князь Андрей Болконский", test);
