import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
const Blog = ({ blog, incrementLike, remove }) => {

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
        <button style={titleStyle} onClick={handleVisibility} className='showBlogButton'>{blog.title} <b>{blog.author}</b>
        </button>
      </div>
      {visible
        ?
        <div className="togglableContent">
          <div>
            {blog.url}
          </div>

          <div>
            likes: {blog.likes} <button id='like' style={buttonStyle} onClick={incrementLike}>like</button>
          </div>



          <button style={buttonStyle} onClick={remove}>remove</button>
        </div>
        :
        null
      }

    </div>
  )
}

const BlogList = () => {
  let timeOutId = 0
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)



  const likeBlog = async (blog) => {
    dispatch(like(blog))
    await dispatch(setNotification({ type: 'success', text: `You liked "${blog.title}"` }, 5, timeOutId))
  }
  const removeBlog = async (blog) => {
    console.log(blog)

    try {


      if (!window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) return

      dispatch(remove(blog))
      dispatch(setNotification({ type: 'success', text: `Blog ${blog.title} removed succesfully!` }, 5, timeOutId))
    } catch (e) {
      dispatch(setNotification({ type: 'error', text: `Could not remove blog ${blog.title}. Error ${e})` }, 5, timeOutId))
    }
  }




  return (
    <>
      <h2>blogs</h2>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          incrementLike={() => likeBlog(blog)}
          remove={() => removeBlog(blog)}
        />
      )}
    </>
  )
}

export default BlogList;
