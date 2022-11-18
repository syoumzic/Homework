fs = require("fs")
text = fs.readFileSync("Толстой Лев Николаевич. Война и мир. Том 1.txt").toString()
template = "Болконский"
alph = new Array()

for(let i=0; i<template.length; ++i)
    alph[template[i]] = 0

table = new Array(template.length+1)

for(let i=0; i<table.length; ++i)
    table[i] = new Array(alph.length)

for(let l in alph)
    table[0][l] = 0

for(let j=0; j<template.length; ++j){
  prev = table[j][template.charAt(j)]
  table[j][template.charAt(j)] = j+1

  for(let i in alph)
    table[j+1][i] = table[prev][i]
}

state = 0
positions = []
for(let i=0; i<text.length; ++i){
  if(text.charAt(i) in alph)
    state = table[state][text.charAt(i)]
  else
    state = 0

  if(state == template.length)
    positions.push(i)
}

console.log(positions)