import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import NewBlogForm from './components/NewBlogForm'

import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [functionMessage, setFunctionMessage] = useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const sortingByLikes = (a, b) => (b.likes - a.likes)

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs =>
      setBlogs( blogs.sort(sortingByLikes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      Notification(`Added new blog: "${returnedBlog.title}" (by ${returnedBlog.author})`, 'notification')
    } catch (error) {
      Notification(`Unable to create new Blog. Error: ${error.response.data.error}`, 'error')
    }
    newBlogFormRef.current.toggleVisibility()
  }

  // const newBlogForm = () => (
  //   <Togglable buttonLabel="Create new blog" ref={newBlogFormRef}>
  //       <NewBlogForm createNewBlog={addBlog} />
  //     </Togglable>
  // )

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      Notification(`Error: ${error.response.data.error}`, 'error')
    }
  }

  const updateBlog = async (blogObject) => {
    const blogToUpdate = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes
    }
  
    if (blogObject.user != null) blogToUpdate.user = blogObject.user.id
    console.log(blogToUpdate)
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogToUpdate)
      
      setBlogs(blogs.map(blog => blog.id === blogObject.id ? blogObject : blog))
      console.log(`Updated: "${returnedBlog.title} (by ${returnedBlog.author})`)
    } catch (error) {
      Notification(`Unable to update Blog. Error: ${error.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (event) => {
    try {
      const id = event.target.id
      console.log('User ID: ' + id);

      if (window.confirm(`Delete '${event.target.name}'?`)) {
        const response = await blogService.del(id)
        Notification('Blog has beed deleted', 'notification')
        console.log(response)

        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      Notification(`Unable to delete Blog. Error: ${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  if (user === null) { // TODO: or user token invalid
    return (
      <div>
        <h1>Welcome to Blogs!</h1>
        <Notification message={errorMessage} />
        <Notification class="green" message={functionMessage} />
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return(
    <div>
    <p>{user.name} logged in</p>
      
      <h3>Logout here:</h3>

      <button onClick={handleLogout}>Logout</button>

      
      <h2>Submit your blog</h2>
      <Togglable buttonLabel="Create new blog" ref={newBlogFormRef}>
        <NewBlogForm createNewBlog={addBlog} />
      </Togglable>

      <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user.username}/>
      
    </div>
  )
}

export default App