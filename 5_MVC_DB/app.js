import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'

export function createApp ({ movieModel }) {
  const app = express()
  app.use(json()) // Middleware to parse body data
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  app.options('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*') // solve CORS error
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.send(200)
  })

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log('Server listening on port http://localhost:', PORT)
  })
}
