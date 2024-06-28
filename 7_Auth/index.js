import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import { PORT, SECRET_KEY } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.set('view engine', 'ejs')

// Middleware: para pasar el body a JSON
app.use(express.json())
app.use(cookieParser())
// Middleware: para verificar JWT
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_KEY)
    req.session.user = data
  } catch (err) {
    req.session.user = null
  }

  next()
})

app.get('/', (req, res) => {
  const { user } = req.session
  // Devolver landing page
  // res.render('index', user)
  res.send('Hello')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    )
    res.cookie('access_token', token, {
      httpOnly: true, // Cookie solo se puede acceder mediente un http request, no con JS
      sameSite: 'strict', // Cookie se puede acceder solo del mismo dominio
      maxAge: 1000 * 60 * 60 // Cookie tiene un tiempo de vida de 1h
    }).send({ user, token })
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'Logout Successful' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) res.status(403).send('Access not authorized')

  res.render('protected', user)
})

app.listen(PORT, () => {
  console.log('Server running on port:', PORT)
})
