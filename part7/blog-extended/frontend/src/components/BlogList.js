import React from 'react'
import { useSelector } from 'react-redux'


const BlogList = () => {

  const blogs = useSelector(state => state.blogs)





  return (
    <>
      <h2>blogs</h2>
      {blogs.sort((b, a) => a.likes - b.likes).map(blog => <li key={blog.id}><a href={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</a></li>)}
    </>
  )
}

export default BlogList;
