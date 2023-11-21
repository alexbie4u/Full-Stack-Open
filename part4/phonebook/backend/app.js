const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/api')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

app.use(express.static('dist'))
app.use(express.json())
app.use('/api', apiRouter)
app.use(cors())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

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

module.exports = app