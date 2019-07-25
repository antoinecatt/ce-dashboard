import React, { Component } from "react";
import Device from "./Device";
import { Container, Col, Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
// import { temps } from '../temps';
import { Redirect } from "react-router-dom";
// import axios from "axios";
import config from "../config.json";

class SiteDeviceList extends Component {
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
    isLoaded: false
  };

  fetchData = async () => {
    let response = {};
    let devs = [];

    try {
      // console.log(this.props.location.state);
      response = await fetch(
        `${config.api.invokeUrl}/sites/${this.props.location.state.id}`,
        {
          method: "get"
        }
      );
    } catch (err) {
      console.error(err);
      response.status = 500;
    }

    if (200 === response.status) {
      let site = await response.json();
      // console.log("User:");
      // console.log(site);
      if (site.devices) {
        for (let i = 0; i < site.devices.length; i += 1) {
          // console.log("Device:");
          // console.log(site.devices[i]);
          try {
            response = await fetch(
              `${config.api.invokeUrl}/devices/${site.devices[i]}`,
              {
                method: "get"
              }
            );
            // console.log(response);
          } catch (err) {
            console.error(err);
            // console.log('caught');
            response.status = 500;
          }
          // console.log('after');
          // console.log(response.status);
          if (200 !== response.status) continue;
          let dev = await response.json();
          if (undefined === dev) continue;

          if (dev.state.currentTemp === undefined) {
            dev.state.currentTemp = 0;
          }
          devs.push(dev);
        }
      }
    }
    // setInterval(() => {
    // }, 1000);
    // console.log(devs);
    this.setState({ devices: devs, isLoaded: true });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    // setInterval(() => {
    this.fetchData();
    // }, 1000);
  }

  render() {
    return (
      <>
        {!this.props.auth.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Container className="mt--6" fluid>
              {this.state.isLoaded ? (
                <>
                  {" "}
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="#" onClick={this.goBack}>
                      <Button color="primary">Back</Button>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <Col>
                    <Device devices={this.state.devices} />
                  </Col>
                </>
              ) : (
                <div>
                  <div className="loader" />
                  <h1 className="loaderMsg">LOADING DASHBOARD...</h1>
                </div>
              )}
            </Container>
          </>
        )}
      </>
    );
  }
}

export default SiteDeviceList;
