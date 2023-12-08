import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
      notify(state, action) {
        console.log(action.payload);
        return action.payload
      },
      remove() {
        return ''
      },
    }
  })

export const { notify, remove } = notificationSlice.actions
export default notificationSlice.reducer