import {
  GET_ERRORS,
  CLEAR_ERRORS
} from "../actions/Types";

const INIT = "";

export default function (state = INIT, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
    case GET_ERRORS:
      return action.payload;
  }
}