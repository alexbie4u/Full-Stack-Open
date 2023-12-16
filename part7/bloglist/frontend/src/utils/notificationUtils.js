import { createNotification, removeNotification } from "../reducers/notificationReducer";

const setNotification = (message, seconds) => {
    return (dispatch) => {
      dispatch(createNotification(message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, seconds * 1000)
    }
  }

export default setNotification