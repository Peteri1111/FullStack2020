import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'



const LoginForm = ({ notificationSetter, setUser }) => {

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      notificationSetter('Invalid username or password', 'error', 5000)
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