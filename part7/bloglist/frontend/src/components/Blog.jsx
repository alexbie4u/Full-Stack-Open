import { useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateBlog, deleteBlog } from "../reducers/blogReducer"
import setNotification from "../utils/notificationUtils"

const BlogDetails = ({ blog, showDeleteButton }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(updateBlog(blog))
    dispatch(setNotification(`You upvoted "${blog.title}". It now has ${blog.likes + 1} likes`, 5))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
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
    &quot;{blog.title}&quot; - {blog.author}

        <Button variant="primary" size="sm" id='show-details-btn' onClick={() => setBlogVisible(!blogVisible)}>
          { blogVisible ? 'Hide \u2191' : 'Show details \u2193' }
        </Button>
        {blogVisible && <BlogDetails blog={blog} showDeleteButton={showDeleteButton}/>}

      </div>
    </div>
  )
}

export default Blog