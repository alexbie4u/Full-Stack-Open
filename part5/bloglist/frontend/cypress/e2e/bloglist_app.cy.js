describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alex',
      username: 'alexb4u',
      password: 'thisismypassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5174')
  })

  it('front page can be opened', function() {
    cy.contains('Welcome to Blogs!')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // cy.contains('log in').click()
      cy.get('#username').type('alexb4u')
      cy.get('#password').type('thisismypassword')
      cy.get('#login-button').click()

    cy.contains('Alex logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'alexb4u', password: 'thisismypassword' })

      cy.createBlog({
        title: 'The Perks of Being a Wallflower',
        author: 'Emma Watson',
        url: 'www.blank.org',
        likes: 12
    })
    })

    it('A blog can be created', function() {
      cy.get('#createNewBlogButton1').click()
      cy.get('#title').type('Title of Blog')
      cy.get('#author').type('Author of the Blog')
      cy.get('#url').type('url')
      cy.get('#btnNewBlog').click()
    })

    it('A user can like a blog entry', function() {
      cy.get('#show-details-btn').click()
      cy.contains('Like count: 12')
      cy.get('.likeButton').click()
      cy.contains('Like count: 13')
    })

    it('A user can delete their own blog entries', function() {
      cy.get('#show-details-btn').click()
      cy.get('.deleteBtn').click()
    })
  })

  describe('and there are several blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog with no likes',
          author: 'Cypress author',
          url: 'http://cypresstestingblogapp.nice',
        })
          .then(() =>
            cy.createBlog({
              title: 'Blog with 1 like',
              author: 'Cypress author',
              url: 'http://cypresstestingblogapp.nice',
              likes: 1,
            })
          )
          .then(() =>
            cy.createBlog({
              title: 'Blog with 10 likes',
              author: 'Cypress author',
              url: 'http://cypresstestingblogapp.nice',
              likes: 10,
            })
          )
  
    })  
  })

  describe('and there are several blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'alexb4u', password: 'thisismypassword' })

      cy.createBlog({
        title: 'Blog with no likes',
        author: 'Cypress author',
        url: 'http://cypresstestingblogapp.nice',
      })
        .then(() =>
          cy.createBlog({
            title: 'Blog with 1 like',
            author: 'Cypress author',
            url: 'http://cypresstestingblogapp.nice',
            likes: 1,
          })
        )
        .then(() =>
          cy.createBlog({
            title: 'Blog with 10 likes',
            author: 'Cypress author',
            url: 'http://cypresstestingblogapp.nice',
            likes: 10,
          })
        )
    })

    it.only('Blogs are sorted by the number of likes', function () {
      cy.get('.blog').then((blogs) => {
        expect(blogs[0].textContent).to.contains('Blog with 10 likes')
        expect(blogs[1].textContent).to.contains('Blog with 1 like')
        expect(blogs[2].textContent).to.contains('Blog with no likes')
      })
    })
  })
})