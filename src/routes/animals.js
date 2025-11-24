import express from 'express'
import Animal from '../models/Animal.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/animals', requireAuth, async (req, res) => {
  const animals = await Animal.find().lean()
  res.json(animals)
})

export default router
