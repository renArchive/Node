const fs = require('node:fs/promises');

(async () =>{
    console.log('Reading first file...')
    const text = await fs.readFile('./archivo.txt', 'utf-8');
    console.log(text);

    console.log('Reading second file...')
    const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
    console.log(text2);
})();
