/*
Краснов Артëм
КНМО-101
*/

INFINITY = "01111111100000000000000000000000";
MINUSINFINITY = "11111111100000000000000000000000";
NAN = "01111111110000000000000000000000";
ZERO = "00000000000000000000000000000000";
MINUSZERO = "10000000000000000000000000000000";

function indexOf(c, str){
    index = str.indexOf(c);
    return index == -1? str.length : index;
}

function toFloat(str){
    n = Number(str);
    
    if(isNaN(n))
        return NAN;
    
    if(n > 340282346638528859811704183484516925440)
        return INFINITY;
    
    if(n < -340282346638528859811704183484516925440)
        return MINUSINFINITY;
    
    if(Object.is(n, -0))
        return MINUSZERO;
    
    if(Object.is(n, +0))
        return ZERO;
    
    mant = (n).toString(2);
    point = indexOf('.', mant);
    mant = mant.replace('.', '');
    begin = indexOf('1', mant);
    pows = powBin(point - begin - 1);
    
    if(pows.length >= 31)
        if(n >= 0)
            return ZERO;
        else
            return MINUSZERO;
    
    sign = (n < 0)? '1' : '0';
    mant = mant.substr(begin+1, 31 - pows.length).padEnd(31 - pows.length, '0');
    return sign + pows + mant;
}

function normalize(float){
    return float[0] + " " + float.slice(1, 8) + " " + float.slice(9, 32); 
}

function getMant(float){
    return '1'+float.slice(Math.max(9, float.indexOf('1', 1)+1))
}

function getPow(float){
    return float.slice(1, Math.max(9, indexOf('1', float)+1)) 
}

function calculatePow(float){
    pows = getPow(float)
    if(pows.length > 8)
        return -118 - pows.length;
    return parseInt(pows, 2) - 127
}

function powBin(pows){
    if(pows >= -126)
        return (pows + 127).toString(2).padStart(8, '0');
    return '0'.repeat(-119 - pows) + '1';
}

function toNumber(float){
    if(float == NAN)
        return "NaN";
    
    if(float == INFINITY)
        return "Infinity";
        
    if(float == MINUSINFINITY)
        return "-Infinity";
    
    if(float == ZERO)
        return "0";
    
    if(float == MINUSZERO)
        return "-0";
    
    mant = getMant(float);
    pows = calculatePow(float) - mant.length + 1;

    mant = parseInt(mant, 2);
    sign = (float[0] == 1)? -1 : 1;
    
    return sign*mant*Math.pow(2, pows);
}

function isAbsMore(a, b){
    for(let i=1; i<32; ++i)
        if(a[i] == '1' && b[i] == '0')
            return true;
        else if(a[i] == '0' && b[i] == '1')
            return false;
}

function add(a, b){
    if(a == NAN || b == NAN || (a == INFINITY && b == MINUSINFINITY) || (a == MINUSINFINITY && b == INFINITY))
        return NAN;
    
    if(a == INFINITY || a == MINUSINFINITY)
        return a;
        
    if(b == INFINITY || b == MINUSINFINITY)
        return b;
        
    if(isAbsMore(b, a)){
        t = a;
        a = b;
        b = t;
    }
    
    pow1 = calculatePow(a);
    pow2 = calculatePow(b);
    shift = pow1 - pow2;
    mant1 = getMant(a);
    mant2 = ('0'.repeat(shift) + getMant(b)).padEnd(mant1.length, '0');
    mant1 = mant1.padEnd(mant2.length, '0');
    mant3 = ""

    save = 0
    for(let i=mant2.length-1; i>=0; --i){
        if(mant1[i] == "1")
            save += 1;
        if(mant2[i] == "1")
            save += 1;
            
        if(save % 2 == 1){
            mant3 = "1" + mant3;
            --save;   
        }
        else
            mant3 = "0" + mant3;
            
        save /= 2;
    }
    
    if(save == 1){
        pow1 += 1
        return (a[0] + powBin(pow1) + mant3).slice(0, 32); 
    }
    return a[0] + getPow(a) + mant3.slice(1);
}

function reverse(s){
    return s == '0'? '1' : '0';
}

function sub(a, b){
    if(a == NAN || b == NAN || (a == INFINITY && b == INFINITY) || (a == MINUSINFINITY && b == MINUSINFINITY))
        return NAN;
    
    if(a == INFINITY || a == MINUSINFINITY)
        return a;
        
    if(b == INFINITY)
        return MINUSINFINITY;
    
    if(b == MINUSINFINITY)
        return INFINITY;
    
    reverseSign = false;
    if(isAbsMore(b, a)){
        t = a;
        a = b;
        b = t;
        reverseSign = true;
    }
    
    pow1 = calculatePow(a);
    pow2 = calculatePow(b);
    shift = pow1 - pow2;
    mant1 = getMant(a);
    mant2 = ('0'.repeat(shift) + getMant(b)).padEnd(mant1.length, '0');
    mant1 = mant1.padEnd(mant2.length, '0');
    
    mant3 = ""
    test = ""
    save = 0
    for(let i=mant2.length-1; i>=0; --i){
        if(mant1[i] == mant2[i]){
            mant3 = (save == 1? '1' : '0') + mant3;
            test = "c" + test;
        }
        else if(mant1[i] == '1'){
            mant3 = (save == 1? '0' : '1') + mant3;
            save = 0;
            test = "n" + test;
        }
        else{
          mant3 = (save == 1? '0' : '1') + mant3; 
          save = 1;
          test = "z" + test;
        }
    }

    begin = indexOf('1', mant3);
    sign = reverseSign? reverse(a[0]) : a[0];
    return (sign + powBin(pow1 - begin) + mant3.slice(begin+1)).slice(0, 32);
}

function exact(a, z, b){
    if(z == '+'){
        
        if(a[0] == '0' && b[0] == '1')
            return sub(a, b.replace('1', '0'));
        else if(a[0] == '1' && b[0] == '0')
            return sub(b, a.replace('1', '0'));
        else
            return add(a, b);
    }
    else{
        if(a[0] == '0' && b[0] == '1')
            return add(a, z, b.replace('1', '0'));
        else if(a[0] == '1' && b[0] == '0')
            return add(a, b.replace('0', '1'));
        else
            return sub(a, b);
    }
}

fs = require("fs");
str = fs.readFileSync("in.txt").toString().split(' ');
if(str.length == 1){
    fs.saveFileSync("out.txt", normalize(toFloat(str)))
}   
else if(str.length == 3){
    float = exact(toFloat(str[0]), str[1], toFloat(str[2]));
    fs.saveFileSync("out.txt", normalize(float) + '\n' + toNumber(float))
}
