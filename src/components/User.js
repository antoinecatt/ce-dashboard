import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, Button, Col, CardTitle } from "reactstrap";

const User = ({ username, devices }) => {
  return (
    <div>
      {" "}
      <Col>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>{username.toUpperCase()}</h1>
            </CardTitle>{" "}
            <Link
              to={{
                pathname: `/users/${username}`,
                state: { username: username }
              }}
            >
              <Button color="info">View Devices</Button>
            </Link>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default User;
