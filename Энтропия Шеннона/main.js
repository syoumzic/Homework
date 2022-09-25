s = ''

if (s.length === 0)
    console.log("enter something")

else {
    alph = []

    for (let i = 0; i < s.length; ++i)
        alph[s.charAt(i)] = 0

    for (let i = 0; i < s.length; ++i)
        alph[s.charAt(i)]++;

    let n = 0
    
    for (let key in alph) {
        alph[key] /= s.length
        ++n
    }

    if (n == 1) {
        print(s, 0)
    }
    else {
        let H = 0

        for (let key in alph) {
            let p = alph[key]
            H -= p * Math.log(p)
        }

        H /= Math.log(n)
        print(s, H)
    }
}

function print(str, value) {
    console.log(`H(${str}) = ${value}`)
}
