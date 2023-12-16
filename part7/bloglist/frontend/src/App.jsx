import BlogList from './components/BlogList'
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import NewBlogForm from './components/NewBlogForm'
import { Button } from 'react-bootstrap'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { handleLogin, handleLogout, selectUser } from './reducers/userReducer'


const App = () => {
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const newBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('Logged User JSON: ' + loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(handleLogin({
        username: username,
        password: password}));
      console.log('User: ' + user)
      console.log('User username: ' + user.username);
      console.log('User password: ' + user.password);
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <h1>Welcome to Blogs!</h1>
        <LoginForm />
      </div>
    )
  }

  return(
    <div className="container">
    <p>{user.name} logged in</p>
      
      <h3>Logout here:</h3>

      <Button variant="primary" type="submit" onClick={handleLogout}>Logout</Button>

      <Notification/>
      
      <h2>Submit your blog</h2>
      <Togglable buttonLabel="Create new blog" buttonId="createNewBlogButton1" ref={newBlogFormRef}>
        <NewBlogForm />
      </Togglable>

      <BlogList user={user.username}/>
      
    </div>
  )
}

export default App