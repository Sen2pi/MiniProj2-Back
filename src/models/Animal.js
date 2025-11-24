import mongoose from 'mongoose'
const animalSchema = new mongoose.Schema({
  name: String,
  species: String
}, { collection: 'animals_animalec' })
export default mongoose.model('Animal', animalSchema)
