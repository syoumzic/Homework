function mult(char, times) {
    s = ''

    for (let i = 0; i < times; i++)
        s += char

    return s
}

function decode(code) {
    decode = ''
    i = 0

    while (i < code.length) {
        if (code.charAt(i) == '#') {
            decode += mult(code.charAt(i + 2), code.charAt(i + 1).charCodeAt(0))
            i += 3
        } else {
            decode += code.charAt(i)
            i += 1
        }
    }

    return decode
}

function code(decode) {
    code = ''
    cnt = 1

    for (let i = 0; i < decode.length; i++) {
        if (decode.charAt(i) == decode.charAt(i + 1))
            cnt++;

        else if (decode.charAt(i) == "#" || cnt >= 4) {

            let end = String.fromCharCode(255);

            for (; cnt > 255; cnt -= 255)
                code += "#" + end + decode.charAt(i)

            if (cnt >= 4)
                code += "#" + String.fromCharCode(cnt) + decode.charAt(i);
            else
                code += mult(decode.charAt(i), cnt)

            cnt = 1
        }
        else {
            code += mult(decode.charAt(i), cnt)
            cnt = 1
        }
    }

    return code
}

function decode(code) {
    decode = ''
    i = 0

    while (i < code.length) {
        if (code.charAt(i) == '#') {
            decode += mult(code.charAt(i + 2), code.charAt(i + 1).charCodeAt(0))
            i += 3
        } else {
            decode += code.charAt(i)
            i += 1
        }
    }

    return decode
}

let fs = require('fs')
let input = fs.readFileSync('input.txt').toString();

let codeStr = code(input)
fs.writeFileSync('code.txt', codeStr);

let decodeStr = decode(codeStr)
fs.writeFileSync('output.txt', decodeStr)
