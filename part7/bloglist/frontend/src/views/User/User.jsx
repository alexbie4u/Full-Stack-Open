import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import usersService from "../../services/users";
import { Table } from "react-bootstrap";

const User = () => {
    const { id } = useParams();

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
    const user = users.find((user) => user.id === id);
    const blogs = user.blogs

    if (!user) return (
        <div>
            <h3>User not found.</h3>
        </div>
    )

    return(
        <div className="container">
    
        <h2>{user.username}</h2>

        <h3>added blogs:</h3>
        <div>
            <Table striped>
              <tbody>
                {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                </tr>
                ))}
              </tbody>
            </Table>
          </div>

        </div>  
        )
}

export default User