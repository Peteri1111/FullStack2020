import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {

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
    createBlog({

      title: title,
      author: author,
      url: url,

    })
    setTitle('')
    setAuthor('')
    setUrl('')
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