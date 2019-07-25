import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  ListGroupItem,
  ListGroup,
  Media,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
// import AlternativeHeader from "components/Headers/AlternativeHeader.jsx";

import {
  chartOptions,
  parseOptions,
  chartExample2,
  chartExample3
} from "../variables/charts.jsx";

let mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

class Overview extends React.Component {
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        {!this.props.auth.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Container className="mt--6" fluid>
            {/* TOP CARDS */}
            <Row>
              <Col md="6" xl="3">
                <Card className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Humidity
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          30%
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="30"
                          color="success"
                        />
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <a
                        className="text-nowrap text-white font-weight-600"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        See details
                      </a>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* ======================================================================= */}
              <Col md="6" xl="3">
                <Card className="bg-gradient-info border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Lowest Temperature
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          55˚F
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="50"
                          color="success"
                        />
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <a
                        className="text-nowrap text-white font-weight-600"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        See details
                      </a>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* ======================================================================= */}
              <Col md="6" xl="3">
                <Card className="bg-gradient-danger border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Highest Temperature
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          78˚F
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="80"
                          color="success"
                        />
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <a
                        className="text-nowrap text-white font-weight-600"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        See details
                      </a>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="bg-gradient-default border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 text-white"
                        >
                          Notifications
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          50/62
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max="100"
                          value="90"
                          color="success"
                        />
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <a
                        className="text-nowrap text-white font-weight-600"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        See details
                      </a>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* MAIN CONTENT */}
            <div className="card-deck flex-column flex-xl-row">
              <Card>
                <CardHeader className="bg-transparent">
                <div className="col">
                  <h6 className="text-muted text-uppercase ls-1 mb-1">
                    Overview
                  </h6>
                  <h2 className="h3 mb-0">History</h2>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample3.data}
                      options={chartExample3.options}
                      id="chart-sales"
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="h3 mb-0">Energy Consumption</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
            <Row>
              <Col xl="6">
                <Row>
                  <div className="col">
                    <Card>
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Usage Data</h3>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th className="sort" data-sort="name" scope="col">
                              District
                            </th>
                            <th className="sort" data-sort="budget" scope="col">
                              Cost
                            </th>
                            <th className="sort" data-sort="status" scope="col">
                              Status
                            </th>
                            <th scope="col">Users</th>
                            <th
                              className="sort"
                              data-sort="completion"
                              scope="col"
                            >
                              Usage
                            </th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody className="list">
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Ansync
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$238.89 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">IDLE</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip792717700"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip792717700"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip654289872"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip654289872"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip409131762"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip409131762"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip50788433"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip50788433"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">60%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="60"
                                    color="warning"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Wayzn
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$185.10 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-success" />
                                <span className="status">ON</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip545726644"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip545726644"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip823332447"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip823332447"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip354076640"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip354076640"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip625572621"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip625572621"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">100%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="100"
                                    color="success"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Black Dashboard
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$315.40 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-danger" />
                                <span className="status">OFF</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip927457712"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip927457712"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip959509788"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip959509788"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip239649821"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip239649821"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip908443321"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip908443321"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">72%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="72"
                                    color="danger"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Forward Health
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$440.20 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-info" />
                                <span className="status">SCHEDULED</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip817843622"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip817843622"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip885824111"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip885824111"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip426851535"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip426851535"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip913358720"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip913358720"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">90%</span>
                                <div>
                                  <Progress max="100" value="90" color="info" />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                {/* <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={require("../assets/img/brand/logo_white.png")}
                                />
                              </a> */}
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Capitol Energy
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$222.20 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-success" />
                                <span className="status">ON</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip460474820"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip460474820"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip979995688"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip979995688"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip732882700"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip732882700"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip242724387"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip242724387"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">100%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="100"
                                    color="success"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="name mb-0 text-sm">
                                    Argon Design Systems
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td className="budget">$525.52 USD</td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">IDLE</span>
                              </Badge>
                            </td>
                            <td>
                              <div className="avatar-group">
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip318080952"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-1.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip318080952"
                                >
                                  Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip221723068"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-2.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip221723068"
                                >
                                  Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip138748612"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-3.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip138748612"
                                >
                                  Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                  className="avatar avatar-sm rounded-circle"
                                  href="#pablo"
                                  id="tooltip431342349"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/team-4.jpg")}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip431342349"
                                >
                                  Jessica Doe
                                </UncontrolledTooltip>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="completion mr-2">60%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="60"
                                    color="warning"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  color=""
                                  size="sm"
                                  className="btn-icon-only text-light"
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                </Row>
              </Col>
              {/* ================================================================ */}
              <Col xl="6">
                <Card className="widget-calendar">
                  <CardHeader>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h5 className="h3 mb-0">Real time</h5>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          className="btn-neutral"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Action
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <VectorMap
                      containerClassName="vector-map vector-map-sm"
                      containerStyle={{
                        width: "100%",
                        height: "280px"
                      }}
                      map={"world_mill"}
                      zoomOnScroll={false}
                      scaleColors={["#f00", "#0071A4"]}
                      normalizeFunction="polynomial"
                      hoverOpacity={0.7}
                      hoverColor={false}
                      backgroundColor="transparent"
                      regionStyle={{
                        initial: {
                          fill: "#e9ecef",
                          "fill-opacity": 0.8,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 1
                        },
                        hover: {
                          fill: "#dee2e6",
                          "fill-opacity": 0.8,
                          cursor: "pointer"
                        },
                        selected: {
                          fill: "yellow"
                        },
                        selectedHover: {}
                      }}
                      markerStyle={{
                        initial: {
                          fill: "#fb6340",
                          "stroke-width": 0
                        },
                        hover: {
                          fill: "#11cdef",
                          "stroke-width": 0
                        }
                      }}
                      markers={[
                        {
                          latLng: [41.9, 12.45],
                          name: "Vatican City"
                        },
                        {
                          latLng: [43.73, 7.41],
                          name: "Monaco"
                        },
                        {
                          latLng: [35.88, 14.5],
                          name: "Malta"
                        },
                        {
                          latLng: [1.3, 103.8],
                          name: "Singapore"
                        },
                        {
                          latLng: [1.46, 173.03],
                          name: "Kiribati"
                        },
                        {
                          latLng: [-21.13, -175.2],
                          name: "Tonga"
                        },
                        {
                          latLng: [15.3, -61.38],
                          name: "Dominica"
                        },
                        {
                          latLng: [-20.2, 57.5],
                          name: "Mauritius"
                        },
                        {
                          latLng: [26.02, 50.55],
                          name: "Bahrain"
                        }
                      ]}
                      series={{
                        regions: [
                          {
                            values: mapData,
                            scale: ["#ced4da", "#adb5bd"],
                            normalizeFunction: "polynomial"
                          }
                        ]
                      }}
                    />
                    <ListGroup className="list my--3" flush>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              src={require("../assets/img/icons/flags/US.png")}
                            />
                          </Col>
                          <div className="col">
                            <small>Sites:</small>
                            <h5 className="mb-0">Site 1</h5>
                          </div>
                          <div className="col">
                            <small>Temperature:</small>
                            <h5 className="mb-0">65˚F</h5>
                          </div>
                          <div className="col">
                            <small>Humidity:</small>
                            <h5 className="mb-0">18%</h5>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              src={require("../assets/img/icons/flags/DE.png")}
                            />
                          </Col>
                          <div className="col">
                            <small>Sites:</small>
                            <h5 className="mb-0">Site 2</h5>
                          </div>
                          <div className="col">
                            <small>Temperature:</small>
                            <h5 className="mb-0">58˚F</h5>
                          </div>
                          <div className="col">
                            <small>Humidity:</small>
                            <h5 className="mb-0">50%</h5>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              src={require("../assets/img/icons/flags/GB.png")}
                            />
                          </Col>
                          <div className="col">
                            <small>Sites:</small>
                            <h5 className="mb-0">Site 3</h5>
                          </div>
                          <div className="col">
                            <small>Temperature:</small>
                            <h5 className="mb-0">76˚F</h5>
                          </div>
                          <div className="col">
                            <small>Humidity:</small>
                            <h5 className="mb-0">10%</h5>
                          </div>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default Overview;
