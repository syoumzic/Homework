function hash(str){
  n = 0
  for(let i=0; i<str.length; ++i)
    n += str.charCodeAt(i)
    
  return n
}

function positions(word, name){
  try{
    input = fs.readFileSync(name).toString()
  }catch(e){
    throw "file " + name + " not found"
  }
  
  H = hash(word)
  sum = hash(input.substring(0, word.length))

  M = []
  i = 0
  j = word.length  
  
  for(; j<=input.length; ++i, ++j){
    if(sum == H && input.substring(i, j) == word)
      M.push(i+1)
    sum = sum - input.charCodeAt(i) + input.charCodeAt(j)
  } 

  /*for(let i=0; i<M.length; ++i)
    if(input.substring(M[i]-1, M[i]-1 + word.length) != word)
      throw "error"    */
  
  return M
}

fs = require("fs")

begin = new Date().getTime()

a = positions("Harry", "J. K. Rowling - Harry Potter 1 - Sorcerer's Stone.txt")
b = positions("Andrew", "War And Peace.txt")
c = positions("oxygen", "Verne Jules. Twenty Thousand Leagues Under the Sea.txt")
end = new Date().getTime()

console.log("millis:", (end - begin) / 3)