import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = ({
      title: title,
      author: author,
      url: url
    })
    dispatch(createBlog(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  // const addBlog = async (event) => {

  //   })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return(
    <div><h2>Create new Blog</h2>
    <form onSubmit={handleSubmit} id='newBlogForm'>
      <ul>
        <li>
          <label htmlFor="title">Title:</label>

          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </li>
        <li>
          <label htmlFor="author">Author:</label>
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </li>
        <li>
          <label htmlFor="url">url:</label>
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </li>
        <li className="button">
          <Button id='btnNewBlog' type="submit">Create</Button>
        </li>
      </ul>
    </form>
  </div>
  )
}





  // }
//   return (
//     <div><h2>Create new Blog</h2>
//       <form onSubmit={handleSubmit} id='newBlogForm'>
//         <ul>
//           <li>
//             <label htmlFor="title">Title:</label>

//             <input
//               id='title'
//               value={title}
//               onChange={handleTitleChange}
//             />
//           </li>
//           <li>
//             <label htmlFor="author">Author:</label>
//             <input
//               id='author'
//               value={author}
//               onChange={handleAuthorChange}
//             />
//           </li>
//           <li>
//             <label htmlFor="url">url:</label>
//             <input
//               id='url'
//               value={url}
//               onChange={handleUrlChange}
//             />
//           </li>
//           <li className="button">
//             <Button id='btnNewBlog' type="submit">Create</Button>
//           </li>
//         </ul>
//       </form>
//     </div>
//   )
// }

// NewBlogForm.propTypes = {
//   createNewBlog: PropTypes.func.isRequired
// }

export default NewBlogForm