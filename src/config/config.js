export default {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/local',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret'
}
