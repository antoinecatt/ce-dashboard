import React, { Component, Fragment } from "react";
import TempCardList from "./Cards/TempCardList";
import { Row, Button, Modal, ModalBody, Alert } from "reactstrap";
// import Product from "./Product";
import axios from "axios";
import { Redirect } from "react-router-dom";
const config = require("../config.json");

export default class DeviceAdmin extends Component {
  state = {
    newDevice: {
      id: "",
      state: {
        currentTemp: "",
        hum: ""
      },
      settings: {
        rangeMin: "",
        rangeMax: ""
      }
    },
    devices: [],
    isLoading: false,
    modal: false,
    visibleSuccess: false,
    visibleLong: false,
    visibleShort: false,
    visibleExact: false,
    visibleTemp: false,
    visibleTempMax: false,
    visibleId: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      visibleLong: false,
      visibleShort: false,
      visibleTemp: false,
      visibleTempMax: false,
      visibleExact: false,
      visibleId: false
    }));
  };

  // toggleSubmit = () => {
  //   console.log(this.state.id);
  //   const { currentTemp } = this.state.newDevice.state;
  //   if (currentTemp === "" && this.state.id === "") {
  //     this.setState(prevState => ({
  //       modal: true,
  //       visibleTemp: true
  //     }));
  //   } else {
  //     this.setState(prevState => ({
  //       modal: !prevState.modal
  //     }));
  //   }
  // };

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    const username = this.props.auth.user.username;
    try {
      const params = {
        id: id,
        state: {
          currentTemp: parseInt(this.state.newDevice.state.currentTemp),
          hum: parseInt(this.state.newDevice.state.hum)
        },
        settings: {
          rangeMin: parseInt(this.state.newDevice.settings.rangeMin),
          rangeMax: parseInt(this.state.newDevice.settings.rangeMax)
        }
      };

      if (this.state.newDevice.id === "") {
        event.preventDefault();
        this.setState({
          visibleId: true
        });
      } else {
        this.setState({
          visibleId: false
        });
      }

      // if (this.state.newDevice.state.currentTemp === "") {
      //   event.preventDefault();
      //   console.log("THIS SHOULD HAPPEN");
      //   this.setState({
      //     visibleTemp: true,
      //     modal: true,
      //     visibleSuccess: false
      //   });
      // } else {
      //   this.setState({
      //     visibleTemp: false
      //   });
      // }

      if (this.state.newDevice.state.currentTemp === "") {
        event.preventDefault();
        this.setState({
          visibleTemp: true,
          modal: true
        });
      } else if (this.state.newDevice.state.currentTemp > 100) {
        event.preventDefault();
        this.setState(prevState => ({
          modal: true,
          visibleTempMax: true
        }));
      } else if (this.state.newDevice.id.length < 12) {
        event.preventDefault();
        this.setState(prevState => ({
          modal: true,
          visibleShort: true
        }));
      } else if (this.state.newDevice.id.length > 12) {
        event.preventDefault();
        this.setState(prevState => ({
          modal: true,
          visibleLong: true
        }));
      } else {
        console.log(this.state.newDevice.id);
        console.log(params);
        // await axios.post(`${config.api.invokeUrl}/devices/${id}`, params, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*"
        //   }
        // });

        // await axios.put(
        //   `${config.api.invokeUrl}/users/${username}/devices/${id}`,
        //   params
        // );

        // this.setState({
        //   devices: [...this.state.devices, this.state.newDevice]
        // });
        this.setState(prevState => {
          return {
            newDevice: {
              id: "",
              state: { currentTemp: "", hum: "" },
              settings: { rangeMin: "", rangeMax: "" }
            },
            visibleSuccess: !prevState.visibleSuccess
          };
        });
      }
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  handleDeleteDevice = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      const username = this.props.auth.user.username;
      console.log(username);
      await axios.delete(
        `${config.api.invokeUrl}/users/${username}/devices/${id}`
      );
      // HAS TO HAVE A DELETE /devices/:id
      const updatedProducts = [...this.state.devices].filter(
        product => product.id !== id
      );
      console.log(updatedProducts);
      this.setState({ devices: updatedProducts });
    } catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  };

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch devices here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/devices`);
      //  res.data.pop()
      res.data.map(device => {
        // console.log(device);
        if (device.state.currentTemp === undefined || device.id === "") {
          device.state.currentTemp = 0;
        }
        return device;
      });
      this.setState({ devices: res.data, isLoaded: true });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  onAddProductIdChange = event => {
    const id = event.target.value;

    if (id !== "") {
      this.setState({ visibleId: false });
    }
    if (id.length > 12) {
      console.log("ID exceeded length. ID has to be exactly 12 digits");
      this.setState({
        visibleLong: true
      });
    } else if (id.length < 12) {
      this.setState({
        visibleShort: true
      });
    } else {
      this.setState({
        visibleLong: false,
        visibleShort: false,
        visibleExact: false
      });
    }

    this.setState({
      newDevice: { ...this.state.newDevice, id: event.target.value }
    });
  };

  onAddTempChange = event => {
    const temp = event.target.value;

    if (temp === "") {
      this.setState({
        visibleTemp: true
      });
    } else if (temp >= 100) {
      this.setState({
        visibleTempMax: true
      });
    } else {
      this.setState({
        visibleTemp: false,
        visibleTempMax: false
      });
    }
    this.setState({
      newDevice: {
        ...this.state.newDevice,
        state: {
          ...this.state.newDevice.state,
          currentTemp: event.target.value
        }
      }
    });
  };

  onAddHumChange = event =>
    this.setState({
      newDevice: {
        ...this.state.newDevice,
        state: { ...this.state.newDevice.state, hum: event.target.value }
      }
    });

  onAddMinChange = event =>
    this.setState({
      newDevice: {
        ...this.state.newDevice,
        settings: {
          ...this.state.newDevice.settings,
          rangeMin: event.target.value
        }
      }
    });

  onAddMaxChange = event => {
    this.setState({
      newDevice: {
        ...this.state.newDevice,
        settings: {
          ...this.state.newDevice.settings,
          rangeMax: event.target.value
        }
      }
    });
  };

  onDismissSuccess = () => {
    this.setState(prevState => ({
      visibleSuccess: !prevState.visibleSuccess
    }));
  };

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <Fragment>
        {!this.props.auth.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          this.props.auth.isAuthenticated &&
          this.props.auth.user.attributes["custom:permission"] === "Admin" && (
            <section className="section">
              <div className="container">
                <Alert
                  id="visibleSuccess"
                  color="success"
                  isOpen={this.state.visibleSuccess}
                  toggle={this.onDismissSuccess}
                >
                  Device Successfully Added!
                </Alert>

                <h1>Device List</h1>
                <p className="subtitle is-5">
                  Add and remove devices using the form below:
                </p>
                <br />
                <div className="control btn-form">
                  <Button color="primary" onClick={this.toggle}>
                    Add New Device
                  </Button>
                </div>
                {this.state.isLoaded ? (
                  <div className="columns">
                    <div className="column">
                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                      >
                        <form
                          onSubmit={event =>
                            this.handleAddProduct(
                              this.state.newDevice.id,
                              event
                            )
                          }
                        >
                          <ModalBody>
                            <Alert
                              id="visibleLong"
                              color="warning"
                              isOpen={this.state.visibleLong}
                              toggle={this.onDismiss}
                            >
                              ID cannot be more than 12 characters long
                            </Alert>

                            <Alert
                              id="visibleShort"
                              color="warning"
                              isOpen={this.state.visibleShort}
                              toggle={this.onDismiss}
                            >
                              ID cannot be less than 12 characters
                            </Alert>

                            <Alert
                              id="visibleTemp"
                              color="warning"
                              isOpen={this.state.visibleTemp}
                              toggle={this.onDismiss}
                            >
                              Temperature cannot be empty
                            </Alert>

                            <Alert
                              id="visibleId"
                              color="warning"
                              isOpen={this.state.visibleId}
                              toggle={this.onDismiss}
                            >
                              ID cannot be empty
                            </Alert>

                            <Alert
                              color="warning"
                              isOpen={this.state.visibleTempMax}
                              toggle={this.onDismiss}
                            >
                              Temperature cannot exceed more than 100 degrees!
                            </Alert>

                            <div className="control">
                              <input
                                className="input is-medium"
                                type="text"
                                placeholder="Enter id"
                                value={this.state.newDevice.id}
                                onChange={this.onAddProductIdChange}
                              />
                            </div>
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="number"
                                placeholder="Enter Humidity"
                                value={this.state.newDevice.state.hum}
                                onChange={this.onAddHumChange}
                              />
                            </div>
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="number"
                                placeholder="Enter Minimum Temperature"
                                value={this.state.newDevice.settings.rangeMin}
                                onChange={this.onAddMinChange}
                              />
                            </div>
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="number"
                                placeholder="Enter Max Temperature"
                                value={this.state.newDevice.settings.rangeMax}
                                onChange={this.onAddMaxChange}
                              />
                            </div>
                            <div className="control">
                              <input
                                className="input is-medium"
                                type="number"
                                placeholder="Enter Temperature"
                                value={this.state.newDevice.state.currentTemp}
                                onChange={this.onAddTempChange}
                              />
                            </div>
                            <div className="control">
                              <button
                                type="submit"
                                className="button is-primary is-medium"
                                onClick={this.toggle}
                              >
                                Add Device
                              </button>
                              <Button color="secondary" onClick={this.toggle}>
                                Cancel
                              </Button>
                            </div>
                          </ModalBody>
                        </form>
                      </Modal>
                    </div>

                    <Row>
                      <TempCardList
                        devices={this.state.devices}
                        isAdmin={true}
                        handleDeleteDevice={this.handleDeleteDevice}
                      />
                    </Row>
                  </div>
                ) : (
                  <div>
                    <div className="loader" />
                    <h1 className="loaderMsg">LOADING DEVICES...</h1>
                  </div>
                )}
              </div>
            </section>
          )
        )}
      </Fragment>
    );
  }
}
