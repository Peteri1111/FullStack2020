import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/resources'

import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'


const LoginForm = () => {


  let timeOutId = 0
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      await dispatch(setUser(user))
      timeOutId = dispatch(setNotification({ type: 'success', text: `${user.username} logged in!` }, 5, timeOutId))


    } catch (exception) {
      console.log(exception)
      timeOutId = dispatch(setNotification({ type: 'error', text: 'Invalid username or password' }, 5, timeOutId))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <p>
        Username
      <input
          type="text"
          value={username}
          id="usernameField"
          name="Username"
          onChange={handleUsernameChange} />
      </p>
      <p>
        Password
      <input
          type="password"
          id="passwordField"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </p>
      <button type="submit" id="loginButton">Login</button>

    </form>
  )
}


export default LoginForm