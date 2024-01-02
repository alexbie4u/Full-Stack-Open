import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import requestService from "../../services/requests";
import { Table } from "react-bootstrap";
import Comments from "../../components/Comments/Comments";

const BlogView = () => {
    const { id } = useParams();

    const result = useQuery ({
        queryKey: ['blogs'],
        queryFn: requestService.getBlogs 
      })
    
    if (result.isLoading) { 
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return <div>Error loading data...</div>;
    }
    
    const blogs = result.data
    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) return (
        <div>
            <h3>Blog not found.</h3>
        </div>
    )

    return(
        <div className="container">
    
        <h2>{blog.title}</h2>

        <div>
        <Table striped>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>{blog.title}</td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td>{blog.likes}</td>
            </tr>
            <tr>
              <td>Author:</td>
              <td>{blog.author}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div>
        <h3>Comments:</h3>

        <Comments blog={blog}/>
      </div>



    </div>
        )
}

export default BlogView