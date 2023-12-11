import axios from "axios";

const baseUrl = 'http://localhost:3000/anecdotes'


export const fetchAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  return axios.post(baseUrl, newAnecdote)
  .then(res => res.data)
}

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)