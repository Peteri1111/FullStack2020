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



  const removeBlog = async (id) => {
    let blog;
    try {
      blog = blogs.find(b => b.id === id)

      if (!window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) return

      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notificationSetter(`Blog ${blog.name} removed succesfully!`, 'success', 5000)
      console.log('i was here')
    } catch (e) {
      notificationSetter(`Could not remove blog ${blog.name}. Error ${e})`, 'error', 5000)
    }
  }
  const incrementLike = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const incrementedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(blog.id, incrementedBlog)
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
    } catch (e) {
      console.log(e)
    }

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
              <Blog key={blog.id} blog={blog} incrementLike={() => incrementLike(blog.id)} removeBlog={() => removeBlog(blog.id)} />
            )}
          </>
      }
    </>

  )
}

export default App