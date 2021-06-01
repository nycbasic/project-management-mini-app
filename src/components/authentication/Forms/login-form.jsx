import React from "react";
import { Link } from "react-router-dom";
import TextFieldInput from "../../common/TextField";

const LoginForm = props => {
  const {
    onLoginSubmit,
    loginEmail,
    loginPassword,
    onSelectClear,
    onFieldChange,
    email,
    password
  } = props;

  return (
    <form onSubmit={onLoginSubmit}>
      <h3>Please Log-in!</h3>
      <TextFieldInput
        title="Email Address"
        type="text"
        name="email"
        placeholder="Enter your email address"
        value={loginEmail}
        onSelect={onSelectClear}
        onChange={onFieldChange}
        error={email}
      />
      <TextFieldInput
        title="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={loginPassword}
        onChange={onFieldChange}
        onSelect={onSelectClear}
        error={password}
      />
      <button type="submit" className="btn btn-primary">
        Log-in
      </button>
      <small className="form-text text-muted">
        Forgot your <Link to="/password">password</Link>? Create an{" "}
        <Link to="/signup">account</Link>!
      </small>
    </form>
  );
};

export default LoginForm;
