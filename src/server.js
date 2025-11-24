import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import animalsRoutes from './routes/animals.js'
import expertsRoutes from './routes/experts.js'
import sponsorsRoutes from './routes/sponsors.js'
import config from './config/config.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>ANIMALEC API</h1>')
})

app.use(authRoutes)
app.use(animalsRoutes)
app.use(expertsRoutes)
app.use(sponsorsRoutes)

const PORT = process.env.PORT || 8080

console.log('Mongo URI:', config.uri)
mongoose.connect(config.uri).then(() => {
  app.listen(PORT, () => {
    console.log(`Your app is listening on ${PORT}`)
  })
}).catch(err => {
  console.error('MongoDB connection error:', err.message)
  process.exit(1)
})
