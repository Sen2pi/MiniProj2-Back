import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export function requireAuth(req, res, next) {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const payload = jwt.verify(token.replace('Bearer ', ''), config.jwtSecret)
    req.user = payload
    next()
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
