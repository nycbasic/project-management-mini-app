import { FLASH_MSG, CLEAR_MSG } from "../actions/Types";
const INIT = {
  msg: ""
};

export default function(state = INIT, action) {
  switch (action.type) {
    case FLASH_MSG:
      return action.payload;
    case CLEAR_MSG:
      return action.payload;
    default:
      return state;
  }
}
