import { error, success, loading } from "./reducer";

export const notifyError = (data) => async (dispatch) => {
  dispatch(error(data));
};
export const notifySuccess = (data) => async (dispatch) => {
  dispatch(success(data));
};
export const notifyLoading = (data) => async (dispatch) => {
  dispatch(loading(data));
};
