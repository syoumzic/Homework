function getShift(template){
    let shifts = new Array(template.length + 1).fill(template.length);

    let l;
    let lastChar = template[template.length - 1]
    for(let i=template.length - 2; i >= 0; --i){
        for(l = 0; i - l >= 0; ++l)
            if(template[i - l] != template[template.length - l - 1])
                break;

        if(l > 0){
            shift = template.length - i - 1;

            if(i - l == -1)
                for(let j=l; j<shifts.length; ++j)
                    shifts[j] = Math.min(shifts[j], shift)
            shifts[l] = Math.min(shifts[l], shift);
        }
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
    let shifts = getShift(template);
    let single = getSingle(template);
    let i = 0;
    let last = template.length - 1;
    let M = [];
    let l;
    
    while(i <= text.length - template.length){
        for(l=0; l<template.length; ++l)
            if(template[last - l] != text[i + last - l])
               break;
    
        if(l == 0){
            if(text[i + last] in single)
                i += single[text[i + last]];
            else
                i += template.length;
        }
        else{
            if(l == template.length)
                M.push(i)
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
