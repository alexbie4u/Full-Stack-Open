import React, { useState } from 'react'
import { addComment } from '../../services/requests'
import { Button } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../../reducers/NotificationContext'
import { useParams } from 'react-router-dom'

const CreateComment = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const {id} = useParams()

  const [comment, setComment] = useState('')

  const newCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    newCommentMutation.mutate({ comment, id })
    
    notificationDispatch({ type: "NOTIFICATION", payload: `You added the comment "${comment}"`})
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return(
    <div><p>Create new comment</p>
    <form onSubmit={handleSubmit} id='newCommentForm'>
      <ul>
        <ul>
          <label htmlFor="comment"></label>

          <input
            id='comment'
            value={comment}
            onChange={handleCommentChange}
          />
        </ul>
        <ul className="button">
          <Button id='btnNewComment' type="submit">Add</Button>
        </ul>
      </ul>
    </form>
  </div>
  )
}

export default CreateComment