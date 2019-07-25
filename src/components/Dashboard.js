import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row
} from "reactstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card className="dashboard-card">
              <CardBody className="site-card-body">
                <div className="icon">
                  <i className="fas fa-user" />
                </div>
                <CardTitle>Users</CardTitle>
                <Link to="/users">
                  <Button color="info">View Users</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="dashboard-card">
              <CardBody className="site-card-body">
                <div className="icon">
                  <i className="fas fa-building" />
                </div>
                <CardTitle>SITES</CardTitle>

                <Link to="/sites">
                  <Button color="info">View Sites</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
