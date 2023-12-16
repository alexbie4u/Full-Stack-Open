const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper.js')
const api = supertest(app)
const Blog = require('../models/blog')

const testBlog = new Blog({
  "title": "String",
  "author": "String",
  "url": "https://kissmypiss.com/"
})

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is returned as id rather than _id', async () => {
    const res = await api.get ('/api/blogs')
    console.log('The ID of the first entry: ' + res.body[0].id);
    expect(res.body[0].id).toBeDefined()
})

describe('POST api/blogs', () => {
  test('if the likes property is missing, default to the value 0', async () => {
    const res = await api.post('/api/blogs').send({
      "title": "String",
      "author": "String",
      "url": "https://kissmypiss.com/"
    })

    expect(res.body.likes).toBe(0)
      
    console.log(res.body);
  })
  test('if title or url missing, return status 400 Bad Request', async () => {
    const res = await api.post('/api/blogs').send({
      "author": "String",
      "likes": 42069
    })
    expect(res.statusCode).toBe(400)
    console.log(res.statusCode);
    expect(res.body.title).not.toBeDefined()
    expect(res.body.url).not.toBeDefined()
  })
})

describe('Creating and deleting a blog entry', () => {
  test('Creating a blog entry', async () => {
    let res = await api.post('/api/blogs').send({
      "title": "React patterns",
      "author": "Michael Chan",
      "url": "https://reactpatterns.com/",
      "likes": 7,
      "id": "5a422a851b54a676234d17f7"
    })
    expect(res.body.id).toBeDefined()
  })

  test('Deleting the entry', async () => {
    let res = await api.delete('/api/blogs/5a422a851b54a676234d17f7')

    expect(res.body.id).not.toBeDefined()
  })
})

describe('Updating a blog entry', () => {
  test('Updating a blot entry', async () => {
    const updatedBlog = {
      title: 'Updated Blog Title',
      author: 'Updated Author',
      url: 'https://updatedurl.com',
      likes: 11,
    };

  const res = await api
    .put('/api/blogs/5a422bc61b54a676234d17fc')
    .send(updatedBlog)
    .expect(200);

  // Add assertions to check if the blog was updated successfully
  expect(res.body.title).toBe(updatedBlog.title);
  expect(res.body.author).toBe(updatedBlog.author);
  expect(res.body.url).toBe(updatedBlog.url);
  expect(res.body.likes).toBe(updatedBlog.likes);
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
