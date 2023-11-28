const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    minlength: 3,
    unique: true
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
  },
  passwordHash: {
    required: true,
    type: String,
    minlength: 3,
  },
  blogs: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User