import { useContext } from "react"
import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
 
  return notification ? <div style={style}> {notification} </div> : null
}

export default Notification
