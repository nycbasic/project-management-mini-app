import React, { Component } from "react";
import Login from "./authentication/Login";
import { Animated } from "react-animated-css";

class Home extends Component {
  render() {
    const {
      onFieldChange,
      onSelectClear,
      loginEmail,
      loginPassword,
      errors
    } = this.props;
    return (
      <React.Fragment>
        <div className="home">
          <Animated animationIn="bounceInUp">
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <div className="header">
                    <h1>Manage your projects</h1>
                    <p>
                      A simple application that helps manage your projects that
                      you're currently working on. Create new projects, new
                      tasks, and update them as complete!
                    </p>
                  </div>
                </div>
                <div className="col-5">
                  <Login
                    {...this.props}
                    errors={errors}
                    onFieldChange={onFieldChange}
                    onSelectClear={onSelectClear}
                    loginEmail={loginEmail}
                    loginPassword={loginPassword}
                  />
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
