require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const apiRouter = require('./routes/api')


app.use(express.static('dist'))
app.use('/api', apiRouter)
app.use(cors())

app.listen(PORT)
console.log(`Server running on port ${PORT}`)



