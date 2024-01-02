const Blog = require('../models/blog.js')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware.js')
const jwt = require('jsonwebtoken')

blogsRouter
  .get('/', async (req, res) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
      res.json(blogs)
  })  

  .post('/', async (req, res) => {
  const body = req.body


  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
  })

  .post('/:id/comments', async (request, response) => {
  // verify(request, response)

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    const comment = request.body.comment
    const newBlog = {
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": blog.likes,
      "comments": blog.comments.concat(comment)
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, newBlog, { new: true }
    )
    response.json(updatedBlog.toJSON())
  }

  response.status(404).end()
})

blogsRouter
  .get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})
  .delete('/:id', async (request, response) => {
      //Find out if token is valid
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //Search user of the blog
    const blog = await Blog.findById(request.params.id)

    if(!blog) {
      response.status(204).end() // If it doesn't exist the result is the same (blog deleted)
    } else if ( blog.user && blog.user.toString() === decodedToken.id.toString() ) {
      //If user of the blog exists and is the same as the one in the token
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else{
      //Error: not authorized
      response.status(403).json({ error: 'Not Authorized: only creator can delete the blog' })
    }

})

  .put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
      "title": body.title,
      "author": body.author,
      "url": body.url,
      "likes": body.likes,
    };
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
    
  })
blogsRouter.use(middleware.unknownEndpoint)
blogsRouter.use(middleware.errorHandler)

module.exports = blogsRouter