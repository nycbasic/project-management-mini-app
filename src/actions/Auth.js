import axios from "axios";
import JwtDecode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS, FLASH_MSG } from "./Types";
import { setAuthHeader } from "../helpers/set-token";

export const createUser = (newUser, callback) => dispatch => {
  axios
    .post("/api/users/signup", newUser)
    .then(res => {
      const { token } = res.data;
      setAuthHeader(token);
      localStorage.setItem("jwt", token);
      dispatch(setCurrentUser(JwtDecode(token)));
      callback.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user, callback) => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      if (res.data.msg) {
        dispatch({
          type: FLASH_MSG,
          payload: res.data
        });
      } else {
        const { token } = res.data;
        setAuthHeader(token);
        localStorage.setItem("jwt", token);
        dispatch(setCurrentUser(JwtDecode(token)));
        callback.push("/dashboard");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
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
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });
};

export const logoutUser = () => dispatch => {
  setAuthHeader(false);
  localStorage.clear();
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
