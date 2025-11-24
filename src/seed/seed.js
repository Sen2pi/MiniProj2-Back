import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../config/config.js'
import User from '../models/User.js'
import Animal from '../models/Animal.js'

async function run() {
  await mongoose.connect(config.uri)
  const adminPw = await bcrypt.hash('admin', 10)
  await User.updateOne(
    { username: 'admin' },
    { username: 'admin', name: 'Admin', passwordHash: adminPw },
    { upsert: true }
  )
  const count = await Animal.countDocuments()
  if (count === 0) {
    await Animal.insertMany([
      { name: 'Leão', species: 'Panthera leo' },
      { name: 'Tigre', species: 'Panthera tigris' }
    ])
  }
  console.log('Seed concluído')
  await mongoose.disconnect()
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
