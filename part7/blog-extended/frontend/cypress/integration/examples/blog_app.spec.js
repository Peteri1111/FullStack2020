describe('Blog app', function () {

  const user = {
    name: 'Petteri',
    username: 'Peterii',
    password: 'pass'
  }
  const secondUser = {
    name: 'SomeoneElse',
    username: 'blank',
    password: 'shot'
  }


  const blog1 = {
    author: 'hehehehe', title: 'Kaljaa', url: 'asdad', likes: 0
  }
  const blog2 = {
    author: 'The second', title: 'ThisShouldBeSecondMostLiked', url: '1111', likes: 10
  }

  const blog3 = { author: 'The best', title: 'Mostlikes', url: 'hfghfgh', likes: 15 }


  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', secondUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('works with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#usernameField').type(user.username)
      cy.get('#passwordField').type(user.password)
      cy.get('#loginButton').click()

      cy.contains(`${user.username} logged in`)
      cy.contains('logout')
    })
    it('fails with wrong credentials', function () {

      cy.contains('login').click()
      cy.get('#usernameField').type(user.username)
      cy.get('#passwordField').type('kakka')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user)
    })

    it('a blog can be created', function () {

      cy.contains('new blog').click()
      cy.get('#title').type(blog1.title)
      cy.get('#author').type(blog1.author)
      cy.get('#url').type(blog1.url)
      cy.get('#submitBlog').click()
      cy.get('.success').should('contain', `Blog ${blog1.title} posted succesfully!`)
      cy.contains(blog1.title)


    })

    beforeEach(function () {
      cy.createBlog(blog1)
      cy.createBlog(blog2)
      cy.createBlog(blog3)

    })
    it('a blog can be liked', function () {
      cy.contains(blog1.title).click()
      cy.contains('likes: 0')
      cy.contains(blog1.title).parents().find('#like').contains('like').click()
      cy.contains('likes: 1')

    })

    it('a blog can be deleted', function () {
      cy.contains(blog1.title).click()
      cy.contains('remove').click()
      cy.contains(`Blog ${blog1.title} removed succesfully!`)
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')

    })


    it('other persons blog can not be deleted', function () {
      cy.contains('logout').click()
      cy.login({ username: 'blank', password: 'shot' })
      cy.contains('Kaljaa hehehehe').click()
      cy.contains('remove').click()
      cy.get('.error')
        .should('contain', 'Could not remove blog Kaljaa')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('.blog')
        .should('contain', 'Kaljaa')

    })

    it('blogs are ordered by likes ascending', function () {
      //open all blogs
      cy.get('.showBlogButton').then(buttons => {
        for (let i = 0; i < buttons.length; i++) {
          cy.wrap(buttons[i]).click()
        }


        cy.get('.blog').then(blogs => {
          for (let i = 0; i < blogs.length; i++) {
            cy.wrap(blogs[0]).contains('likes: 15')
            cy.wrap(blogs[1]).contains('likes: 10')
            cy.wrap(blogs[2]).contains('likes: 0')

          }
        })
      })





    })
  })
})
