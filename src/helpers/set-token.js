import axios from "axios";

export function setAuthHeader(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  } else {
    return delete axios.defaults.headers.common["Authorization"];
  }
}
