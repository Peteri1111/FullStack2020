import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'
import NotificationWindow from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'




const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()



  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const user = useSelector(state => state.user)



  return (

    <>
      <h1>Blog app</h1>
      <NotificationWindow />
      {
        user === null

          ?
          <>
            <Togglable buttonLabel='login'>
              <LoginForm />
            </Togglable>
          </>
          :
          <>
            <p>{`${user.username} logged in`} <LogoutButton /></p>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>

              <BlogForm />

            </Togglable>
          </>
      }


      <BlogList />
    </>


  )
}

export default App