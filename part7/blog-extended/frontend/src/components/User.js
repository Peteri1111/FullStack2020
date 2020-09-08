import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogView = ({ userBlogs }) => (
  <>
    <h3>Added blogs</h3>

    <ul>
      {userBlogs.map(blog =>
        <li key={blog.id}><a href={`/blogs/${blog.id}`}>{blog.title}</a></li>)}
    </ul>

  </>

)
const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users.users)
  if (!users) return null
  const user = users.find(u => u.id === id)



  return (
    user
      ?
      <>
        <h2>{user.username}</h2>
        <BlogView userBlogs={user.blogs} />
      </>
      :
      null
  )
}


export default User