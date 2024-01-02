import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNotificationDispatch } from "../../reducers/NotificationContext"
import { useMutation } from "@tanstack/react-query"
import requestService from "../../services/requests"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const BlogDetails = ({ blog, showDeleteButton }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateBlogMutation = useMutation({
    mutationFn: requestService.update,
      onSuccess: () => {
        queryClient.invalidateQueries(['blogs'])
      },
    })

  const deleteBlogMutation = useMutation ({
    mutationFn: requestService.del,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })
  
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(updatedBlog)
    notificationDispatch(`You upvoted "${updatedBlog.title}". It now has ${updatedBlog.likes} likes`)
  }

  const handleDelete = () => {
    console.log('delete test');
    deleteBlogMutation.mutate(blog)
    notificationDispatch(`You deleted "${blog.title}".`)
  }

  return (
    <div className='blogDetails'>
      <a href={blog.url}>{blog.url}</a> <br/>
        Like count: {blog.likes}  
          <Button variant="primary" 
            size="sm" 
            onClick={handleLike} 
            id='likeBtn' 
            className='likeButton'>Like &#128077; 
          </Button><br/>
        {(blog.user) && <div>Added by: {blog.user.name} </div>}
      {showDeleteButton && 
        <Button 
          variant="primary" 
          size="sm" 
          className='deleteBtn' 
          id={blog.id} 
          name={'"' + (blog.title) + '"' + ' (by ' + (blog.author) + ')'} 
          onClick={() => handleDelete(blog)}
          >Remove &#128465; 
        </Button>}
    </div>
  )
}

const Blog = ({ blog, showDeleteButton }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        &quot;<Link to={`/blogs/${blog.id}`}>{blog.title}</Link> &quot; - {blog.author}

        {/* <Button variant="primary" size="sm" id='show-details-btn' onClick={() => setBlogVisible(!blogVisible)}>
          { blogVisible ? 'Hide \u2191' : 'Show details \u2193' }
        </Button>
        {blogVisible && <BlogDetails blog={blog} showDeleteButton={showDeleteButton}/>} */}

      </div>
    </div>
  )
}

export default Blog