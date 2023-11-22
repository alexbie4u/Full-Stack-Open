const dummy = (blogs) => 1
  
const totalLikes = blogs => blogs.map((blog) => blog.likes)

const average = likes => likes.reduce((a, b) => a + b) / likes.length

const sum = likes => likes.reduce((a, b) => a + b)

const favouriteBlog = blogs => blogs.reduce((maxBlog, currentBlog) => {
  // Compare the likes of the currentBlog with the likes of maxBlog
  if (maxBlog.likes < currentBlog.likes) {
    maxBlog = {
      title: currentBlog.title,
      author: currentBlog.author,
      likes: currentBlog.likes,
    }
  } 
  return maxBlog

}, blogs[0])

module.exports = {
  dummy,
  totalLikes,
  average,
  sum,
  favouriteBlog
}