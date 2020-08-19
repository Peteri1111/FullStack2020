import blogService from '../services/blogs'



const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const blogToLike = state.find(blog => blog.id === id)

      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }

      return state.map(blog => blog.id !== id ? blog : likedBlog)
    case 'REMOVE':


      return state.filter(blog => blog.id !== action.data)

    default:
      return state
  }
}




export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const like = (blogTolike) => {
  return async dispatch => {
    const blog = { ...blogTolike, likes: blogTolike.likes + 1 }
    const likedBlog = await blogService.update(blogTolike.id, blog)
    dispatch({
      type: 'LIKE',
      data: { id: likedBlog.id }
    })
  }
}

export const remove = (blogToRemove) => {
  return async dispatch => {
    await blogService.remove(blogToRemove.id)
    dispatch({
      type: 'REMOVE',
      data: blogToRemove.id
    })


  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}


export default reducer