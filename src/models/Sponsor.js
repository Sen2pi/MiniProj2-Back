import mongoose from 'mongoose'
const sponsorSchema = new mongoose.Schema({
  name: String,
  contribution: Number,
  contact: String
}, { collection: 'sponsor_animalec' })
export default mongoose.model('Sponsor', sponsorSchema)
