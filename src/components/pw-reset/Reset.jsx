import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../../components/common/TextField";
import { clearErrors } from "../../actions/Errors";
import { clearFlashMsg } from "../../actions/Flash";
import { resetUser } from "../../actions/Reset";
import FlashMessage from "react-flash-message";
import { Animated } from "react-animated-css";

class Password extends Component {
  componentWillMount() {
    const { clearErrors, clearFlashMsg } = this.props;
    clearErrors();
    clearFlashMsg();
  }

  handleResetSubmit = e => {
    e.preventDefault();
    const { resetEmail, resetUser } = this.props;
    const email = {
      email: resetEmail
    };
    resetUser(email);
  };

  render() {
    const { resetEmail, onFieldChange, onSelectClear, errors } = this.props;
    const { msg } = this.props.flash;
    return (
      <div className="reset">
        <div className="container">
          <div className="flash">
            {msg && (
              <Animated animationIn="fadeIn" animationOut="fadeOut">
                <FlashMessage duration={4000}>
                  <div className="alert alert-success">{msg}</div>
                </FlashMessage>
              </Animated>
            )}
          </div>
          <Animated animationIn="bounceIn">
            <form onSubmit={this.handleResetSubmit}>
              <h3>Password Reset</h3>
              <TextFieldInput
                title="Enter your email address"
                name="email"
                value={resetEmail}
                info="Make sure your email address already exist!"
                type="text"
                onChange={onFieldChange}
                onSelect={onSelectClear}
                error={errors.email}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Animated>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flash: state.flash
  };
}

export default connect(
  mapStateToProps,
  { resetUser, clearErrors, clearFlashMsg }
)(Password);
