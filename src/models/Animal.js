import mongoose from 'mongoose'
const animalSchema = new mongoose.Schema({
  name: String,
  species: String
})
export default mongoose.model('Animal', animalSchema)
