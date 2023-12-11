import { createAnecdote } from "../requests"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onError: (error) => {
      notificationDispatch({ type: 'MESSAGE', payload: 'Anecdote needs to be at least 5 letters long.'})
      console.log(error);
  },
    onSuccess: (variables) => {
      notificationDispatch({type: 'MESSAGE', payload: `You created the anecdote "${variables.content}"`})
    setTimeout(() => {
      notificationDispatch({type: 'REMOVE'})
    }, 5 * 1000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
