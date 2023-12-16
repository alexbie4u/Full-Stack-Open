import { useSelector } from "react-redux";

const Notification = () => {
  console.log('This is the notification message: ');
  const notification = useSelector(({notification}) => notification)
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