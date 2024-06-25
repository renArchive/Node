const http = require('node:http');
const fs = require('node:fs');

// Callback que se ejecuta en cada req
const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.end("Welcome!!");
    } else if (req.url === '/user') {
        res.end("Users!!");
    } else if (req.url === '/image') {
        fs.readFile('./statusCodes.png', (error, file) => {
            if (error) {
                res.statusCode = 500;
                res.end("Internal Server Error");
            } else {
                res.setHeader('Content-Type', 'image/png');
                res.end(file);
            }
        });
    } else {
        res.statusCode = 404;
        res.end("Not found!!");
    }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log("Server listening on port 3000");
})