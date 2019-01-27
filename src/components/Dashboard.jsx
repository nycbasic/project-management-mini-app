import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated } from "react-animated-css";
import { deleteUser } from "../actions/Auth";
import Spinner from "./common/Spinner";

export class Dashboard extends Component {
  render() {
    const { fullName, avatar, id } = this.props.auth.user;
    const { loading, isAuthenticated } = this.props.auth;
    if (loading || !isAuthenticated) {
      return <Spinner />;
    }
    return (
      <div className="dashboard">
        <Animated animationIn="bounceIn">
          <div className="container">
            <h1>Welcome {fullName}!</h1>
            <img
              className="rounded-circle"
              src={avatar}
              alt={fullName}
              style={{ width: "150px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            <p>
              {fullName}! Thank you for sigining up! You've successfully logged
              into the app!
            </p>
            <button
              onClick={() => this.props.deleteUser(id)}
              className="btn btn-danger"
            >
              Delete User
            </button>
          </div>
        </Animated>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { deleteUser }
)(Dashboard);
