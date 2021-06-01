import React, { Component } from "react";
import { connect } from "react-redux";

export default CheckAuth => {
  class ComposedComponent extends Component {
    state = {};
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth } = this.props;
      console.log("FROM CHECK_AUTH: ", auth);
      if (!auth) {
        this.props.history.push("/");
      }
    }
    render() {
      return <CheckAuth {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
