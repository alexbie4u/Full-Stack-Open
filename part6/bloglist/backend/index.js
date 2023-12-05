const express = require('express')
const app = require('./app')
const cors = require('cors')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
  console.log(`Server: ${config.MONGODB_URI}`);
})

