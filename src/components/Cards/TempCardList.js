import React from "react";
import TempCard from "./TempCard";
import { Row } from "reactstrap";

const TempCardList = ({
  devices,
  handleUpdateMinTemp,
  handleUpdateMaxTemp,
  permission,
  handleDeleteDevice
}) => {
  const deviceList = devices.map(val => {
    return (
      <TempCard
        key={val.id}
        id={val.id}
        temperature={val.state.currentTemp}
        rangemax={val.settings.rangeMax}
        rangemin={val.settings.rangeMin}
        hum={val.state.currentHum}
        handleUpdateMinTemp={handleUpdateMinTemp}
        handleUpdateMaxTemp={handleUpdateMaxTemp}
        handleDeleteDevice={handleDeleteDevice}
        permission={permission}
      />
    );
  });

  return <Row>{deviceList}</Row>;
};

export default TempCardList;
