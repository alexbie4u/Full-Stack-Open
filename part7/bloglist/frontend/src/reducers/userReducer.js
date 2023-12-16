import { createSlice } from "@reduxjs/toolkit"
import setNotification from "../utils/notificationUtils"
import blogService from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      login(state, action) {
        return action.payload;
      },
      logout(state) {
        window.localStorage.removeItem('loggedBlogappUser')
        return null
      },
    }
})

export const { login, logout } = userSlice.actions

export const handleLogin = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      // Update the Redux state with the user data
      dispatch(login(user));

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      );
      blogService.setToken(user.token);

      dispatch(setNotification('You logged in!', 5));
    } catch (error) {
      dispatch(setNotification(`Login failed: ${error.message}`, 5));
    }
  };
};


// useEffect(() => {
//   const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
//   if (loggedUserJSON) {
//     const user = JSON.parse(loggedUserJSON)
//     setUser(user)
//     blogService.setToken(user.token)
//   }
// }, [])



export const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

export const selectUser = (state) => state.user
export default userSlice.reducer