const testHelper = require('../tests/test_helper')

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const arrayOfLikes = testHelper.totalLikes(testHelper.listWithOneBlog)
    const result = testHelper.sum(arrayOfLikes)
    expect(result).toBe(5)
  })

  test('when the list has several blog inputs', () => {
    const result = testHelper.sum(testHelper.totalLikes(testHelper.initialBlogs))
    expect(result).toBe(36)
  })

  test('return the blog with the most likes', () => {
    const blogs = testHelper.initialBlogs
    const result = testHelper.favouriteBlog(blogs)
    const testResult = {
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes, 
    }
    expect(result).toEqual(testResult)
  })
})