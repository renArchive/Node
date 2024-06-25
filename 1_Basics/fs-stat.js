const fs = require('node:fs');

// Sync
const stats = fs.statSync('./archivo.txt');
console.log(stats.isFile(), stats.isDirectory(), stats.size);
