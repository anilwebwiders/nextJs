import { getBlogs } from "../../utils/api-client";


import { blogsRequested, blogsFailed, blogsRecieved } from "./reducer";

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch(blogsRequested());
    const blogs = await getBlogs.fetchByUrl();
    dispatch(blogsRecieved(blogs));
  } catch (error) {
    dispatch(blogsFailed(error));
  }
};
