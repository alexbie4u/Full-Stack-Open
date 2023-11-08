import { useState, useEffect, useMemo } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import noteService from './services/notes'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('');
  const deletePerson = noteService.deletePerson
  const [updateMessage, setUpdateMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);


  // Dealing with the submit
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName);
    const existingNumber = persons.find((person) => person.number === newNumber);

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Would you like to replace the old number with the new one?`)

      if (confirmUpdate) {
        const personObjectUpdate = {
          name: existingPerson.name,
          number: newNumber,
          id: existingPerson.id
        }
        noteService
          .update(existingPerson.id, personObjectUpdate)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setUpdateMessage(`You changed ${updatedPerson.name}'s number to ${newNumber} `)
            setTimeout(() => {
              setUpdateMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          
          .catch(error => {
            setErrorMessage(`Information of ${existingPerson.name} has already been deleted from the server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
      }

    } else if (existingNumber) {
      alert(`That number is already in the phonebook. Adjust the current owner of the number to proceed.`)
      setNewName('')
      setNewNumber('')

      
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
    
      noteService
        .create(personObject)  
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
        setUpdateMessage(`Added ${newName} with the number ${newNumber}`)
    }
  }  


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredPersons = useMemo(() => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [persons, filterText]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons person={persons} filteredPersons={filteredPersons} deletePerson={deletePerson}/>
      <Notification className="updateMessage" message={updateMessage} />
      <ErrorMessage className="errorMessage" message={errorMessage} />
    </div>
  )
}

export default App
