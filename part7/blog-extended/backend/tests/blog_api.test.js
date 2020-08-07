const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialData } = require('./test_helper')
const api = supertest(app)

let testUser1, testUser2

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})

  //Create a database state where one person has two blogs added and other none
  testUser1 = [await User.findOne({ username: 'Markman' }), null]
  testUser1[1] = await helper.getToken(testUser1[0])
  testUser2 = [await User.findOne({ username: 'Lianto' }), null]
  testUser2[1] = await helper.getToken(testUser2[0])
  for (let blog of initialData) {
    let blogObject = new Blog(blog)
    blogObject.user = testUser1[0]._id
    const savedBlog = await blogObject.save()
    testUser1[0].blogs = testUser1[0].blogs.concat(savedBlog._id)


  }
  await testUser1[0].save()

})



describe('When there are some initial blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialData.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const urls = response.body.map(r => r.url)
    expect(urls).toContain('is this an url?')
  })
})

describe('Viewing a specific blog', () => {

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]


    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.id).toEqual(blogToView.id)
  })

})


describe('Adding of a new blog', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'How I defeated the Vortigaunts',
      author: 'Morgan Jailed',
      url: 'nonexistent',
      likes: 3,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${testUser1[1]}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)



    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialData.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain('How I defeated the Vortigaunts')


  })
  test('blog without title or is not added', async () => {

    //blog with missing title
    const newBlog = {
      'author': 'Nobody',
      'url': 'asdasd',
      'likes': 99
    }

    //blog with missing url
    const newBlog2 = {
      'author': 'Anybody',
      'title': 'kebap',
      'likes': 20

    }


    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testUser1[1]}`)
      .send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testUser1[1]}`)
      .send(newBlog2)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialData.length)

  })
  test('an added blogs default likes is 0 if undefined', async () => {
    const newBlog = {
      title: 'How I defeated the Vortigaunts',
      author: 'Morgan Jailed',
      url: 'nonexistent',
    }



    const sentBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testUser1[1]}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    expect(sentBlog.body.likes).toBe(0)

  })
  test('authorization token is required to post a blog', async () => {
    const newBlog = {
      title: 'How I defeated the Vortigaunts',
      author: 'Morgan Jailed',
      url: 'nonexistent',
      likes: 3,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)



    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialData.length)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).not.toContain('How I defeated the Vortigaunts')

  })
})

describe('deletion of a blog', () => {

  test('a blog can be deleted (code 204)', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = await blogsAtStart[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${testUser1[1]}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialData.length - 1)
  })

  test('unable to delete other persons blog (401)', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = await blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${testUser2[1]}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialData.length)
  })
})

describe('Modifying a blog', () => {
  test('likes can be adjusted in a existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = await blogsAtStart[0]
    const originalLikes = blogToUpdate.likes
    blogToUpdate.likes += 10

    const token = testUser1[1]

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)

      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(originalLikes + 10)
  })
})

describe('valid data types/names', () => {
  test('identifying field should be named id', async () => {
    const response = await api.get('/api/blogs')

    const data = response.body

    expect(data[0].id).toBeDefined()
    expect(data[0]._id).toBeUndefined()


  })
})

afterAll(() => {
  mongoose.connection.close()
})
