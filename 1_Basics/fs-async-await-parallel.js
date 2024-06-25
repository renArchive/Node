const fs = require('node:fs/promises');

Promise.all([
    fs.readFile('./archivo.txt', 'utf-8'),
    fs.readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
    console.log('Text from file 1', text);
    console.log('Text from file 2', text2);
})