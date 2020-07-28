import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs }) => {


  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleVisibility = () => {
    setVisible(!visible)
  }


  //i think this should be in the parent component?
  const removeBlog = async () => {

    if (!window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) return
    console.log('you want to remove!')

    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))


  }



  const incrementLike = async () => {
    try {
      const blogObject = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: likes + 1,
        user: blog.user
      }
      await blogService.update(blog.id, blogObject)
      setLikes(likes + 1)
    } catch (e) {
      console.log(e)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const titleStyle = {
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
    fontWeight: 'bold'
  }
  const buttonStyle = {
    color: 'white',
    background: 'blue',
    fontWeight: 'bold'

  }
  return (

    <div style={blogStyle}>
      <div>
        <button style={titleStyle} onClick={handleVisibility}>{blog.title}</button>
      </div>
      {visible
        ?
        <>
          <div>
            {blog.url}
          </div>

          <div>
            {likes}<button style={buttonStyle} onClick={incrementLike}>like</button>
          </div>

          <div>
            {blog.author}
          </div>

          <button style={buttonStyle} onClick={removeBlog}>remove</button>
        </>
        :
        null
      }

    </div>
  )
}

export default Blog
