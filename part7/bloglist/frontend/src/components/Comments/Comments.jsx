import React from 'react'

import CreateComment from "./CreateComment"
import Togglable from "../Togglable"

const Comment = ({ comment }) => (
    <div>
        <ul>
        {comment}
        </ul>
  </div>
)

const Comments = ({ blog }) => (
  <div>
    
    <div>
      <ul>
        {
          blog.comments.map((comment, index) =>
            <Comment key={index} comment={comment} />)
        }
      </ul>
      
      <div>
      <Togglable buttonLabel='add comment'>
        <CreateComment blog={blog} />
      </Togglable>
      </div>

    </div>
  </div>
)


export default Comments