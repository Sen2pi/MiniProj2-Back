import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String
}, { collection: 'users_animalec' })
export default mongoose.model('User', userSchema)
