import { CLEAR_ERRORS } from "./Types";

export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  });
};
