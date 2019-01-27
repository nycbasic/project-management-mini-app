import {
  VALID_RESET_TOKEN,
  INVALID_RESET_TOKEN,
  INVALID_RESET_MSG
} from "../actions/Types";

const INIT = {
  msg: "",
  validToken: false,
  expiredToken: false,
  loading: true
};

export default function(state = INIT, action) {
  switch (action.type) {
    case VALID_RESET_TOKEN:
      return {
        validToken: action.payload,
        loading: false
      };
    case INVALID_RESET_TOKEN:
      return {
        ...state,
        expiredToken: action.payload,
        loading: false
      };
    case INVALID_RESET_MSG:
      return {
        ...state,
        msg: action.payload
      };
    default:
      return state;
  }
}
