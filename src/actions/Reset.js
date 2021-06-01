import axios from "axios";
import {
  FLASH_MSG,
  GET_ERRORS,
  VALID_RESET_TOKEN,
  INVALID_RESET_MSG,
  INVALID_RESET_TOKEN
} from "./Types";

import { clearErrors } from "./Errors";
import { clearFlashMsg } from "./Flash";

const url = "https://project-management-mini-server.herokuapp.com";

export const resetUser = email => dispatch => {
  dispatch(clearErrors());
  dispatch(clearFlashMsg());
  axios
    .post(`${url}/api/users/forgot`, email)
    .then(res => {
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

export const loadReset = token => dispatch => {
  axios
    .get(`${url}/api/users/reset/${token}`)
    .then(res => {
      const { validToken, expiredToken, msg } = res.data;
      if (validToken) {
        dispatch({
          type: VALID_RESET_TOKEN,
          payload: validToken
        });
      } else if (expiredToken) {
        dispatch({
          type: INVALID_RESET_TOKEN,
          payload: expiredToken
        });
      }
      if (msg) {
        dispatch({
          type: INVALID_RESET_MSG,
          payload: msg
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetPassword = (newPassword, token, callback) => dispatch => {
  dispatch(clearErrors());
  dispatch(clearFlashMsg());
  axios
    .post(`${url}/api/users/reset/${token}`, newPassword)
    .then(res => {
      dispatch({
        type: FLASH_MSG,
        payload: res.data
      });
    })
    .then(() => {
      callback.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
