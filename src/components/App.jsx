import React, { Component } from "react";
import JwtDecoded from "jwt-decode";
import Navbar from "../components/Navbar";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../actions/Auth";
import { setAuthHeader } from "../helpers/set-token";
import { createUser } from "../actions/Auth";
import { clearErrors } from "../actions/Errors";
import Private from "../hoc/private";
import Home from "./Home";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard";
import Reset from "./pw-reset/Reset";
import ResetForm from "./pw-reset/Reset-Form";
import Spinner from "./common/Spinner";
import store from "../redux-store";

function authCheck() {
  try {
    store.dispatch(setCurrentUser(JwtDecoded(localStorage.jwt)));
  } catch (err) {
    logoutUser();
  }
}

class App extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillMount() {
    if (localStorage.jwt) {
      setAuthHeader(localStorage.jwt);
      authCheck();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  }

  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClearSelectErrors = () => {
    const { clearErrors } = this.props;
    clearErrors();
  };

  handleClearSignUp = e => {
    const { clearErrors } = this.props;
    e.preventDefault();
    this.setState({
      fullName: "",
      email: "",
      password: "",
      password2: ""
    });
    clearErrors();
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/signup"
                render={props => (
                  <Signup
                    {...props}
                    onCreateUser={this.props.createUser}
                    onFieldChange={this.handleFieldChange}
                    onSelectClear={this.handleClearSelectErrors}
                    onSignUpFieldClear={this.handleClearSignUp}
                    signUpFullName={this.state.fullName}
                    signUpEmail={this.state.email}
                    signUpPassword={this.state.password}
                    signUpPassword2={this.state.password2}
                    errors={this.state.errors}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    onFieldChange={this.handleFieldChange}
                    onSelectClear={this.handleClearSelectErrors}
                    loginEmail={this.state.email}
                    loginPassword={this.state.password}
                    errors={this.state.errors}
                  />
                )}
              />
              <Route
                path="/password"
                render={props => (
                  <Reset
                    {...props}
                    onFieldChange={this.handleFieldChange}
                    onSelectClear={this.handleClearSelectErrors}
                    resetEmail={this.state.email}
                    errors={this.state.errors}
                  />
                )}
              />
              <Route path="/reset/:token" component={ResetForm} />
              <Route path="/spinner" component={Spinner} />
              <Private path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { clearErrors, createUser }
)(App);
