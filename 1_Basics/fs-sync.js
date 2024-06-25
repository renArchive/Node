const fs = require('node:fs');

console.log('Reading first file...')
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log(text);

console.log('Reading second file...')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log(text2);