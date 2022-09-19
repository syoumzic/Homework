s = ''

if(s.length === 0)
    console.log("введте что-нибудь!")

else if (s.length === 1)
    print(s, 0)

else {
    alph = []

    for (let i = 0; i < s.length; ++i)
        alph[s.charAt(i)] = 0

    for (let i = 0; i < s.length; ++i)
        alph[s.charAt(i)]++;

    let n = 0

    console.log(alph)

    for (let key in alph) {
        alph[key] /= s.length
        ++n
    }

    console.log(alph)

    let H = 0
    for(let key in alph) {
        let p = alph[key]
        H -= p * Math.log(p) / Math.log(n)
    }

    print(s, H)
}

function print(str, value){
    console.log(`H(${str}) = ${value}`)
}
