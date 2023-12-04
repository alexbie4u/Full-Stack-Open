import Blog from "./Blog"
import React from "react"

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => (
    <div>
        <h2>Blog list</h2>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDeleteButton={(blog.user && user === blog.user.username)}/>
        )}
    </div>
)

export default BlogList