import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            console.log('Action payload: ' + action.payload);
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer