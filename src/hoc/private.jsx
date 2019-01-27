import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Private = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Private);
