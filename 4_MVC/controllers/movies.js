import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemes/movies.js'

export class MovieController {
  static async getAll (req, res) {
    res.header('Access-Control-Allow-Origin', '*') // solve CORS error

    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    return res.json(movies)
  }

  static async getByID (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getByID({ id })
    if (movie) return res.json(movie)

    return res.status(404).json({ message: 'Not Found' })
  }

  static async create (req, res) {
    const movieValidation = validateMovie(req.body)
    if (movieValidation.error) {
      return res.status(400).json({ error: JSON.parse(movieValidation.error.message) })
    }

    const newMovie = await MovieModel.create({ input: movieValidation.data })

    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieUpdated = await MovieModel.update({ id, input: result.data })

    if (!movieUpdated) {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.json(movieUpdated)
  }

  static async delete (req, res) {
    const { id } = req.params
    const movieDeleted = await MovieModel.delete({ id })
    if (!movieDeleted) {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.json({ message: 'Movie Deleted' })
  }
}
