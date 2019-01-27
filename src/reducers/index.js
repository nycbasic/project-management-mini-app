import { combineReducers } from "redux";
import authReducer from "./auth";
import errorsReducer from "./errors";
import flashMsgReducer from "./flash";
import validResetTokenReducer from "./reset";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  flash: flashMsgReducer,
  reset: validResetTokenReducer
});
