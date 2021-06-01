import {
  CLEAR_ERRORS,
  GET_ERRORS
} from "./Types";

export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS,
    payload: ""
  });
};

export const sendError = (payload) => dispatch => {
  return dispatch({
    type: GET_ERRORS,
    payload,
  })
}