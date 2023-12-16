import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import setNotification from "../utils/notificationUtils"

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (blog) => {
  return{
    content: blog,
    id: getId(),
    votes: 0
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id;
      const blogToVoteUp = state.find(blog => blog.id === id)
        if (blogToVoteUp) { blogToVoteUp.likes += 1; }
      state.sort((a, b) => b.likes - a.likes)
    },
    append(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      state = action.payload
      state.sort((a, b) => b.likes - a.likes)
      return state
    },
    del(state, action) {
      if (window.confirm(`Delete '${action.payload.title}?`)) { 
        blogService.del(action.payload.id)}

    },
  }
})

export const { create, vote, append, setBlogs, del } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
      try {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
        console.log('INITIALIZING');
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  };

export const createBlog = content => {
  return async dispatch => {
    try {
        const newBlog = await blogService.create(content)
        dispatch(create(newBlog))
        dispatch(setNotification(`Created new blog "${newBlog.title}"`), 5)
        dispatch(initializeBlogs())
    } catch (error) {
        console.log('Error: ' + error);
        dispatch(setNotification(`Unable to create new Blog. Error: ${error}`, 5))
    }
    
  }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        try {
          dispatch(del( id ))
          dispatch(initializeBlogs());
          dispatch(setNotification('Blog has been deleted', 5))
        } catch (error) {
          dispatch(setNotification(`Unable to delete Blog. ${error}`, 5))
        }
    }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const { id, likes } = blog
    console.log('blog.id: ' + blog.id);
    console.log('blog.likes: ' + blog.likes);
    const changedBlog = {...blog, likes: likes + 1}
    await blogService.update(id, changedBlog)
    dispatch(vote({ id }))
  }
}

export default blogSlice.reducer