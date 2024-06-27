import { validateMovie, validatePartialMovie } from '../schemes/movies.js'

// Para este controlador es totalmente transparente de donde proviene el modelo a usar

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*') // solve CORS error

    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    return res.json(movies)
  }

  getByID = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getByID({ id })
    if (movie) return res.json(movie)

    return res.status(404).json({ message: 'Not Found' })
  }

  create = async (req, res) => {
    const movieValidation = validateMovie(req.body)
    if (movieValidation.error) {
      return res.status(400).json({ error: JSON.parse(movieValidation.error.message) })
    }

    const newMovie = await this.movieModel.create({ input: movieValidation.data })

    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieUpdated = await this.movieModel.update({ id, input: result.data })

    if (!movieUpdated) {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.json(movieUpdated)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const movieDeleted = await this.movieModel.delete({ id })
    if (!movieDeleted) {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.json({ message: 'Movie Deleted' })
  }
}
