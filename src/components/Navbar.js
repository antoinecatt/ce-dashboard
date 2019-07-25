import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  Button,
  Nav,
  // Dropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  // NavLink,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../logo.png";
export default class Navbar extends Component {
  state = {
    dropdownOpen: false
  };

  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <Nav
        className="navbar header mb-6"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src={logo}
              width="112"
              height="28"
              alt="logo"
              className="logo"
            />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          {this.props.auth.isAuthenticated && (
            <div className="navbar-start">
              <NavItem className="nav-link">
                <Link to="/overview" >
                  Overview
                </Link>
              </NavItem>
              <NavItem className="nav-link">
                <Link to="/dashboard">Dashboard</Link>
              </NavItem>
              {this.props.auth.permission === "Admin" && (
                <NavItem className="nav-link">
                  <Link to="/admin">
                    Admin
                  </Link>
                </NavItem>
              )}
              <NavItem className="nav-link">
                <Link to="/settings">Settings</Link>
              </NavItem>
            </div>
          )}

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <span>Hello {this.props.auth.user.username}</span>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <Button onClick={this.handleLogOut}>Log out</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Nav>
    );
  }
}
