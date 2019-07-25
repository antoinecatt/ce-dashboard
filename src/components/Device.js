import React from "react";
import { Card, CardText, CardBody, Button, Col, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
// core components

class Device extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.devices.map(device => (
          <Col key={device.id}>
            <Card body>
              <CardBody>
                <CardTitle>
                  <h1>DEVICE {device.id}</h1>
                </CardTitle>
                <CardText>{device.state.currentTemp}˚F</CardText>{" "}
                <Link
                  to={{
                    pathname: `/devices/${device.id}`,
                    state: { id: device.id }
                  }}
                >
                  <Button color="info">View Device</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </div>
    );
  }
}

export default Device;
