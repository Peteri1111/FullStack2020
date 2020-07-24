const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else { response.status(404).end() }
}
)

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  }





  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())

    })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const savedBlog = await blog.save()

  response.json(savedBlog.toJSON())

}
)
module.exports = blogsRouter