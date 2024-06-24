const http = require('node:http')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/plain')
          return res.end('Welcome')
        default:
          res.setHeader('Content-Type', 'text/plain')
          res.statusCode = 404
          return res.end('Not Fount')
      }
    }
    case 'POST': {
      switch (url) {
        case '/message':
          res.setHeader('Content-Type', 'text/plain')
          return res.end('Welcome')
      }
    }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
