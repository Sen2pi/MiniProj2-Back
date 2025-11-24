import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import config from '../config/config.js'

const router = express.Router()

router.post('/auth', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, name: user.name }, config.jwtSecret, { expiresIn: '2h' })
  res.json({ token: `Bearer ${token}`, user: { id: user._id, name: user.name, username: user.username } })
})

router.get('/auth', async (req, res) => {
  const h = req.header('Authorization') || ''
  if (!h.startsWith('Basic ')) return res.status(400).json({ error: 'Missing Basic Authorization' })
  const b64 = h.slice(6)
  let creds
  try {
    creds = Buffer.from(b64, 'base64').toString('utf8')
  } catch {
    return res.status(400).json({ error: 'Invalid Basic header' })
  }
  const i = creds.indexOf(':')
  if (i < 0) return res.status(400).json({ error: 'Invalid Basic format' })
  const username = creds.substring(0, i)
  const password = creds.substring(i + 1)
  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, name: user.name }, config.jwtSecret, { expiresIn: '2h' })
  res.json({ token: `Bearer ${token}`, user: { id: user._id, name: user.name, username: user.username } })
})

router.post('/register', async (req, res) => {
  const { username, name, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' })
  const exists = await User.findOne({ username })
  if (exists) return res.status(409).json({ error: 'User exists' })
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, name, passwordHash: hash })
  res.status(201).json({ id: user._id, username: user.username, name: user.name })
})

export default router
