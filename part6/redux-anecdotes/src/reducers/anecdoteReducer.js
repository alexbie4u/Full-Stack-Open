import { createSlice } from "@reduxjs/toolkit"


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
      console.log(action);
      const id = action.payload.id;
      const anecdoteToVoteUp = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVoteUp) {
        anecdoteToVoteUp.votes += 1;
        state.sort((a, b) => b.votes - a.votes)
      }
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
export default anecdoteSlice.reducer