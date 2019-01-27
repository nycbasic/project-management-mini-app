import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home">
          <Animated animationIn="bounceInUp">
            <div className="container">
              <h1>Welcome to Auth Connector</h1>
              <p>
                A simple application that creates an account, and logs you in.
                This app also features password reset, failed login reset,
                character validation, and sessions.
              </p>
              <Link to="/signup" className="btn btn-primary">
                Sign-Up
              </Link>
              <Link to="/login" className="btn btn-primary">
                Log-in
              </Link>
            </div>
          </Animated>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
