import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return{
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id;
      const anecdoteToVoteUp = state.find(anecdote => anecdote.id === id)
        if (anecdoteToVoteUp) { anecdoteToVoteUp.votes += 1; }
      state.sort((a, b) => b.votes - a.votes)
    },
    append(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { create, vote, append, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const { id, votes } = anecdote
    const changedAnecdote = {...anecdote, votes: votes + 1}
    await anecdoteService.update(id, changedAnecdote)
    dispatch(vote({ id }))
  }
}


export default anecdoteSlice.reducer