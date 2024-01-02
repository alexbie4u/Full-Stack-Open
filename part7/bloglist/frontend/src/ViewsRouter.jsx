import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

import Home from './views/Home/Home'
import MyAccount from './views/MyAccount/MyAccount'
import Users from './views/Users/Users'
import LandingPage from './views/LandingPage/LandingPage'
import User from './views/User/User'
import BlogView from './views/Blog/BlogView'
import { useUserValue } from './reducers/UserContext'

  
  const ViewsRouter = () => {
    const padding = {
      padding: 5
    }

  const user = useUserValue()
  
   return(
    <Router>
      <div>
        {user
        ? <div><em>{user.username} logged in</em></div>
        : null }
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/myaccount">My account</Link>
        <Link style={padding} to="/users">Users</Link>
      </div>
  
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
  
    </Router>
   ) 
  }
  
  export default ViewsRouter