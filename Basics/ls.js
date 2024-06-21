const fs = require('node:fs');

fs.readdir('.', (err, files) => {
    if(err) {
        console.error('Couldn not read directory');
        return;
    }

    files.forEach(file => {
        console.log(file);
    })
});