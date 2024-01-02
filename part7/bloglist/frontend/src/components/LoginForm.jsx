import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { handleLogin, useUserDispatch } from '../reducers/UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const login = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      await handleLogin({
        username: username,
        password: password,
        notificationDispatch,
        userDispatch,
      });
  
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  return (
    <div>
      <h2>Log in to application</h2>
      <form className='login' onSubmit={login}>
        <ul>
          <li>
            <label htmlFor="username">Username: </label>
            <input
              id='username'
              className='login'
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password: </label>
            <input
              id='password'
              className='login'
              type="password"
              value={password}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li className="button">
            <Button id="login-button" type="submit">login</Button>
          </li>
        </ul>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired
// }

export default LoginForm