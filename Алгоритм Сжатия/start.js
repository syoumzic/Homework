function mult(char, times) {
    s = ''

    for (let i = 0; i < times; i++)
        s += char

    return s
}

function code(decode) {
    code = ''
    cnt = 1

    for (let i = 0; i < decode.length; i++) {
        if (decode.charAt(i) == decode.charAt(i + 1))
            cnt++;

        else if (decode.charAt(i) == "#" || cnt >= 4) {

            for (; cnt > 0; cnt -= 255)
                code += "#" + String.fromCharCode(Math.min(cnt, 255)) + decode.charAt(i)

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
decodeStr = fs.readFileSync('input.txt').toString();
//decodeStr = fs.readFileSync("C:\\Users\\rofet\\Изображения\\macos-sierra-apple-mac-os-x.jpg").toString()
console.log("input: ", decodeStr, '\n')

codeStr = code(decodeStr)
console.log("code:", codeStr, '\n')

codeWithDecodeStr = decode(codeStr)
console.log("decode:", codeWithDecodeStr, '\n')

if(codeWithDecodeStr != decodeStr)
    throw new Error("переделывай!")
else {
    fs.writeFileSync('code.txt', codeStr);
    fs.writeFileSync('output.txt', codeWithDecodeStr)
    console.log("file saved")
}
