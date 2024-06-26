import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string'
  }),
  year: z.number().int().min(1900),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0), // Default because is optional
  poster: z.string().url(),
  genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'Crime']))
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  // partial() -> checks if property in object is available in schema, if it exists it applies the validations
  // it it does not exist, it ignores it
  return movieSchema.partial().safeParse(object)
}
