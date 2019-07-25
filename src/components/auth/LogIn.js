import React, { Component } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    "custom:permission": "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // // Form validation
    // this.clearErrorState();
    const error = Validate(event, this.state);

    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { username, password } = this.state;
    try {
      const user = await Auth.signIn(username, password);

      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.auth.setPermission(user.attributes["custom:permission"]);
      // console.log(user);
      // console.log('PROPS', this.props.auth)
      this.props.history.push("/overview");
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        alert(
          "USER HAS NOT BEEN CONFIRMED: A verification link has been sent to your email. Please verify email to gain access to dashboard"
        );
        await Auth.resendSignUp(username);
      }
      console.log(err.code);
      let error = null;
      !err.message ? (error = { message: err }) : (error = err);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: error
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="field ">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control ">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                {/* <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span> */}
              </p>
            </div>
            <div className="field">
              <p className="control center">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control center">
                <button className="button is-success">Login</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LogIn;
