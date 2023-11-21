const express = require('express')
const app = express()
const logger = require('./utils/logger')

const config = require('../backend/utils/config')
const PORT = config.PORT
const cors = require('cors')
const apiRouter = require('./routes/api')
const mongoose = require('mongoose')

app.use(express.static('dist'))
app.use('/api', apiRouter)
app.use(cors())



app.listen(PORT)
console.log(`Server running on port ${PORT}`)


const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
console.log('Connecting to', MONGODB_URI);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
