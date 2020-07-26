
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)



describe('initially one user in the database', () => {
  beforeEach(async () => {
    //Empty database
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('kebap', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('adding a new valid user to the database', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'peterii',
      name: 'Petteri S',
      password: 'impossibru'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails when trying to add already existing username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Megaman',
      password: 'something'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails when trying to add too short username', async () => {
    const initialUsers = await helper.usersInDb()

    const user = {
      username: 'aa',
      password: 'abcd',
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('username must be at least 3 characters')
    expect(initialUsers.length).toBe((await helper.usersInDb()).length)

  })

  test('fails when trying to add too short password', async () => {
    const initialUsers = await helper.usersInDb()

    const user = {
      username: 'aabcdsf',
      password: 'ab',
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('Password must be at least 3 characters')
    expect(initialUsers.length).toBe((await helper.usersInDb()).length)
  })


})
afterAll(() => {
  mongoose.connection.close()
})