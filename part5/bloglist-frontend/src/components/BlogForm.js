import React, { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ setBlogs, blogs, notificationSetter, blogFormRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }
  const addBlog = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,

      }

      const returnedBlog = await blogService
        .create(blogObject)
      await setBlogs(blogs.concat(returnedBlog))
      notificationSetter(`Blog ${title} posted succesfully!`, 'success', 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      notificationSetter('Please fill all the given fields', 'error', 5000)
    }

  }

  return (
    <>
      <h2>Post a new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          title
          <input
            value={title}
            type="text"
            name="Title"
            onChange={handleTitleChange} />
        </p>
        <p>
          author
          <input
            value={author}
            type="text"
            name="Author"
            onChange={handleAuthorChange} />
        </p>
        <p>
          url
          <input
            value={url}
            type="text"
            name="Url"
            onChange={handleUrlChange} />
        </p>
        <button type="submit">submit blog</button>
      </form >
    </>
  )
}

export default BlogForm