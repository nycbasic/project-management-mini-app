import { CLEAR_MSG } from "./Types";

export const clearFlashMsg = () => dispatch => {
  return dispatch({
    type: CLEAR_MSG,
    payload: ""
  });
};
