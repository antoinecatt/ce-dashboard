import React, { Component } from "react";
import Site from "./Site";
import plus from "../assets/img/icons/cards/icons8-plus-64.png";
import config from "../config.json";
import axios from "axios";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";

class Sites extends Component {
  state = {
    sites: [],
    newSite: {
      name: "",
      devices: []
    },
    modal: false,
    nameAlert: false,
    nameLengthAlert: false
  };

  fetchSites = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/sites`);
      console.log(res);
      console.log(res.data);
      this.setState({ sites: res.data });
    } catch (err) {
      console.log(`CANNOT FETCH SITES: ${err}`);
    }
  };

  handleAddSite = async (name, event) => {
    event.preventDefault();

    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        name
      };
      if (this.state.newSite.name.length < 5) {
        event.preventDefault();
        this.setState({ nameLengthAlert: true });
      } else if (this.state.newSite.name === "") {
        event.preventDefault();
        this.setState({ nameAlert: true });
      } else {
        console.log(params);
        await axios.post(`${config.api.invokeUrl}/sites`, params, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        await axios.put(`${config.api.invokeUrl}/sites/${name}`, params, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });

        this.setState({
          devices: [...this.state.sites, this.state.newSite]
        });
      }
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
    console.log(this.state.sites);
    this.setState({
      newSite: {
        name: ""
      }
    });
  };

  onAddNameChange = event => {
    const name = event.target.value;

    if (name === "") {
      this.setState({ nameAlert: true });
    } else {
      this.setState({ nameAlert: false });
    }

    this.setState({
      newSite: { ...this.state.newSite, name: event.target.value }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      nameAlert: false
    }));
  };

  componentDidMount() {
    this.fetchSites();
  }

  render() {
    const sites = this.state.sites.map(site => {
      return <Site key={site.id} id={site.id} name={site.name} />;
    });
    return (
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="#" onClick={this.goBack}>
            <Button color="primary">Back</Button>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1>SITES</h1>
        <Row>
          {sites}
          <div className="addBtn-user">
            <Col>
              <Button color="link" onClick={this.toggle}>
                <img src={plus} className="App-logo" alt="logo" />
                <h3>Add Site</h3>
              </Button>
            </Col>
          </div>

          <div className="column">
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <form
                onSubmit={event =>
                  this.handleAddSite(this.state.newSite.name, event)
                }
              >
                <ModalBody>
                  <Alert
                    color="warning"
                    isOpen={this.state.userAlert}
                    toggle={this.onDismiss}
                  >
                    Name cannot be blank
                  </Alert>
                  <Alert
                    color="warning"
                    isOpen={this.state.userLengthAlert}
                    toggle={this.onDismiss}
                  >
                    Name must be atleast 5 characters
                  </Alert>

                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter Site Name"
                      value={this.state.newSite.name}
                      onChange={this.onAddNameChange}
                      // required
                    />
                  </div>

                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-medium"
                      onClick={this.toggle}
                    >
                      Add Site
                    </button>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </div>
                </ModalBody>
              </form>
            </Modal>
          </div>
        </Row>
      </div>
    );
  }
}
export default Sites;
