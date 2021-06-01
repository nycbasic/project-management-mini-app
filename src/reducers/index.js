import {
  combineReducers
} from "redux";
import authReducer from "./auth";
import errorsReducer from "./errors";
import flashMsgReducer from "./flash";
import validResetTokenReducer from "./reset";
import projectsReducer from "./projects";
import tasksReducer from "./tasks";
import loadingReducer from "./loading"

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  flash: flashMsgReducer,
  reset: validResetTokenReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  loading: loadingReducer
});