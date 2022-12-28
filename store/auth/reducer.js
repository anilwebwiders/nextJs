import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: '',
  loading: false
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogged: (data, action) => {
      data.user = action.payload.user;
      data.token = action.payload.access_token;
    },
    userLoading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { userLogged, userLoading } = slice.actions;

export default slice.reducer;
