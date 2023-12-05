const logger = require ('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    } else {
      req.token = null
    }
    
    next()
}

const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
        const user = await User.findById(decodedToken.id) //Search user
        req.user = user
  } else {req.user = null}
    
    next()
}


const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
logger.error(error.message)

if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
}   else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
}   else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
}

next(error)
}




module.exports = {
requestLogger,
tokenExtractor,
userExtractor,
unknownEndpoint,
errorHandler,
}