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

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(remove(message))
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer