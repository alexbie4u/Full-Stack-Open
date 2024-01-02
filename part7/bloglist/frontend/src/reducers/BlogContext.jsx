// import { createContext, useReducer, useContext } from "react";
// import requestService from "../services/requests";
// import { useQuery } from '@tanstack/react-query'
// import { getBlogs } from "../services/requests";

// const getId = () => (100000 * Math.random()).toFixed(0)

// // export const asObject = (blog) => {
// //   return{
// //     content: blog,
// //     id: getId(),
// //     votes: 0
// //   }
// // }

// const blogReducer = (state, action) => {
//   switch (action.type) {
//     case 'CREATE':
//       return [...state, action.payload];
//     case 'VOTE':
//       const id = action.payload.id;
//       const blogToVoteUp = state.find(blog => blog.id === id)
//         if (blogToVoteUp) { blogToVoteUp.likes += 1; }
//       return state.sort((a, b) => b.likes - a.likes)
//     // case 'APPEND':
//     //   state.push(action.payload)
//     case 'SETBLOGS':
//       console.log('Result data ' + action.payload);
//       return action.payload.sort((a, b) => b.likes - a.likes);
//     case 'DELETE':
//       if (window.confirm(`Delete '${action.payload.title}?`)) { 
//         requestService.del(action.payload.id)}
//         blogDispatch({ type: 'SETBLOGS' })
//     default:
//       return state
//     }
// }

// export const deleteBlog = async (id, notificationDispatch) => {
//   try {
//     dispatch(del( id ))
//     dispatch(initializeBlogs());
//     notificationDispatch('Blog has been deleted')
//   } catch (error) {
//     notificationDispatch(`Unable to delete Blog. ${error}`)
//   }
// }


// const BlogContext = createContext()

// export const BlogContextProvider = (props) => {
//   const [blog, blogDispatch] = useReducer(blogReducer, []);

//   return (
//     <BlogContext.Provider value={[blog, blogDispatch]}>
//       {props.children}
//     </BlogContext.Provider>
//   );
// };

// export const useBlogValue = () => {
//   const blogAndDispatch = useContext(BlogContext)
//   return blogAndDispatch[0]
// }

// export const useBlogDispatch = () => {
//   const blogAndDispatch = useContext(BlogContext);
//   return blogAndDispatch[1];
// };

// export default BlogContext