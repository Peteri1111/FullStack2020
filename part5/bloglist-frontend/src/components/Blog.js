import React, { useState } from 'react'
const Blog = ({ blog, incrementLike, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
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
  }
  const buttonStyle = {
    color: 'white',
    background: 'blue',
    fontWeight: 'bold'

  }
  return (

    <div style={blogStyle} className='blog'>
      <div>
        <button style={titleStyle} onClick={handleVisibility}>{blog.title} <b>{blog.author}</b>
        </button>
      </div>
      {visible
        ?
        <>
          <div>
            {blog.url}
          </div>

          <div>
            {blog.likes}<button style={buttonStyle} onClick={incrementLike}>like</button>
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
