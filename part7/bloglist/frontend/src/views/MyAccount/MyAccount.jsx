import Togglable from "../../components/Togglable"
import { useUserValue } from "../../reducers/UserContext"
import { Button } from "react-bootstrap"
import Notification from "../../components/Notification"

const MyAccount = () => {
    const user = useUserValue()

    return(
        <div className="container">
          <Notification/>
    
        <h2>List of users</h2>
          {/* <Togglable buttonLabel="Create new blog" buttonId="createNewBlogButton1">
            <NewBlogForm />
          </Togglable> */}

    
          {/* <User/> */}
        </div>  
        )
}

export default MyAccount
