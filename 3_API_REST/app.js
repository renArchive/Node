const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemes/movies')

const app = express()
app.use(express.json()) // Middleware to parse body data
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // solve CORS error

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  return res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  return res.status(404).json({ message: 'Not Found' })
})

app.post('/movies', (req, res) => {
  const movieValidation = validateMovie(req.body)
  if (movieValidation.error) {
    return res.status(400).json({ error: JSON.parse(movieValidation.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // generates unique ID
    ...movieValidation.data
  }

  // Store resource in DB

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Not Found' })
  }

  const movieToPatch = {
    ...movies[movieIndex],
    ...result.data
  }

  return res.json(movieToPatch)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Not Found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie Deleted' })
})

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // solve CORS error
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.send(200)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:', PORT)
})
