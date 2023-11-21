const mongoose = require('mongoose')

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

module.exports = mongoose.model('Person', phonebookSchema)