import express from 'express'
import Sponsor from '../models/Sponsor.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/sponsors', requireAuth, async (req, res) => {
  const items = await Sponsor.find().lean()
  res.json(items)
})

router.post('/sponsors', requireAuth, async (req, res) => {
  const { name, contribution, contact } = req.body
  const item = await Sponsor.create({ name, contribution, contact })
  res.status(201).json(item)
})

export default router
