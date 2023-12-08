import Anecdotes from './components/Anecdotes.jsx'
import NewAnecdote from './components/NewAnecdote.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes.js'
import { setAnecdotes } from './reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <NewAnecdote />
      <Notification />
    </div>
    
  )
}

export default App