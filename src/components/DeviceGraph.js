import React, { Component } from "react";
import ApexChart from "react-apexcharts";
import Chart from "chart.js";
import {
  Card,
  CardTitle,
  Col,
  CardGroup,
  CardBody,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { chartOptions, parseOptions } from "../variables/charts";

const button = {
  margin: "0 auto"
};

const row = {
  margin: "0 auto"
};

class DeviceGraph extends Component {
  state = {
    infoModal: false,
    minFormModal: false,
    maxFormModal: false,
    dropdownOpen: false,
    visibleMin: false,
    visibleMax: false,
    minTemp: this.props.minTemp,
    maxTemp: this.props.maxTemp,
    options: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 1,
          gradientToColors: ["#c60505"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Current Temp ºF"]
    },
    series: [this.props.temperature],
    activeNav: 1,
    chartExample1Data: "data1"
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  onDismiss = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  toggleInfo = () => {
    this.setState(prevState => ({
      infoModal: !prevState.infoModal
    }));
  };

  toggleMinTempForm = () => {
    this.setState(prevState => ({
      minFormModal: !prevState.minFormModal
    }));
  };

  toggleMaxTempForm = () => {
    this.setState(prevState => ({
      maxFormModal: !prevState.maxFormModal
    }));
  };

  changeMinTempHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  changeMaxTempHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  minTempChangeHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      this.props.handleUpdateMinTemp(this.props.id, this.state.minTemp);
      return {
        minFormModal: !prevState.minFormModal,
        visibleMin: !prevState.visibleMin
      };
    });
  };

  maxTempChangeHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      this.props.handleUpdateMaxTemp(this.props.id, this.state.maxTemp);
      return {
        maxFormModal: !prevState.maxFormModal,
        visibleMax: !prevState.visibleMax
      };
    });
  };

  onDismissMin = () => {
    this.setState(prevState => ({
      visibleMin: !prevState.visibleMin
    }));
  };

  onDismissMax = () => {
    this.setState(prevState => ({
      visibleMax: !prevState.visibleMax
    }));
  };

  // ===================================================================== RENDER =====================================================================
  render() {
    return (
      <Col sm="12" className="device-graph">
        <Alert
          color="success"
          isOpen={this.state.visibleMin}
          toggle={this.onDismiss}
        >
          Minimum Temperature Updated!
        </Alert>
        <Alert
          color="success"
          isOpen={this.state.visibleMax}
          toggle={this.onDismiss}
        >
          Max Temperature Updated!
        </Alert>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="#" onClick={this.props.goBack}>
            <Button color="primary">Back</Button>
          </BreadcrumbItem>
        </Breadcrumb>
        <Card body>
          <CardTitle>{this.props.id}</CardTitle>
          {this.state.series[0] === 0 && (
            <Toast>
              <ToastHeader icon="info">OFFLINE</ToastHeader>
              <ToastBody>DEVICE HAS NOT BEEN CONFIGURED</ToastBody>
            </Toast>
          )}
          <ApexChart
            series={[this.props.temperature]}
            options={this.state.options}
            type="radialBar"
            height="350"
          />
          <div />
          <CardGroup className="CardGroup">
            <Card className="CardGroup-info">
              <CardBody>
                <CardTitle>Humidity</CardTitle>
                <h3>{this.props.hum}%</h3>
              </CardBody>
            </Card>
            <Card className="CardGroup-info">
              <CardBody>
                <CardTitle>Min. Temp</CardTitle>
                <h3>{this.state.minTemp}ºF</h3>
              </CardBody>
            </Card>
            <Card className="CardGroup-info">
              <CardBody>
                <CardTitle>Max Temp</CardTitle>
                <h3>{this.state.maxTemp}ºF</h3>
              </CardBody>
            </Card>
          </CardGroup>
          {this.props.permission === "Admin" && (
            <Row style={row}>
              <Col xs="auto">
                <Button
                  className="btn"
                  style={button}
                  color="success"
                  onClick={this.toggleMinTempForm}
                >
                  Change Min Temp
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn"
                  style={button}
                  color="success"
                  onClick={this.toggleMaxTempForm}
                >
                  Change Max Temp
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn"
                  style={button}
                  color="success"
                  onClick={this.toggleInfo}
                >
                  More Info
                </Button>
              </Col>
            </Row>
          )}
          {/* =========================MODALS============================ */}
          {/* MIN TEMPERATURE MODAL */}
          <Modal
            isOpen={this.state.minFormModal}
            toggle={this.toggleForm}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleMinTempForm}>
              Change Temperature Range For {this.props.id}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <FormGroup>
                  <Label for="minTemp">Minimum Temperature</Label>
                  <Input
                    onChange={this.changeMinTempHandler}
                    type="number"
                    name="minTemp"
                    id="exampleNumber"
                    placeholder="Min Temp"
                  />
                </FormGroup>
                <Button color="primary" onClick={this.minTempChangeHandler}>
                  Update Thermostat
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          {/* MAX TEMPERATURE MODAL */}
          <Modal
            isOpen={this.state.maxFormModal}
            toggle={this.toggleForm}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleMaxTempForm}>
              Change Temperature Range For {this.props.id}
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="minTemp">Maximum Temperature</Label>
                  <Input
                    onChange={this.changeMaxTempHandler}
                    type="number"
                    name="maxTemp"
                    id="exampleNumber"
                    placeholder="Max Temp"
                  />
                </FormGroup>
                <Button color="primary" onClick={this.maxTempChangeHandler}>
                  Update Thermostat
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          {/* MORE INFO MODAL */}
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.infoModal}
            toggle={this.toggleInfo}
          >
            <ModalHeader toggle={this.toggleInfo}>
              Create New Device
            </ModalHeader>

            <ModalBody>
              <h1>MORE INFO COMING SOON!</h1>
            </ModalBody>
          </Modal>
        </Card>
      </Col>
    );
  }
}

export default DeviceGraph;
