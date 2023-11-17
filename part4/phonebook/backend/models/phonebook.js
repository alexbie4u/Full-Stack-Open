// require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const config = require('../utils/config')
const url = config.MONGODB_URI
console.log(url);
mongoose.set('strictQuery',false)

// const url = process.env.MONGODB_URI

console.log('Connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    },
  number: {
    type: Number,
    required: true,
    min: 10000000,
    max: 99999999,
  }
  })

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', phonebookSchema)

const password = process.argv[3]
const name = process.argv[4]
const number = process.argv[5]

const person = new Person({
    name: name,
    number: number
})

module.exports = mongoose.model('Person', phonebookSchema)