import React, { Component } from "react";
import TextFieldInput from "../../components/common/TextField";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadReset, resetPassword } from "../../actions/Reset";
import { clearErrors } from "../../actions/Errors";
import { clearFlashMsg } from "../../actions/Flash";
import { Animated } from "react-animated-css";
import Spinner from "../common/Spinner";

class ResetForm extends Component {
  state = {
    password: "",
    password2: "",
    errors: {}
  };

  componentWillMount() {
    const { clearErrors, clearFlashMsg } = this.props;
    clearErrors();
    clearFlashMsg();
  }

  componentDidMount() {
    const { loadReset, match } = this.props;
    loadReset(match.params.token);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = () => {
    const { clearErrors } = this.props;
    clearErrors();
  };

  handleResetSubmit = e => {
    e.preventDefault();
    const { password, password2 } = this.state;
    const { history, match, resetPassword } = this.props;
    const newPassword = {
      password,
      password2
    };
    resetPassword(newPassword, match.params.token, history);
    this.setState({
      password: "",
      password2: ""
    });
  };

  render() {
    const { password, password2, errors } = this.state;
    const { validToken, loading, expiredToken, msg } = this.props.reset;
    if (validToken && !loading) {
      return (
        <div className="reset-form">
          <div className="container">
            <Animated animationIn="bounceIn">
              <form onSubmit={this.handleResetSubmit}>
                <h3>Password Reset</h3>
                <TextFieldInput
                  title="Enter your new password"
                  name="password"
                  type="password"
                  info="Use 8 or more characters with a mix of letters, numbers & symbols"
                  value={password}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                  error={errors.password}
                />
                <TextFieldInput
                  title="Confirm your new password"
                  name="password2"
                  type="password"
                  info="Please make sure your confirmation password matches!"
                  value={password2}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                  error={errors.password2}
                />
                <button type="submit" className="btn btn-primary">
                  Reset
                </button>
              </form>
            </Animated>
          </div>
        </div>
      );
    } else if (!validToken && loading) {
      return <Spinner />;
    } else if (expiredToken) {
      return (
        <div className="reset-error">
          <Animated animationIn="bounceIn">
            <div className="container">
              <div className="card">
                <h5 className="card-header">Unable to complete request</h5>
                <div className="card-body">
                  <p className="card-text">{msg}</p>
                  <Link to="/password" className="btn btn-primary">
                    Get new token
                  </Link>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    reset: state.reset,
    errors: state.errors,
    flash: state.flash
  };
}

export default connect(
  mapStateToProps,
  { loadReset, resetPassword, clearErrors, clearFlashMsg }
)(ResetForm);
