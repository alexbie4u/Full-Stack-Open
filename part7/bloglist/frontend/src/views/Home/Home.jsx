import Togglable from "../../components/Togglable"
import NewBlogForm from "../../components/Blogs/NewBlogForm"
import { useRef, useEffect } from "react"
import BlogList from "../../components/Blogs/BlogList"
import { useQuery } from '@tanstack/react-query'
import requestService from "../../services/requests"
import { useUserValue, useUserDispatch } from "../../reducers/UserContext"
import { useNotificationDispatch } from "../../reducers/NotificationContext"
import { handleLogin, handleLogout } from "../../reducers/UserContext"
import { Button } from "react-bootstrap"
import LoginForm from "../../components/loginForm"
import Notification from "../../components/Notification"

const Home = () => {
    const newBlogFormRef = useRef()
    const user = useUserValue()
    const userDispatch = useUserDispatch()
    const notificationDispatch = useNotificationDispatch()


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
      
        if (loggedUserJSON) {
          const storedUser = JSON.parse(loggedUserJSON);
      
          try {
            handleLogin({
              username: storedUser.username,
              password: 'thisismypassword',
              notificationDispatch,
              userDispatch,
            });
      
          } catch (error) {
            console.error('Error during automatic login:', error);
          }
        }
    }, [userDispatch, notificationDispatch]);

    const result = useQuery ({
        queryKey: ['blogs'],
        queryFn: requestService.getBlogs
      })
    
    if (result.isLoading) { 
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return <div>Error loading data...</div>;
    }
    
    const blogs = result.data

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
          <Notification/>
    
        <h2>Submit your blog</h2>
          <Togglable buttonLabel="Create new blog" buttonId="createNewBlogButton1" ref={newBlogFormRef}>
            <NewBlogForm />
          </Togglable>
    
            <BlogList blogs={blogs}/>
    
            <div className="user-info">
        <p>{user.name} logged in</p>
        <Button variant="primary" type="submit" onClick={() => handleLogout(notificationDispatch, userDispatch)}>
          Logout
        </Button>
       </div>
    
        </div>  
    )
}

export default Home