import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./Loader.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DeviceAdmin from "./components/DeviceAdmin";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Overview from "./components/Overview";
import DeviceInfo from "./components/DeviceInfo";
// import User from "./components/User";
import UserDeviceList from "./components/UserDeviceList";
import SiteDeviceList from "./components/SiteDeviceList";
import Sites from "./components/Sites";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
// import Footer from "./components/Footer";
// import { Container } from "reactstrap";
import { Auth } from "aws-amplify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    "custom:permission": ""
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user });
  };

  setPermission = permission => {
    this.setState({ "custom:permission": permission });
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setAuthStatus(true);
      // console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      this.setPermission(user.attributes["custom:permission"]);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      permission: this.state["custom:permission"],
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
      setPermission: this.setPermission
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <Route render={props => <Navbar {...props} auth={authProps} />} />

              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/users"
                  render={props => <Users {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/users/:username"
                  render={props => (
                    <UserDeviceList
                      {...props}
                      auth={authProps}
                      handleUpdateMaxTemp={this.handleUpdateMaxTemp}
                      handleUpdateMinTemp={this.handleUpdateMinTemp}
                    />
                  )}
                />
                <Route
                  exact
                  path="/sites"
                  render={props => <Sites {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/sites/:num"
                  render={props => (
                    <SiteDeviceList
                      {...props}
                      auth={authProps}
                      handleUpdateMaxTemp={this.handleUpdateMaxTemp}
                      handleUpdateMinTemp={this.handleUpdateMinTemp}
                    />
                  )}
                />
                <Route
                  exact
                  path="/devices/:id"
                  render={props => <DeviceInfo {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/overview"
                  render={props => <Overview {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/dashboard"
                  render={props => <Dashboard {...props} auth={authProps} />}
                />

                <Route
                  exact
                  path="/admin"
                  render={props => <DeviceAdmin {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/settings"
                  render={props => <Settings {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <LogIn {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  render={props => (
                    <ForgotPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgotpasswordverification"
                  render={props => (
                    <ForgotPasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={props => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepasswordconfirmation"
                  render={props => (
                    <ChangePasswordConfirm {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/welcome"
                  render={props => <Welcome {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/:id"
                  render={props => <Sites {...props} auth={authProps} />}
                />
              </Switch>
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
