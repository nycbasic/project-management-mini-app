import { GET_ERRORS, CLEAR_ERRORS } from "../actions/Types";

const INIT = {
  errors: {}
};

export default function(state = INIT, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
