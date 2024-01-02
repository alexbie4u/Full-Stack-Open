import { Table } from "react-bootstrap";
import usersService from "../services/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const UserList = () => {

    const result = useQuery ({
        queryKey: ['users'],
        queryFn: usersService.getUsers 
      })
    
    if (result.isLoading) { 
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return <div>Error loading data...</div>;
    }
    
    const users = result.data

    const userList = () => {
        return (
          <div>
            <Table striped>
              <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                  <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>Blogs created: {user.blogs.length}</td>
                  <td>Username: {user.username}</td>
                </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      };
    

      if (users === null) {
        return (
          <div>
            <h1>Welcome to Blogs!</h1>
            <LoginForm />
          </div>
        )
      }

    return (
        <div>
            {userList()}
        </div>
    )
}

export default UserList