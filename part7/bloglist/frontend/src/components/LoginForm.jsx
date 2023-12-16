import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { handleLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault();
    dispatch(handleLogin({
      username: username,
      password: password}));
    setUsername('');
    setPassword('');
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