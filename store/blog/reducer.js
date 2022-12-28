import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: false,
};

const slice = createSlice({
  name: "allBlogs",
  initialState,
  reducers: {
    blogsRequested: (data) => {
      data.loading = true;
    },
    blogsFailed: (data, action) => {
      data.loading = false;
      data.error = action.payload;
    },
    blogsRecieved: (data, action) => {
      data.loading = false;
      data.blogs = action.payload;
    },
  },
});

export const { blogsRequested, blogsFailed, blogsRecieved } = slice.actions;

export default slice.reducer;
