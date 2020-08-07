const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialData = [
  {
    'title': 'The end of our days',
    'author': 'Markku Menman',
    'url': 'asdsadasdasd',
    'likes': 1,
  },
  {
    'title': 'What is life',
    'author': 'Nobody',
    'url': 'is this an url?',
    'likes': 15,
  }
]
const initialUsers = [
  {
    'name': 'Markku',
    'username': 'Markman',
    'password': '420noscope'
  },
  {
    'name': 'Ilmari',
    'username': 'Lianto',
    'password': 'WhatisLife?'
  },
]

const initialLoginCredentials = [
  {
    'username': 'Markman',
    'password': '420noscope'
  },
  {
    'username': 'Lianto',
    'password': 'WhatisLife?'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'none' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}



const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getToken = async (user) => {
  return jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)
}

module.exports = {
  initialData, nonExistingId, blogsInDb, usersInDb, initialUsers, initialLoginCredentials, getToken
}