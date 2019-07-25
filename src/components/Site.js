import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, Button, Col, CardTitle } from "reactstrap";

const Site = ({ name, id }) => {
  return (
    <div>
      {" "}
      <Col>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>{name.toUpperCase()}</h1>
            </CardTitle>{" "}
            <Link
              to={{
                pathname: `/sites/${id}`,
                state: { id: id }
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

export default Site;
