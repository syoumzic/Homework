const INPUT = 0       //индексы команд
const OUTPUT = 1
const EXIT = 2
const SET = 3
const JUMP = 4
const IS_EQUAL = 5
const IS_LESS = 6
const IS_MORE = 7
const ADD = 8
const MULT = 9
const SUB = 10
const MOD = 11


function Reader(code){
  this.index = 1000;
  this.code = code
  this.read = function(str){
    try{
      return getIndex(str)
    }catch(e){
      code[this.index] = getNumber(str)
      this.index += 1
      return this.index - 1
    }
  }
}

function getIndex(str){
  if (!str.startsWith('%'))
    throw str + " is not a index"

  n = getNumber(str.substring(1))
  if(n < 100 || n >= 1000)
    throw "out of memory"
  
  return n
}

function getNumber(str){
  number = parseInt(str)

  if(isNaN(number))
    throw str + " index is not a number"

  return number
}

function getJumpPoint(str){
  if(str.endsWith(":"))
    throw str + ' is not jump point'
  
  return str.substring(0, str.length-1)
}

function run(code){
  uip = 0
  while(code[uip] != EXIT){
    switch(code[uip]){
      case INPUT:
        code[code[uip + 1]] = cin.questionInt()       //пропустит чило, но не строку
        uip += 2
      break

      case OUTPUT:
        console.log(code[code[uip + 1]])
        uip += 2
      break
      
      case SET:
        code[code[uip + 1]] = code[code[uip + 2]]
        uip += 3
      break

      case JUMP:
        uip = code[uip + 1]
      break

      case IS_EQUAL:
        n1 = code[code[uip+1]]
        n2 = code[code[uip+2]]

        if(n1 == n2)
          uip += 4 + code[uip+3]
        else
          uip += 4
      break

      case IS_LESS:
        n1 = code[code[uip+1]]
        n2 = code[code[uip+2]]

        if(n1 < n2)
          uip += 4 + code[uip+3]
        else
          uip += 4
      break

      case IS_MORE:
        n1 = code[code[uip+1]]
        n2 = code[code[uip+2]]

        if(n1 > n2)
          uip += 4 + code[uip+3]
        else
          uip += 4
      break

      case ADD:
        code[code[uip+1]] += code[code[uip+2]]
        uip += 3
      break

      case SUB:
        code[code[uip+1]] -= code[code[uip+2]]
        uip += 3
      break
      
      case MULT:
        code[code[uip+1]] *= code[code[uip+2]]
        uip += 3
      break

      case MOD:
        code[code[uip+1]] %= code[code[uip+2]]
        uip += 3
      break

      default:
        throw 'runtime error'
      break
    }

  }
}

function compile(args){
    code = []
    jumpPoints = []
    queue = []
    
    reader = new Reader(code)
    uip = 0
    i = 0

    commands = {
      "input": {
        jump: 2,
        key: INPUT,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
        }
      },

      "output": {
        jump: 2,
        key: OUTPUT,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
        }
      },

      "set": {
        jump: 3,
        key: SET,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
          code[uip+2] = reader.read(line[2])
        }
      },

      "jump":{
        jump: 2,
        key: JUMP,
        exact: function(line){
          if(line[1] in queue)
            queue[line[1]].push(uip + 1)
          else
            queue[line[1]] = [uip + 1]
        }
      },

      "is_equal": {
        jump: 4,
        key: IS_EQUAL,
        exact: function(line){
          code[uip + 1] = reader.read(line[1])
          code[uip + 2] = reader.read(line[2])
          
          let j = i + 1
          do{
            if(j >= args.length)
              return;

            first = args[j++][0]
          }while(command[first] == undefined);
          
          code[uip + 3] = commands[first].jump
        }
      },

      "is_less": {
        jump: 4,
        key: IS_LESS,
        exact: function(line){
          code[uip + 1] = reader.read(line[1])
          code[uip + 2] = reader.read(line[2])
          
          let j = i + 1
          do{
            if(j >= args.length)
              return;

            first = args[j++][0]
          }while(command[first] == undefined);
          
          code[uip + 3] = commands[first].jump
        }
      },

      "is_more": {
        jump: 4,
        key: IS_MORE,
        exact: function(line){
          code[uip + 1] = reader.read(line[1])
          code[uip + 2] = reader.read(line[2])
          
          let j = i + 1
          do{
            if(j >= args.length)
              return;

            first = args[j++][0]
          }while(command[first] == undefined);
          
          code[uip + 3] = commands[first].jump
        }
      },

      "add": {
        jump: 3,
        key: ADD,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
          code[uip+2] = reader.read(line[2])
        }
      },

      "mod": {
        jump: 3,
        key: MOD,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
          code[uip+2] = reader.read(line[2])
        }
      },

      "sub": {
        jump: 3,
        key: SUB,
        exact: function(line){
          code[uip+1] = getIndex(line[1])
          code[uip+2] = reader.read(line[2])
        }
      },

      "mult": {
        jump: 3,
        key: MULT,
        exact: function(line){
          code[uip + 1] = getIndex(line[1])
          code[uip + 2] = reader.read(line[2])
        }
      },

      "exit": {
        jump: 1,
        key: EXIT,
        exact: function(line){}
      }
    }

    args = args.split('\r\n').map(a => a.split(' '))
    
    for(; i < args.length; ++i){
        line = args[i]
        
        if(line[0] == '')             //отбрасываем нулевые строчки
          continue

        if(line[0].endsWith(":"))
          jumpPoints[line[0].substring(0, line[0].length-1)] = uip

        else{
          command = commands[line[0]]
          
          if(command == undefined)
            throw line[0] + ' not a command'

          command.exact(line)
          code[uip] = command.key
          uip += command.jump
        }
    }

    for(let i in queue)
      for(let j = 0; j < queue[i].length; ++j)
        code[queue[i][j]] = jumpPoints[i]
    

    code[uip] = EXIT
    return code
}

cin = require('readline-sync')
fs = require('fs')
args = fs.readFileSync(process.argv[2]).toString()
code = compile(args)
run(code)