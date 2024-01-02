import loginService from "../services/login"
import { createContext, useReducer, useContext } from "react";
import { setToken } from "../services/requests";

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null
    default: 
      return state
  }
}

export const handleLogin = async ({ username, password, notificationDispatch, userDispatch }) => {
  try {
    const user = await loginService.login({ username, password });

    userDispatch({ type: 'LOGIN', payload: user });

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    setToken(user.token);

    notificationDispatch({ type: 'NOTIFICATION', payload: 'You logged in.' })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE' });
    }, 5000);
  } catch (error) {
    console.error('Error during login:', error);
    notificationDispatch({ type: 'ERROR', payload: 'Login failed.' });
  }
};


export const handleLogout = async (notificationDispatch, userDispatch) => {
  notificationDispatch({ type: 'NOTIFICATION', payload: 'You logged out.' });

  window.localStorage.removeItem('loggedBlogappUser');
  userDispatch({ type: 'LOGOUT' }); // Use the dispatch function
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export default UserContext