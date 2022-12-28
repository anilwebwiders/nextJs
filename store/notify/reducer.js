import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  success: "",
  loading: false,
};

const slice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    error: (data, action) => {
      data.error = action.payload;
    },
    success: (data, action) => {
      data.success = action.payload;
    },
    loading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { error, success, loading } = slice.actions;

export default slice.reducer;
