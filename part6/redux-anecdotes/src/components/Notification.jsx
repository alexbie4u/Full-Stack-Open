import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  // console.log('Notification: ' + notification);

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