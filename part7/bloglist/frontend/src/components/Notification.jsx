import notificationReducer from "../reducers/NotificationContext";
import { useReducer } from "react";
import { useNotificationValue } from "../reducers/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue()
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return notification ? (
    <div style={style}> {notification} </div>
  ) : null;
}
  
export default Notification