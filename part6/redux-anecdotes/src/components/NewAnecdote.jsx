import { create } from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'
import setNotification from "../utils/notificationUtils";
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value.trim(); // Trim to handle empty string
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
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
