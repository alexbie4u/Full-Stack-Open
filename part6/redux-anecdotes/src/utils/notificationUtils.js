import { notify, remove } from "../reducers/notificationReducer";

const setNotification = (message, seconds) => {
    return (dispatch) => {
      dispatch(notify(message))
      setTimeout(() => {
        dispatch(remove(message))
      }, seconds * 1000)
    }
  }

export default setNotification