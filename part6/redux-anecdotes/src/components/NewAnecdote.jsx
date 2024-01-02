import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';
import { createAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value.trim(); // Trim to handle empty string
        dispatch(createAnecdote(content))
        setNotification(`You created the blog entry "${content}".`, 5)(dispatch)
        event.target.anecdote.value = '';
      };

return(
    <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>add</button>
    </form>
)
}

export default NewAnecdote
