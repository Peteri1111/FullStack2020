const Blog = require('../models/blog')


/*eslint-disable */
const initialData = [
  {
    "title": "The end of our days",
    "author": "Markku Menman",
    "url": "asdsadasdasd",
    "likes": 1,
  },
  {
    "title": "What is life",
    "author": "Nobody",
    "url": "is this an url?",
    "likes": 15,
  }
]
/*eslint-enable */

const nonExistingId = async () => {
  const blog = new Blog({ content: "none" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialData, nonExistingId, blogsInDb
}