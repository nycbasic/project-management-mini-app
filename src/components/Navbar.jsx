import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/Auth";

class Navbar extends Component {
  render() {
    console.log(this.props);
    const { isAuthenticated, user } = this.props.auth;
    const { logoutUser, history } = this.props;
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link
            className="navbar-brand"
            to={!isAuthenticated ? "/" : "/dashboard"}
          >
            Auth Connector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      onClick={() => history.push("/signup")}
                      className="nav-link"
                      to="/signup"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={() => history.push("/login")}
                      className="nav-link"
                      to="/login"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                    >
                      Log-in
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={() => logoutUser()}
                    className="nav-link"
                    to="/login"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                  >
                    <img
                      className="rounded-circle"
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: "25px", marginRight: "5px" }}
                      title="You must have a Gravatar connected to your email to display an image"
                    />
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
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
  { logoutUser }
)(withRouter(Navbar));
