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

export default router
