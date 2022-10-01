/*
*   Краснов Артём
*   КНМО-101
*/

function Node(letter, freq, child) {
    this.letter = letter
    this.freq = freq
    this.child = child
};

function code(code, value)
{
    codeStr = ''
    for(let i in value)
    {
        codeStr += code[value.charAt(i)]
    }
    return codeStr
};

function decode(tree, value){
    decodeStr = ''
    i = 0

    while(i < value.length){
        node = tree[0]

        for(; node.child != null; i++){
            n = Number(value.charAt(i))
            node = node.child[n]
        }
        decodeStr += node.letter

        if(tree[0].child == null)
        {
            i += 1
        }
    }
    return decodeStr
};

fs = require('fs');
inpStr = fs.readFileSync('input.txt').toString()
   
freq = []
for (let i = 0; i < inpStr.length; i++)
    freq[inpStr.charAt(i)] = 0;  

for (let i = 0; i < inpStr.length; i++)
    freq[inpStr.charAt(i)] += 1; 
    
tree = []
codes = []
length = 0
for (let i in freq)
{ 
    node = new Node(i, freq[i], null); 
    tree.push(node);
    codes[i] = ''
    length += 1
}

if(length == 1)
    codes[inpStr.charAt(0)] = '0'

else
{
    for(let n = tree.length; n > 1; n--)
    {
        tree.sort((a, b) => b.freq - a.freq)    //descending sort

        a = tree.pop()
        b = tree.pop()

        father = new Node(a.letter + b.letter, a.freq + b.freq, [a, b])
        tree.push(father)

        for(let i in a.letter)
            codes[a.letter.charAt(i)] = '0' + codes[a.letter.charAt(i)]

        for(let i in b.letter)
            codes[b.letter.charAt(i)] = '1' + codes[b.letter.charAt(i)]
    }
}


codeStr = code(codes, inpStr)
fs.writeFileSync("code.txt", codeStr)

decodeStr = decode(tree, codeStr)
fs.writeFileSync("output.txt", decodeStr)
