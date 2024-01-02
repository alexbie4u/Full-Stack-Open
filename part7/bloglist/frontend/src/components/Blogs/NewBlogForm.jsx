import React, { useState, useContext } from 'react'
import { createBlog } from '../../services/requests'
import { Button, Form} from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../../reducers/NotificationContext'

const NewBlogForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = ({
      title: title,
      author: author,
      url: url
    })
    newBlogMutation.mutate({ newBlog })
    
    notificationDispatch({ type: "NOTIFICATION", payload: `You created the blog "${newBlog.title}"`})
    setTitle('')
    setAuthor('')
    setUrl('')
  }



  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create new Blog</h2>
      <Form onSubmit={handleSubmit} id="newBlogForm">
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => handleChange(e, setTitle)}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => handleChange(e, setAuthor)}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => handleChange(e, setUrl)}
          />
        </Form.Group>
        <Button id="btnNewBlog" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default NewBlogForm