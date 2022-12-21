function codeMessage(message, shift){
    message = message.toLowerCase().replace(/ё/g, "е");
	let code = "";

	for(let i = 0; i < message.length; ++i){
        if(message[i].isLetter()){
            let letterCode = message.charCodeAt(i) - firstCharCode;
		    let newCode = (letterCode + shift) % lettersFreq.length;
            let newLetter = String.fromCharCode(newCode + firstCharCode);
            code += newLetter;
        }
        else{
            code += message[i];
        }
	}
	
	return code;
}

function frequency(message){
    let freq = new Array(lettersFreq.length);

    for(let i = 0; i < lettersFreq.length; ++i)
        freq[i] = 0;

    for(let i = 0; i < message.length; ++i){
        if(message[i].isLetter())
            freq[message.charCodeAt(i) - firstCharCode] += 1;
    }

    for(let i = 0; i < freq.length; ++i)
        freq[i] /= message.length;

    return freq
}

function sq(n){
    return n*n;
}

function hackMessage(message){
    let messageFreq = frequency(message);    

    let min = Infinity; 
    let shift;
    for(let i = 0; i < lettersFreq.length; ++i){

        let sum = 0;
        for(let j = 0; j < messageFreq.length; ++j)
            sum += sq(lettersFreq[(j + i) % lettersFreq.length] - messageFreq[j]);

        if(sum < min){
            shift = i;
            min = sum;
        }
    }
    return codeMessage(message, shift);
}

String.prototype.isLetter = function() {
    return this[0] >= 'а' && this[0] <= 'я';
}

const firstCharCode = 1072; //код а
const lettersFreq = [0.07998, 0.01592, 0.04533, 0.01687, 0.029769999999999998, 0.08483, 0.009399999999999999, 0.01641, 0.07367, 0.01208, 0.03486, 0.043429999999999996, 0.032029999999999996, 0.067, 0.10983000000000001, 0.02804, 0.04746, 0.05473, 0.06318, 0.026150000000000003, 0.00267, 0.00966, 0.00486, 0.014499999999999999, 0.00718, 0.00362, 0.00037999999999999997, 0.01898, 0.01735, 0.00331, 0.00638, 0.02001];
let fs = require('fs');
let text = fs.readFileSync('Война и мир.txt').toString().toLowerCase().replace(/ё/g, "е");
let code = codeMessage(text, Math.floor(Math.random() * 32));
let decode = hackMessage(code)
fs.writeFileSync('output.txt', decode)