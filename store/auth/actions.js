import { userLogged, userLoading } from "./reducer";

export const userLoggedIn = (data) => async (dispatch) => {
  dispatch(userLogged(data));
};

export const loadingUser = (data) => async (dispatch) => {
  dispatch(userLoading(data));
};

// export const userId = async () => {
//   const ISSERVER = typeof window === "undefined";
//   const getuser = !ISSERVER && localStorage.getItem("user_id");
//   if (getuser) {
//     return await localStorage.getItem("user_id");
//   }
// };
