import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const init = {},
  middleWare = [thunk];

const store = createStore(
  reducer,
  init,
  compose(
    applyMiddleware(...middleWare)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;