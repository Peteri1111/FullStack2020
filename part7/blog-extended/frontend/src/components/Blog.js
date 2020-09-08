import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  let timeOutId = 0
  const dispatch = useDispatch()


  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  if (!blog) return null


  const likeBlog = async (blog) => {
    console.log(blog)
    dispatch(like(blog))
    timeOutId = await dispatch(setNotification({ type: 'success', text: `You liked "${blog.title}"` }, 5, timeOutId))
  }
  const removeBlog = async (blog) => {
    console.log(blog)
    try {
      if (!window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) return
      dispatch(remove(blog))
      timeOutId = dispatch(setNotification({ type: 'success', text: `Blog ${blog.title} removed succesfully!` }, 5, timeOutId))
    } catch (e) {
      timeOutId = dispatch(setNotification({ type: 'error', text: `Could not remove blog ${blog.title}. Error ${e})` }, 5, timeOutId))
    }
  }


  return (

    <div className='blog'>
      <div>
        {blog.title} <b>{blog.author}</b>

      </div>

      <div className="togglableContent">
        <div>
          {blog.url}
        </div>

        <div>
          likes: {blog.likes} <button id='like' onClick={() => likeBlog(blog)}>like</button>
        </div>



        <button onClick={() => removeBlog(blog)}>remove</button>
      </div>



    </div>
  )
}

export default Blog