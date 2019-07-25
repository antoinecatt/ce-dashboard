import React, { Component } from "react";
import plus from "../assets/img/icons/cards/icons8-plus-64.png";
import User from "./User";
import config from "../config.json";
import axios from "axios";
import Row from "reactstrap/lib/Row";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

// FIX TOGGLE FORM
// FORM SHOULD NOT TOGGLE IF EMAIL IS NOT VALID

export default class Users extends Component {
  state = {
    newUser: {
      username: "",
      email: "",
      devices: []
    },
    users: [],
    modal: false,
    userAlert: false,
    userLengthAlert: false,
    emailAlert: false,
    emailValidAlert: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      userAlert: false
    }));
  };

  fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/users`);
      console.log(res);
      this.setState({ users: res.data, isLoaded: true });
    } catch (err) {
      console.log(`CANNOT FETCH USERS: ${err}`);
    }
  };

  handleAddUser = async (username, event) => {
    event.preventDefault();

    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        username,
        email: this.state.newUser.email,
        devices: this.state.newUser.devices
      };

      if (
        !this.state.newUser.email.includes("@") ||
        !this.state.newUser.email.includes(".com")
      ) {
        event.preventDefault();
        this.setState({ emailValidAlert: true, modal: true });
      } else if (this.state.newUser.email === "") {
        event.preventDefault();
        this.setState({ emailAlert: true, modal: true });
      } else if (this.state.newUser.username.length < 5) {
        event.preventDefault();
        this.setState({ modal: true });
      } else if (this.state.newUser.username === "") {
        event.preventDefault();
        this.setState({ userAlert: true, modal: true });
      } else {
        console.log(params);
        await axios.post(`${config.api.invokeUrl}/users/${username}`, params, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        await axios.put(`${config.api.invokeUrl}/users/${username}`, params);
        this.setState({
          devices: [...this.state.users, this.state.newUser]
        });
        this.setState({
          newUser: {
            username: "",
            email: ""
          }
        });
      }
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  onAddEmailChange = event => {
    const email = event.target.value;

    if (email === "") {
      this.setState({ emailAlert: true });
    } else {
      this.setState({ emailAlert: false });
    }
    if (!email.includes("@")) {
      this.setState({ emailValidAlert: true });
    } else {
      this.setState({ emailValidAlert: false });
    }

    this.setState({
      newUser: { ...this.state.newUser, email: event.target.value }
    });
  };

  onAddUsernameChange = event => {
    const username = event.target.value;

    if (username === "") {
      this.setState({ userAlert: true, userLengthAlert: false });
    } else if (username.length < 5) {
      this.setState({ userLengthAlert: true, userAlert: false });
    } else {
      this.setState({ userLengthAlert: false });
    }

    this.setState({
      newUser: { ...this.state.newUser, username }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const userComponent = this.state.users.map(user => {
      return (
        <User
          key={user.username}
          username={user.username}
          devices={user.devices}
        />
      );
    });
    return (
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="#" onClick={this.goBack}>
            <Button color="primary">Back</Button>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1>USERS</h1>
        <Row>
          {userComponent}
          <div className="addBtn-user">
            <Col>
              <Button color="link" onClick={this.toggle}>
                <img src={plus} className="App-logo" alt="logo" />
                <h3>Add User</h3>
              </Button>
            </Col>
          </div>
        </Row>

        <div className="column">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <form
              onSubmit={event =>
                this.handleAddUser(this.state.newUser.username, event)
              }
            >
              <ModalBody>
                <Alert
                  color="warning"
                  isOpen={this.state.userAlert}
                  toggle={this.onDismiss}
                >
                  Username cannot be blank
                </Alert>
                <Alert
                  color="warning"
                  isOpen={this.state.userLengthAlert}
                  toggle={this.onDismiss}
                >
                  Username must be atleast 5 characters
                </Alert>
                <Alert
                  color="warning"
                  isOpen={this.state.emailAlert}
                  toggle={this.onDismiss}
                >
                  Email cannot be blank
                </Alert>
                <Alert
                  color="warning"
                  isOpen={this.state.emailValidAlert}
                  toggle={this.onDismiss}
                >
                  Must be a valid email
                </Alert>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter Email"
                    value={this.state.newUser.email}
                    onChange={this.onAddEmailChange}
                    // required
                  />
                </div>
                <div className="control">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter Username"
                    value={this.state.newUser.username}
                    onChange={this.onAddUsernameChange}
                    // required
                  />
                </div>

                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary is-medium"
                    onClick={this.toggle}
                  >
                    Add User
                  </button>
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </div>
              </ModalBody>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}
