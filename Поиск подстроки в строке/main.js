/*
   Краснов Артём
   КНМО-101
*/

function hash(str){
  n = 0
  for(let i=0; i<str.length; ++i)
    n += str.charCodeAt(i)
    
  return n
}

function find(begin, a, b){
  for(let i=0; i<b.lenght(); ++i)
    if(a[begin + i] != b[i])
      return false
  return true
}


function positions(str, find){
  M = []
  length = str.length - find.length

  for(let i=0; i<length; ++i){
    flag = true

    for(let j=0; j<find.length; ++j)
      if(str[i+j] != find[j]){
        flag = false
        break;
      }

    if(flag)
      M.push(i + 1)
  }

  return M
}

function positionsHash(str, find){
  H = hash(find)
  sum = hash(str.substring(0, find.length))

  M = []
  length = str.length - find.length

  for(let i=0; i<length; ++i){
    if(sum == H){
      flag = true

      for(let j=0; j<find.length; ++j)
        if(str[i+j] != find[j]){
          flag = false
          break
        }
      
      if(flag)
        M.push(i + 1)
    }

    sum = sum - str.charCodeAt(i) + str.charCodeAt(i + find.length)
  }

  return M
}

function test(f, a, b){
  
  sred = 0
  times = 20

  for(let i=0; i<times; ++i){
    begin = new Date().getTime()
    f.call(this, a, b)
    end = new Date().getTime()
    sred += end - begin
  }

  return sred / times;
}

fs = require("fs")

a = fs.readFileSync("Толстой Лев Николаевич. Война и мир. Том 1.txt").toString()
b = fs.readFileSync("Толстой Лев Николаевич. Война и мир. Том 2.txt").toString()
c = fs.readFileSync("Толстой Лев Николаевич. Война и мир. Том 3.txt").toString()
d = fs.readFileSync("Толстой Лев Николаевич. Война и мир. Том 4.txt").toString()
e = 'a'.repeat(1000000)

//console.log("positions:", positionsHash(a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей"))

console.log("ТЕСТ 1. Увеличение длины строки, в которой ищется подстрока\n")
console.log("brute force")
console.log(test(positions, a, "князь Андрей"), "millisconds")
console.log(test(positions, a+'\n'+b, "князь Андрей"), "millisconds")
console.log(test(positions, a+'\n'+b+'\n'+c, "князь Андрей"), "millisconds")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей"), "millisconds\n")

console.log("hash")
console.log(test(positionsHash, a, "князь Андрей"), "millisconds")
console.log(test(positionsHash, a+'\n'+b, "князь Андрей"), "millisconds")
console.log(test(positionsHash, a+'\n'+b+'\n'+c, "князь Андрей"), "millisconds")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей"), "millisconds\n")

console.log("ТЕСТ 2. Увеличение длины искомой подстроки\n")
console.log("brute force")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "князь"), "millisconds")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей"), "millisconds")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей Болконский"), "millisconds\n")

console.log("hash")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "князь"), "millisconds")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей"), "millisconds")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "князь Андрей Болконский"), "millisconds\n")

console.log("brute force")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "фортификация которых производилась"), "millisconds")
console.log(test(positions, a+'\n'+b+'\n'+c+'\n'+d, "которых производилась"), "millisconds\n")

console.log("hash")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "фортификация которых производилась"), "millisconds")
console.log(test(positionsHash, a+'\n'+b+'\n'+c+'\n'+d, "которых производилась"), "millisconds\n")

console.log("ТЕСТ 3. Сравнение brute force и хэшей\n")

aa = 'a'.repeat(100)
aab = aa + 'b'
baa = 'b' + aa

console.log("brute force")
console.log(test(positions, e, aab), "milliseconds")
console.log(test(positions, e, baa), "milliseconds\n")

console.log("hash")
console.log(test(positionsHash, e, aab), "milliseconds")
console.log(test(positionsHash, e, baa), "milliseconds")
