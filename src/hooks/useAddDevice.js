import React, { useState, useEffect } from "react";

export default ({ url, headers, payload }) => {
  const [params, setParams] = useState({
    id: "",
    temp: "",
    minTemp: "",
    maxTemp: "",
    hum: ""
  });
};

// handleAddDevice = async (id, event) => {

//     try {
//       const params = {
//         id,
//         currentTemp: this.state.newDevice.currentTemp,
//         rangeMin: this.state.newDevice.rangeMin,
//         rangeMax: this.state.newDevice.rangeMax,
//         hum: this.state.newDevice.hum
//       };
//       console.log(params)
//       await axios.post(`${config.api.invokeUrl}/thermostat-data/${id}`, params);
//       this.setState({ devices: [...this.state.devices, this.state.newDevice] });
//       console.log(params)
//       // this.setState({
//       //   newDevice: {
//       //     id: "",
//       //     currentTemp: "",
//       //     rangeMin: "",
//       //     rangeMax: "",
//       //     hum: ""
//       //   }
//       // });
//     } catch (err) {
//       console.log(`An error has occured: ${err}`);
//     }
//     this.setState({ devices: [...this.state.devices, this.state.newDevice] });
//   };
