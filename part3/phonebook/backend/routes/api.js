require('dotenv').config()
const { ObjectId } = require('mongoose').Types;
const fs = require('fs');
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const Person = require('../models/phonebook')

router.use(express.static('dist'))
router.use(bodyParser.json())
router.use(morgan('tiny, date[iso]'))


router
  .route('/persons')
  .get(async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error for fucks sake' });
    }
  })
  .post(async (req, res, next) => {
    const { name, number } = req.body;

      Person.create({
        name: name,
        number: number,
      })
      .then(newPerson => {
        res.status(201).json(newPerson);
      })
      .catch(error => next(error))
  })

router
  .get("/info", (req, res, next) => {
      const numberOfPersons = persons.length
      res.send(`Phonebook has info for ${numberOfPersons} people`)
})

router
  .route('/persons/:id')
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;

      // Check if the provided ID is a valid ObjectId or numeric
      if (!ObjectId.isValid(id) && isNaN(Number(id))) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      let query;

      if (ObjectId.isValid(id)) {
        query = { _id: mongoose.Types.ObjectId(id) };
      } else {
        query = { id: Number(id) }; // assuming it's a valid numeric ID
      }

      const person = await Person.findOne(query);

      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }

      res.json(person);
    } catch (error) {
      console.error('Error fetching person by ID:', error);

      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  .delete(async (req, res) => {
    Person.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(204).end()
      })
    .catch(error => next(error))
  })
  .put(async (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }
      
    Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
  })

// const savePersonsToFile = (array) => {
//     fs.writeFileSync('./persons.json', JSON.stringify(array, null, 2));
// };

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

router.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.number === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

router.use(errorHandler)


module.exports = router