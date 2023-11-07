import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
  axios
  .get('http://localhost:3001/persons')
  .then(response => {
    console.log('promise fulfilled')
    setPersons(response.data)
    })
  }, [])


  // Dealing with the submit
  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      }
    }  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const keyword = event.target.value;
    setFilterText(keyword);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons person={persons} filteredPersons={filteredPersons}/>
    </div>
  )
}


export default App