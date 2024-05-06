const fs=require('fs')

const notes=fs.readFileSync('./notes.txt','utf-8')
console.log(notes)
const add='this is a new line in notes file'
fs.writeFileSync('./notes2.txt',add)
const notes2=fs.readFileSync('./notes2.txt','utf-8')

console.log(notes2)