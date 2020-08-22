import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  let timeOutId = 0

  const dispatch = useDispatch()


  const addBlog = async (e) => {
    e.preventDefault()


    try {
      await dispatch(createBlog({
        title: title,
        author: author,
        url: url,
      }))
      timeOutId = dispatch(setNotification({ type: 'success', text: `Blog ${title} posted succesfully!` }, 5, timeOutId))
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (e) {
      timeOutId = dispatch(setNotification({ type: 'error', text: 'Please fill all the given fields' }, 5, timeOutId))
    }
  }
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



  return (
    <>
      <h2>Post a new blog</h2>
      <form onSubmit={(e) => addBlog(e)}>
        <p>
          title
          <input
            value={title}
            type="text"
            name="Title"
            id="title"
            onChange={handleTitleChange} />
        </p>
        <p>
          author
          <input
            value={author}
            type="text"
            name="Author"
            id="author"
            onChange={handleAuthorChange} />
        </p>
        <p>
          url
          <input
            value={url}
            type="text"
            name="Url"
            id="url"
            onChange={handleUrlChange} />
        </p>
        <button type="submit" id="submitBlog">submit blog</button>
      </form >
    </>
  )
}

export default BlogForm