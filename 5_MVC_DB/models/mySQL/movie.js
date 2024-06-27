import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const [genreInfo] = await connection.query(
        'SELECT * FROM genre WHERE LOWER(name) = ?;',
        [genre.toLowerCase()])
      const [movieGenreInfo] = await connection.query(
        'SELECT * FROM movie_genres WHERE genre_id = ?;',
        [genreInfo[0].id])
      const movieIDs = movieGenreInfo.map(movieGenre => movieGenre.movie_id)
      const [movies] = await connection.query(
        'SELECT *, BIN_TO_UUID(id) id FROM movie WHERE id IN (?);',
        [movieIDs])

      return [movies]
    }

    const [movies] = await connection.query('SELECT *, BIN_TO_UUID(id) id FROM movie;')
    return movies
  }

  static async getByID ({ id }) {
    const [movie] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id])

    return movie
  }

  static async create ({ input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster,
      genre
    } = input

    // generar un ID
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
             VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);`,
            [uuid, title, year, director, duration, poster, rate])
    } catch (err) {
      // evitar mostrar el error al cliente
      throw new Error('Error creating a movie')
    }

    if (genre) {
      // If new genre, add it to table
      // Link genres with movie
    }

    const [movie] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid])

    return movie
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
