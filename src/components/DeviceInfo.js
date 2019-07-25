import React, { Component } from "react";
import DeviceGraph from "./DeviceGraph";
import axios from "axios";
import config from "../config.json";

export default class DeviceInfo extends Component {
  state = {
    deviceId: "",
    currentTemp: "",
    rangeMin: "",
    rangeMax: "",
    currentHum: "",
    isLoaded: false
  };

  fetchDevices = async () => {
    try {
      const res = await axios.get(
        `${config.api.invokeUrl}/devices/${this.props.location.state.id}`
      );
      // console.log(res)
      console.log(res.data);
      this.setState({
        deviceId: res.data.id,
        currentTemp: res.data.state.currentTemp,
        currentHum: res.data.state.currentHum,
        rangeMin: res.data.settings.rangeMin,
        rangeMax: res.data.settings.rangeMax,
        isLoaded: true
      });
    } catch (err) {
      console.log(`CANNOT FETCH DEVICE: ${err}`);
    }
  };

  handleUpdateMinTemp = async (id, min) => {
    try {
      await axios.put(`${config.api.invokeUrl}/devices/${id}/min/${min}`);
      console.log(min);
      this.setState({ rangeMin: min });
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  };

  handleUpdateMaxTemp = async (id, max) => {
    try {
      await axios.put(`${config.api.invokeUrl}/devices/${id}/max/${max}`);

      this.setState({ rangeMax: max });
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    setInterval(() => {
      this.fetchDevices();
    }, 1000);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.isLoaded ? (
          <DeviceGraph
            temperature={this.state.currentTemp}
            id={this.state.deviceId}
            minTemp={this.state.rangeMin}
            maxTemp={this.state.rangeMax}
            hum={this.state.currentHum}
            permission={this.props.auth.permission}
            handleUpdateMaxTemp={this.handleUpdateMaxTemp}
            handleUpdateMinTemp={this.handleUpdateMinTemp}
            goBack={this.goBack}
          />
        ) : (
          <div>
            <div className="loader" />
            <h1 className="loaderMsg">LOADING DEVICE...</h1>
          </div>
        )}
      </div>
    );
  }
}
