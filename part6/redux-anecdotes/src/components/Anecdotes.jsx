import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content} <br />
      has <strong> {anecdote.votes} </strong> votes. 
      <button onClick={handleClick}> Vote </button>
    </li>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if ( filter === '') {
      return anecdotes
      
    }
    return anecdotes.filter(anecdote => {return anecdote.content.toLowerCase().includes(filter)})
    
  })

  const dispatch = useDispatch()

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(updateAnecdote(anecdote))
            dispatch(setNotification(`You upvoted "${anecdote.content}". It now has ${anecdote.votes + 1} votes`, 5))
          }}
        />
      )}
    </ul>
)}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default Anecdotes