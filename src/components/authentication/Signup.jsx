import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/Auth";
import { clearErrors } from "../../actions/Errors";
import { clearFlashMsg } from "../../actions/Flash";
import TextFieldInput from "../../components/common/TextField";
import { Animated } from "react-animated-css";

class Signup extends Component {
  componentWillMount() {
    const { clearErrors, clearFlashMsg } = this.props;
    clearErrors();
    clearFlashMsg();
  }

  handleSignUpSubmit = e => {
    e.preventDefault();
    const {
      signUpFullName,
      signUpEmail,
      signUpPassword,
      signUpPassword2
    } = this.props;
    const { onCreateUser } = this.props;
    const newUser = {
      fullName: signUpFullName,
      email: signUpEmail,
      password: signUpPassword,
      password2: signUpPassword2
    };
    onCreateUser(newUser, this.props.history);
  };

  render() {
    const { fullName, email, password, password2 } = this.props.errors;
    const {
      onSelectClear,
      onFieldChange,
      onFormClear,
      signUpFullName,
      signUpEmail,
      signUpPassword,
      signUpPassword2
    } = this.props;

    return (
      <React.Fragment>
        <Animated animationIn="bounceInLeft">
          <div className="signup">
            <div className="container">
              <form onSubmit={this.handleSignUpSubmit}>
                <h3>Please Sign Up!</h3>
                <TextFieldInput
                  title="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  value={signUpFullName}
                  onChange={onFieldChange}
                  onSelect={onSelectClear}
                  error={fullName}
                />
                <TextFieldInput
                  title="Email Address"
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  value={signUpEmail}
                  onChange={onFieldChange}
                  onSelect={onSelectClear}
                  info="We'll never share your email with anyone else"
                  error={email}
                />
                <TextFieldInput
                  title="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={signUpPassword}
                  onChange={onFieldChange}
                  onSelect={onSelectClear}
                  info="Use 8 or more characters with a mix of letters, numbers & symbols"
                  error={password}
                />
                <TextFieldInput
                  title="Confirm Password"
                  type="password"
                  name="password2"
                  placeholder="Please confirm your password"
                  value={signUpPassword2}
                  onChange={onFieldChange}
                  onSelect={onSelectClear}
                  info={"Please make sure your confirmation password matches"}
                  error={password2}
                />

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button onClick={onFormClear} className="btn btn-danger">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </Animated>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createUser, clearErrors, clearFlashMsg }
)(Signup);
