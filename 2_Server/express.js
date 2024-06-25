const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.use((req, res, next) => {
  console.log('Middleware')
  next()
})

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.post('/user', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
