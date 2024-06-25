const fs = require('node:fs/promises');

console.log('Reading first file...')
fs.readFile('./archivo.txt', 'utf-8')
.then(text => {
    console.log(text);
});


console.log('Reading second file...')
fs.readFile('./archivo2.txt', 'utf-8')
.then(text => {
    console.log(text);
});