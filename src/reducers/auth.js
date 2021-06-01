import {
  SET_CURRENT_USER
} from "../actions/Types";
import {
  isEmpty
} from "../helpers/validation";
const INIT = {
  isAuthenticated: false,
  user: {},
};

export default function (state = INIT, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          loading: false
      };
    default:
      return state;
  }
}