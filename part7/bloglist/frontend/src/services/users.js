import axios from "axios"
const baseUrl = 'http://localhost:3003/api/users'


export const getUsers = async () =>
  axios.get(baseUrl).then(res => res.data)

const usersService = { getUsers }
export default usersService