import axios from 'axios'
const baseUrl = 'api/persons'



const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data)
}

const update = (_id, newObject) => {
  return axios
  .put(`${baseUrl}/${_id}`, newObject)
  .then(response => response.data)
}

const deletePerson = (_id) => {
  return axios
  .delete(`${baseUrl}/${_id}`)
  .then(response => response.data)
  
}

export default { getAll, create, update, deletePerson }

// somehow retrieve the right ID to send the right HTTP request.