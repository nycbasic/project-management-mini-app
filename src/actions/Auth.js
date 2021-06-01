import axios from "axios";
import JwtDecode from "jwt-decode";
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  FLASH_MSG,
  CLEAR_TASKS,
  CLEAR_PROJECTS,
} from "./Types";
import {
  setBodyLoader
} from "./loading";
import {
  setAuthHeader
} from "../helpers/set-token";

const url = "https://project-management-mini-server.herokuapp.com";

export const createUser = (newUser, callback) => dispatch => {
  dispatch(setBodyLoader(true));
  axios
    .post(`${url}/api/users/signup`, newUser)
    .then(res => {
      const {
        token
      } = res.data;
      if (token) {
        setAuthHeader(token);
        localStorage.setItem("jwt", token);
        dispatch(setCurrentUser(JwtDecode(token)));
        dispatch(setBodyLoader(false));
        callback.push("/dashboard");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(setBodyLoader(false));
    });
};

export const loginUser = (user, callback) => dispatch => {
  dispatch(setBodyLoader(true))
  axios
    .post(`${url}/api/users/login`, user)
    .then(res => {
      const {
        msg,
        token
      } = res.data
      if (token) {
        setAuthHeader(token);
        localStorage.setItem("jwt", token);
        dispatch(setCurrentUser(JwtDecode(token)));
        dispatch(setBodyLoader(false))
        callback.push("/dashboard");

      }
      if (msg) {
        dispatch({
          type: FLASH_MSG,
          payload: res.data
        });
        dispatch(setBodyLoader(false))
      }
    })
    .catch(err => {
      console.log("FROM AUTH ACTION - LOGIN USER:", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(setBodyLoader(false));
    });
};

export const deleteUser = id => dispatch => {
  axios
    .delete(`${url}/api/users/${id}`)
    .then(res => {
      setAuthHeader(false);
      localStorage.clear();
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      dispatch({
        type: FLASH_MSG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = user => dispatch => {
  if (Date.now() / 1000 > user.exp) {
    dispatch(logoutUser());
  } else {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  }
};

export const logoutUser = () => dispatch => {
  setAuthHeader(false);
  localStorage.clear();
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  dispatch({
    type: CLEAR_TASKS,
    payload: ""
  });
  dispatch({
    type: CLEAR_PROJECTS,
    payload: []
  });
};