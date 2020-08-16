import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutButton from './components/LogoutButton'
import NotificationWindow from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()


  let timeOutId = 0
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()





  const addBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService
        .create(blogObject)
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`Blog ${newBlog.title} posted succesfully!`, 5, timeOutId))
    } catch (e) {
      dispatch(setNotification('Please fill all the given fields', 5, timeOutId))
    }
  }




  const removeBlog = async (id) => {
    let blog;
    try {
      blog = blogs.find(b => b.id === id)

      if (!window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) return

      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotification(`Blog ${blog.title} removed succesfully!`, 5, timeOutId))
    } catch (e) {
      dispatch(setNotification(`Could not remove blog ${blog.title}. Error ${e})`, 5, timeOutId))
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
      <h1>Blog app</h1>
      <NotificationWindow />


      {
        user === null

          ?
          <>
            <Togglable buttonLabel='login'>
              <LoginForm
                setUser={setUser}

              />
            </Togglable>
          </>
          :
          <>
            <p>{`${user.username} logged in`} <LogoutButton setUser={setUser} /></p>
            <Togglable
              buttonLabel='new blog'
              ref={blogFormRef}>

              <BlogForm createBlog={addBlog} />

            </Togglable>
          </>
      }


      <h2>blogs</h2>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          incrementLike={() => incrementLike(blog.id)}
          removeBlog={() => removeBlog(blog.id)} />
      )}
    </>


  )
}

export default App