import Blog from "./Blog"
import React from "react"
import { Table } from "react-bootstrap"
import { useUserValue } from "../../reducers/UserContext";

const BlogList = ({ blogs }) => {
  let user = useUserValue().username
  return (
    <div>
      <h2>Blog list</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog
                  blog={blog}
                  showDeleteButton={blog.user && user === blog.user.username}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList