const path = require('node:path');

// Separador utilizado por OS
console.log(path.sep);

const filePath = path.join('./content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename('tmp/something-here/password.txt');
console.log(base);

const filename = path.basename('tmp/something-here/password.txt', '.txt');
console.log(filename);

const extension = path.extname('image.jpg');
console.log(extension);