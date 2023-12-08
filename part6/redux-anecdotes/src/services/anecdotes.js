import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0 }
    const res = await axios.post(baseUrl, object)
    return res.data
}

export default { 
    getAll,
    createNew, 
}