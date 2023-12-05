import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    console.log("CREATE request headers:", config.headers);
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const del = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log("DELETE request headers:", config.headers);

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const blogService = { getAll, create, update, del, setToken }
export default blogService