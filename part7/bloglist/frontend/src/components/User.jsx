import { useUserValue } from "../reducers/UserContext";

const User = () => {
    const user = useUserValue()
    
    if (!user) {
        return null
      }

    return (
        <div>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Name: {user.name}</p>
                </div>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    )
}

export default User