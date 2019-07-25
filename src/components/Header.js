import React from "react";
// reactstrap components
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from "reactstrap";

function Header({ goBack }) {
  return (
    <>
      <div className="header pb-6">
        <div className="header-body">
          <Row className="align-items-center py-4">
            <Col lg="6" xs="7">
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" href="#" onClick={goBack}>
                  <Button color="primary">Back</Button>
                </BreadcrumbItem>
              </Breadcrumb>
              
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Header;
