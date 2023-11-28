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
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter
  .get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})
  .delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
    }

    const user = req.user
    const blog = await Blog.findById(req.params.id)
    
    if (!blog) {
      res.status(204).end()
    } else if (user && user.toString() === decodedToken.id.toString() ) {
      await Blog.findByIdAndDelete(req.params.id)  
      res.status(204).end()
    } else {
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