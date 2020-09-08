import React, { useEffect, useRef } from 'react'

import blogService from './services/resources'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'
import NotificationWindow from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Link, Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import User from './components/User'



const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()



  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const user = useSelector(state => state.users.activeUser)
  const padding = {
    padding: 5
  }

  return (

    <>
      <div>
        <Link style={padding} to="/users">Users</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/">home</Link>
      </div>

      <h1>Blog app</h1>
      <NotificationWindow />
      {
        user === null
          ?
          <div>
            <Togglable buttonLabel='login'>
              <LoginForm />
            </Togglable>
          </div>
          :
          <div>
            <p>{`${user.username} logged in`} <LogoutButton /></p>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>

              <BlogForm />

            </Togglable>
          </div>
      }


      <Switch>

        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/blogs'>
          <BlogList />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>

      </Switch>
    </>


  )
}

export default App