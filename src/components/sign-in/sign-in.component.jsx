import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onEmailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    /*
    Putting the value of the relevant FormInput (via its name attribute),
    to it's corresponding key in the state using useState's setCredentials.
    if name of formInput is email then [name] is the key email in our state.
     */
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="Email"
          onChange={handleChange}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          label="Password"
          onChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton
            type="button"
            onClick={props.onGoogleSignInStart}
            isGoogleSignIn
          >
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onGoogleSignInStart: () => dispatch(googleSignInStart()),
  onEmailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
