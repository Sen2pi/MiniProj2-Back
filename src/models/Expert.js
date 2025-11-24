import mongoose from 'mongoose'
const expertSchema = new mongoose.Schema({
  name: String,
  field: String,
  email: String
}, { collection: 'expert_animalec' })
export default mongoose.model('Expert', expertSchema)
