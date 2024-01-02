import axios from "axios"

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () =>
  axios.get(baseUrl).then(res => res.data)

export const createBlog = async ({ newBlog }) => {
  const config = {
    headers: { Authorization: token },
  }

  const req = await axios.post(baseUrl, newBlog, config).then(req => req.data)
  return req.data
}

export const update = updatedBlog =>
  axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog).then(res => res.data)

export const del = blog => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.delete(`${baseUrl}/${blog.id}`, config);
};

export const addComment = async ({ comment, id }) => {
  const config = {
    headers: { Authorization: token },
  };

  const req = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config).then(req => req.data);
  return req.data;
};

const requestService = { setToken, getBlogs, createBlog, update, del, addComment }
export default requestService