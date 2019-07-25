import React, { Component } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    permission: "",
    errors: {
      cognito: null,
      username: false,
      email: false,
      confirm: false,
      passwordmatch: false,
      value: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        confirm: false,
        username: false,
        email: false,
        passwordmatch: false,
        value: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // Form validation

    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }
    // AWS Cognito integration here
    const { username, email, password, permission } = this.state;
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    } else {
      this.clearErrorState();
      try {
        const signup = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            "custom:permission": permission
          }
        });

        this.props.history.push("/welcome");
        console.log(signup);
      } catch (err) {
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
    }
  };

  onInputChange = event => {
    // console.log(event.target.value)
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  dropDownChange = e => {
    this.setState({ permission: e.target.value });
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>

          <FormErrors formerrors={this.state.errors} />

          <form
            onSubmit={this.handleSubmit}
            id="registerForm"
            className="register-form"
          >
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <h3>PLEASE CHOOSE PERMISSION</h3>
              <select
                className="permission"
                onChange={this.dropDownChange}
                value={this.state.value}
                id="permission"
                required
              >
                <option value="select">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <p />
              <p>{this.state.value}</p>
            </div>

            <div className="field">
              <p className="control center">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control center">
                <button className="button is-success">Register</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;
