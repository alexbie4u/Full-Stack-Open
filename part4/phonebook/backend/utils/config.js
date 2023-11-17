require('dotenv').config({ path: '../.env' })

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
  }