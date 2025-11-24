import express from 'express'
import Expert from '../models/Expert.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/experts', requireAuth, async (req, res) => {
  const items = await Expert.find().lean()
  res.json(items)
})

router.post('/experts', requireAuth, async (req, res) => {
  const { name, field, email } = req.body
  const item = await Expert.create({ name, field, email })
  res.status(201).json(item)
})

export default router
