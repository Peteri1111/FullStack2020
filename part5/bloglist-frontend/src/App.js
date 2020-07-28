import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'
import NotificationWindow from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {


  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null) //success, fail

  const notificationSetter = (text, type, timeout) => {
    setNotification(text)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, timeout)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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


  return (
    <>
      <NotificationWindow notification={notification} notificationType={notificationType} />
      {
        user === null
          ?
          <LoginForm
            setUser={setUser}
            notificationSetter={notificationSetter}
          />
          :
          <>
            <h2>blogs</h2>
            <p>{`${user.username} logged in`} <LogoutButton setUser={setUser} /></p>
            <Togglable buttonLabel='new note' ref={blogFormRef}>
              <BlogForm
                setBlogs={setBlogs}
                blogs={blogs}
                notificationSetter={notificationSetter}
                blogFormRef={blogFormRef} />
            </Togglable>
            {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
              <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
            )}
          </>
      }
    </>

  )
}

export default App