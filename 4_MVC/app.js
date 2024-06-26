import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

const app = express()
app.use(json()) // Middleware to parse body data
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.use('/movies', moviesRouter)

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // solve CORS error
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.send(200)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:', PORT)
})
